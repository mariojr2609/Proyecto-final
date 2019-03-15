package com.mjimenez.app_android.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.mjimenez.app_android.models.User;
import com.mjimenez.app_android.responses.UserResponse;

public class LoginSignupResponse {
    @SerializedName("token")
    @Expose
    private String token;
    @SerializedName("user")
    @Expose
    private User user;

    public LoginSignupResponse() {
    }

    public LoginSignupResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "LoginSignupResponse{" +
                "token='" + token + '\'' +
                ", user=" + user +
                '}';
    }
}
