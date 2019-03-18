package com.mjimenez.app_android.retrofit.services;
import com.mjimenez.app_android.models.PhotoCanguro;
import com.mjimenez.app_android.responses.ContainerResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface PhotoGuarderiaService {
    final String BASE_URL = "/photo_guarderia";

    @GET(BASE_URL)
    Call<ContainerResponse<PhotoCanguro>> getAll();

    @GET(BASE_URL + "/{id}")
    Call<PhotoCanguro> getOne(@Path("id") String id);

}
