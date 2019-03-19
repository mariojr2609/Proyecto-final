package com.mjimenez.app_android.interfaces;

import com.mjimenez.app_android.models.Child;

public interface ChildListener {
    public void onAddPersonaClick(Child c);

    public void onDeleteBtnClick(String id, String name);

    public void onEditPersonaClick(Child c);

    public void onClickPersona(Child c);
}
