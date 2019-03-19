package com.mjimenez.app_android.fragment;

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
import com.mjimenez.app_android.adapter.CanguroAdapter;
import com.mjimenez.app_android.interfaces.CanguroListener;
import com.mjimenez.app_android.models.Canguro;
import com.mjimenez.app_android.responses.ContainerResponse;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.CanguroService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CanguroFragment extends Fragment {
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private CanguroListener mListener;
    private CanguroAdapter adapter;
    private Context ctx;
    private RecyclerView recyclerView;
    private ProgressBar pg;
    private String city;
    private List<Canguro> canguros = new ArrayList<>();
    private boolean isScrolling = false;
    private int currentItems, totalItems, scrollOutItems;
    private int page = 0;
    private boolean setData = false;

    public CanguroFragment() {
    }

    public static CanguroFragment newInstance(int columnCount) {
        CanguroFragment fragment = new CanguroFragment();
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
        setHasOptionsMenu(true);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_canguro_list, container, false);
        pg = view.findViewById(R.id.canguro_list_pb);
        Bundle bundle = this.getArguments();
        if (bundle != null) {
            city = bundle.getString("CIUDAD");
        }
        if (view instanceof ConstraintLayout) {
            Context context = view.getContext();
            recyclerView = view.findViewById(R.id.canguro_list);
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
        CanguroService service = ServiceGenerator.createService(CanguroService.class);
        Call<ContainerResponse<Canguro>> call = service.listCanguros(data);
        call.enqueue(new Callback<ContainerResponse<Canguro>>() {
            @Override
            public void onResponse(Call<ContainerResponse<Canguro>> call, final Response<ContainerResponse<Canguro>> response) {
                if (response.isSuccessful()) {
                    pg.setVisibility(View.GONE);
                    for (int i = 0; i < response.body().getRows().size(); i++) {
                        canguros.add(response.body().getRows().get(i));
                    }
                    adapter.notifyDataSetChanged();
                }
                else {
                    Toast.makeText(ctx, "Error al cargar datos", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<ContainerResponse<Canguro>> call, Throwable t) {
                Toast.makeText(ctx, "Error conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onAttach(Context context) {
        ctx = context;
        super.onAttach(context);
        if (context instanceof CanguroListener) {
            mListener = (CanguroListener) context;
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
        CanguroService service = ServiceGenerator.createService(CanguroService.class);
        Call<ContainerResponse<Canguro>> call = service.listCanguros(data);
        call.enqueue(new Callback<ContainerResponse<Canguro>>() {
            @Override
            public void onResponse(Call<ContainerResponse<Canguro>> call, Response<ContainerResponse<Canguro>> response) {
                if (response.isSuccessful()) {
                    pg.setVisibility(View.GONE);
                    canguros = new ArrayList<>(response.body().getRows());
                    adapter = new CanguroAdapter(ctx, R.layout.fragment_canguro, canguros, mListener);
                    recyclerView.setAdapter(adapter);
                    Toast.makeText(ctx, response.body().getCount() + " resultados", Toast.LENGTH_SHORT).show();
                }
                else {
                    Toast.makeText(ctx, "Error al cargar datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ContainerResponse<Canguro>> call, Throwable t) {
                Toast.makeText(ctx, "Error conexión", Toast.LENGTH_SHORT).show();
            }
        });
        setData = true;
    }
}
