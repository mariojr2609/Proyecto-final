package com.mjimenez.app_android.interfaces;

import com.mjimenez.app_android.models.Child;

public interface ChildListener {
    //public void onAddChildClick(Child c);

    public void OnClickChild(Child c);

    public void OnDeleteChildClick(String id, String name);

    public void OnEditChildClick(Child c);
}
