package com.mjimenez.app_android.fragment_dialog;

import android.app.AlertDialog;
import android.app.Dialog;
import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import com.mjimenez.app_android.models.Child;
import com.mjimenez.app_android.util.Util;
import com.mjimenez.app_android.viewmodel.ChildAddViewModel;
import com.mjimenez.app_android.R;

public class ChildAddFragment extends DialogFragment {
    private ChildAddViewModel mViewModel;
    private DialogInterface.OnDismissListener onDismissListener;
    private View view;
    private EditText name, fecha_nacimiento;

    public void setOnDismissListener(DialogInterface.OnDismissListener onDismissListener) {
        this.onDismissListener = onDismissListener;
    }

    public static ChildAddFragment newInstance() {
        return new ChildAddFragment();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(ChildAddViewModel.class);
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        LayoutInflater inflater = getActivity().getLayoutInflater();
        view = inflater.inflate(R.layout.child_add_fragment, null);
        name = view.findViewById(R.id.child_add_name);
        fecha_nacimiento = view.findViewById(R.id.child_add_fechanacimiento);
        /*Se crea el DialogFragment*/
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage("Añadir persona")
                .setPositiveButton("Add", new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface dialog, int id) {
                        String nombreAdd = name.getText().toString();
                        String fechaNacimientoAdd = fecha_nacimiento.getText().toString();
                        Child child = new Child(nombreAdd, fechaNacimientoAdd, Util.getUserId(getContext()));
                        mViewModel.AddChild(child, dialog);
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) { dialog.dismiss();
                    }
                });
        builder.setView(view);
        return builder.create();
    }
}
