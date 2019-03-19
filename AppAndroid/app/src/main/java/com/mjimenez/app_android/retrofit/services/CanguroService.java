package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.models.Canguro;
import com.mjimenez.app_android.responses.ContainerOneRowResponse;
import com.mjimenez.app_android.responses.ContainerResponse;
import java.util.Map;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface CanguroService {
    final String BASE_URL = "/canguros";

    @GET(BASE_URL)
    Call<ContainerResponse<Canguro>> listCanguros(@QueryMap Map<String, String> options);

    @GET(BASE_URL + "/auth")
    Call<ContainerResponse<Canguro>> listCangurosAuth(@QueryMap Map<String, String> options);

    @GET(BASE_URL)
    Call<ContainerResponse<Canguro>> getNearProps(@Query("near") String near, @Query("limit") int limit);


    @GET(BASE_URL + "/{id}")
    Call<ContainerOneRowResponse<Canguro>>getOne(@Path("id") String id);
}
