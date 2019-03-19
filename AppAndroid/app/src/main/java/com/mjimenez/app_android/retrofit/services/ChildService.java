package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.models.Child;
import com.mjimenez.app_android.responses.ChildResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ChildService {
    final String BASE_URL = "/child";

    @POST(BASE_URL)
    Call<ChildResponse> AddChild(@Body Child child);

    @GET(BASE_URL +"{id}")
    Call<Child> findOne(@Path("id") String id);

    @DELETE(BASE_URL + "{id}")
    Call<ChildResponse> DeleteChild(@Path("id") String id);

    @PUT(BASE_URL + "{id}")
    Call<ChildResponse> EditChild(@Path("id") String id, @Body Child child);
}
