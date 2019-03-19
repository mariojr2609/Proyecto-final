package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.responses.UserOneResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface UserService {
    @GET("/users/{id}")
    Call<UserOneResponse> oneUserById(@Path("id") String id);
}
