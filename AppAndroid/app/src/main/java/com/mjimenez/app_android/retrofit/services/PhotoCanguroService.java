package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.models.PhotoCanguro;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface PhotoCanguroService {
    final String BASE_URL = "/photo_canguros";

    @GET(BASE_URL)
    Call<PhotoCanguro> getAll(MultipartBody.Part body, RequestBody canguro_id);

    @GET(BASE_URL + "/{id}")
    Call<PhotoCanguro> getOne(@Path("id") String id);
}
