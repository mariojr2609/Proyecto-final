package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.models.Canguro;
import com.mjimenez.app_android.models.Guarderia;
import com.mjimenez.app_android.responses.ContainerOneRowResponse;
import com.mjimenez.app_android.responses.ContainerResponse;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface GuarderiaService {
    final String BASE_URL = "/guarderia";

    @GET(BASE_URL)
    Call<ContainerResponse<Guarderia>> listCanguros(@QueryMap Map<String, String> options);

    @GET(BASE_URL+"/auth")
    Call<ContainerResponse<Guarderia>> listCangurosAuth(@QueryMap Map<String, String> options);

    @GET(BASE_URL)
    Call<ContainerResponse<Guarderia>> listGeo(@Query("near") String near);

    @GET(BASE_URL + "/{id}")
    Call<ContainerOneRowResponse<Guarderia>>getOne(@Path("id") String id);
}
