package com.mjimenez.app_android.fragment_list;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.ProgressBar;
import android.widget.Toast;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.adapter.GuarderiaAdapter;
import com.mjimenez.app_android.interfaces.GuarderiaListener;
import com.mjimenez.app_android.models.Guarderia;
import com.mjimenez.app_android.responses.ContainerResponse;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.GuarderiaService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GuarderiaFragment extends Fragment {
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private GuarderiaListener mListener;
    private GuarderiaAdapter adapter;
    private Context ctx;
    private RecyclerView recyclerView;
    private ProgressBar pg;
    private String city;
    private List<Guarderia> guarderias = new ArrayList<>();
    private boolean isScrolling = false;
    private int currentItems, totalItems, scrollOutItems;
    private int page = 0;
    private boolean setData = false;

    public GuarderiaFragment() {
    }

    public static GuarderiaFragment newInstance(int columnCount) {
        GuarderiaFragment fragment = new GuarderiaFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_guarderia_list, container, false);
        pg = view.findViewById(R.id.guarderia_list_pb);
        Bundle bundle = this.getArguments();
        if (bundle != null) {
            city = bundle.getString("CIUDAD");
        }
        if (view instanceof ConstraintLayout) {
            Context context = view.getContext();
            recyclerView = view.findViewById(R.id.guarderia_list);
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            if (setData == false) {
                page = 1;
                getDataPerPage();
            }
            /*Para ir actualizando el RecyclerView cuando se llega al final del scroll */
            recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
                @Override
                public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
                    super.onScrollStateChanged(recyclerView, newState);
                    if (newState == AbsListView.OnScrollListener.SCROLL_STATE_TOUCH_SCROLL) {
                        isScrolling = true;
                    }
                }

                @Override
                public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                    super.onScrolled(recyclerView, dx, dy);
                    LinearLayoutManager manager = (LinearLayoutManager) recyclerView.getLayoutManager();
                    currentItems = manager.getChildCount();
                    totalItems = manager.getItemCount();
                    scrollOutItems = manager.findFirstVisibleItemPosition();
                    if (isScrolling && (currentItems + scrollOutItems == totalItems)) {
                        isScrolling = false;
                        page++;
                        updateData();
                    }
                }
            });
        }
        return view;
    }

    public void updateData() {
        pg.setVisibility(View.VISIBLE);
        Map<String, String> data = new HashMap<>();
        data.put("limit", String.valueOf(20));
        data.put("page", String.valueOf(page));
        GuarderiaService service = ServiceGenerator.createService(GuarderiaService.class);
        Call<ContainerResponse<Guarderia>> call = service.listGuarderias(data);
        call.enqueue(new Callback<ContainerResponse<Guarderia>>() {
            @Override
            public void onResponse(Call<ContainerResponse<Guarderia>> call, final Response<ContainerResponse<Guarderia>> response) {
                if (response.isSuccessful()) {
                    pg.setVisibility(View.GONE);
                    for (int i = 0; i < response.body().getRows().size(); i++) {
                        guarderias.add(response.body().getRows().get(i));
                    }
                    adapter.notifyDataSetChanged();
                }
                else {
                    Toast.makeText(ctx, "Error al cargar datos", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<ContainerResponse<Guarderia>> call, Throwable t) {
                Toast.makeText(ctx, "Error conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof GuarderiaListener) {
            mListener = (GuarderiaListener) context;
        }
        else {
            throw new RuntimeException(context.toString() + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public void getDataPerPage() {
        Map<String, String> data = new HashMap<>();
        data.put("limit", String.valueOf(20));
        data.put("page", String.valueOf(1));
        GuarderiaService service = ServiceGenerator.createService(GuarderiaService.class);
        Call<ContainerResponse<Guarderia>> call = service.listGuarderias(data);
        call.enqueue(new Callback<ContainerResponse<Guarderia>>() {
            @Override
            public void onResponse(Call<ContainerResponse<Guarderia>> call, Response<ContainerResponse<Guarderia>> response) {
                if (response.isSuccessful()) {
                    pg.setVisibility(View.GONE);
                    guarderias = new ArrayList<>(response.body().getRows());
                    adapter = new GuarderiaAdapter(ctx, R.layout.fragment_guarderia, guarderias, mListener);
                    recyclerView.setAdapter(adapter);
                    Toast.makeText(ctx, response.body().getCount() + " resultados", Toast.LENGTH_SHORT).show();
                }
                else {
                    Toast.makeText(ctx, "Error al cargar datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ContainerResponse<Guarderia>> call, Throwable t) {
                Toast.makeText(ctx, "Error conexión", Toast.LENGTH_SHORT).show();
            }
        });
        setData = true;
    }
}
