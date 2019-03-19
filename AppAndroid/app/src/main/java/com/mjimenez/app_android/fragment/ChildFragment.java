package com.mjimenez.app_android.fragment;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.mjimenez.app_android.R;
import com.mjimenez.app_android.adapter.ChildAdapter;
import com.mjimenez.app_android.interfaces.ChildListener;
import com.mjimenez.app_android.responses.UserOneResponse;
import com.mjimenez.app_android.retrofit.generator.Authentication;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.UserService;
import com.mjimenez.app_android.util.Util;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChildFragment extends Fragment {
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private ChildListener mListener;
    private ChildAdapter adapter;
    private Context ctx;
    private RecyclerView recyclerView;
    private SwipeRefreshLayout swipe;

    public ChildFragment() {
    }

    public static ChildFragment newInstance(int columnCount) {
        ChildFragment fragment = new ChildFragment();
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
        View view = inflater.inflate(R.layout.fragment_child_list, container, false);
        swipe = view.findViewById(R.id.child_swipe);
        swipe.setColorSchemeResources(R.color.colorPrimary, R.color.colorSecundary);
        if (view instanceof SwipeRefreshLayout) {
            Context context = view.getContext();
            recyclerView = view.findViewById(R.id.child_list);
            recyclerView.addItemDecoration(new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL));
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            //*Petición a nuestra API*//
            cargarDatos(recyclerView);
        }
        swipe.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        actualizarDatos();
                        swipe.setRefreshing(false);
                    }
                }, 3000);
            }


        });
        return view;
    }

    public void cargarDatos(final RecyclerView recyclerView) {
        UserService userService = ServiceGenerator.createService(UserService.class, Util.getToken(this.getActivity()), Authentication.JWT);
        Call<UserOneResponse> call = userService.oneUserById(Util.getUserId(this.getActivity()));
        call.enqueue(new Callback<UserOneResponse>() {
            @Override
            public void onResponse(Call<UserOneResponse> call, Response<UserOneResponse> response) {
                if (response.isSuccessful()) {
                    adapter = new ChildAdapter(ctx, R.layout.fragment_child, response.body().getChild(), mListener);
                    recyclerView.setAdapter(adapter);
                } else {
                    Toast.makeText(getContext(), "Error al obtener datos", Toast.LENGTH_LONG).show();
                }
            }
            @Override
            public void onFailure(Call<UserOneResponse> call, Throwable t) {
                Toast.makeText(getContext(), "Error de conexión", Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof ChildListener) {
            mListener = (ChildListener) context;
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

    public void actualizarDatos(){
        cargarDatos(recyclerView);
    }
}
