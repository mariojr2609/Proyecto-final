package com.mjimenez.app_android.retrofit.services;

import com.mjimenez.app_android.responses.LoginSignupResponse;
import com.mjimenez.app_android.models.Register;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginSignupService {
    @POST("/auth")
    Call<LoginSignupResponse> login(@Header("Authorization") String authorization);

    @POST("/users")
    Call<LoginSignupResponse> register(@Body Register registro);
}
