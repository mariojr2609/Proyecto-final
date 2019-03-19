package com.mjimenez.app_android.viewmodel;

import android.app.Application;
import android.arch.lifecycle.AndroidViewModel;
import android.content.DialogInterface;
import android.support.annotation.NonNull;
import android.widget.Toast;
import com.mjimenez.app_android.models.Child;
import com.mjimenez.app_android.responses.ChildResponse;
import com.mjimenez.app_android.retrofit.generator.Authentication;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.ChildService;
import com.mjimenez.app_android.util.Util;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChildEditViewModel extends AndroidViewModel {
    public ChildEditViewModel(@NonNull Application application) { super(application); }

    public void editChild(Child child, String child_id, final DialogInterface dialog) {
        ChildService cService = ServiceGenerator.createService(ChildService.class, Util.getToken(getApplication().getApplicationContext()), Authentication.JWT);
        Call<ChildResponse> call = cService.EditChild(child_id, child);
        call.enqueue(new Callback<ChildResponse>() {
            @Override
            public void onResponse(Call<ChildResponse> call, Response<ChildResponse> response) {
                if (response.isSuccessful()) {
                    dialog.dismiss();
                }
                else {
                    Toast.makeText(getApplication().getApplicationContext(), "Error al editar", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<ChildResponse> call, Throwable t) {
                Toast.makeText(getApplication().getApplicationContext(), "Error al editar", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
