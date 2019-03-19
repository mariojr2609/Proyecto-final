package com.mjimenez.app_android.fragment_dialog;

import android.app.AlertDialog;
import android.app.Dialog;
import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import com.mjimenez.app_android.models.Child;
import com.mjimenez.app_android.util.Util;
import com.mjimenez.app_android.viewmodel.ChildEditViewModel;
import com.mjimenez.app_android.R;

public class ChildEditFragment extends DialogFragment {
    private static final String ARG_NAME = "name";
    private static final String ARG_FECHA_NACIMIENTO = "fecha_nacimiento";
    private static final String ARG_CHILDID = "child_id";
    private ChildEditViewModel mViewModel;
    private DialogInterface.OnDismissListener onDismissListener;
    private View view;
    private EditText name, fecha_nacimiento;
    private String argName, argFechaNacimiento, argChildId;

    public void setOnDismissListener(DialogInterface.OnDismissListener onDismissListener) {
        this.onDismissListener = onDismissListener;
    }
    public static ChildEditFragment newInstance() {
        return new ChildEditFragment();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(ChildEditViewModel.class);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            argName = getArguments().getString(ARG_NAME);
            argFechaNacimiento = getArguments().getString(ARG_FECHA_NACIMIENTO);
            argChildId = getArguments().getString(ARG_CHILDID);
        }
    }

    public static ChildEditFragment newInstance(Child c) {
        Bundle args = new Bundle();
        args.putString(ARG_FECHA_NACIMIENTO, c.getFecha_nacimiento());
        args.putString(ARG_NAME, c.getName());
        args.putString(ARG_CHILDID, c.getId());
        ChildEditFragment fragment = new ChildEditFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        LayoutInflater inflater = getActivity().getLayoutInflater();
        view = inflater.inflate(R.layout.child_edit_fragment, null);
        name = view.findViewById(R.id.child_edit_name);
        fecha_nacimiento = view.findViewById(R.id.child_edit_fechanacimiento);
        name.setText(argName);
        fecha_nacimiento.setText(argFechaNacimiento);
        //*Se crea el DialogFragment*//
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage("Editar child: ")
                .setPositiveButton(R.string.edit, new DialogInterface.OnClickListener() {

                    public void onClick(final DialogInterface dialog, int id) {
                        String nombreEditado = name.getText().toString();
                        String fecha_nacimiento_editado = fecha_nacimiento.getText().toString();
                        Child persona = new Child(nombreEditado, fecha_nacimiento_editado, Util.getUserId(getContext()));
                        mViewModel.editChild(persona,argChildId, dialog);
                    }
                })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) { dialog.dismiss();
                    }
                });
        builder.setView(view);
        return builder.create();
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        super.onDismiss(dialog);
        if (onDismissListener != null) {
            onDismissListener.onDismiss(dialog);
        }
    }
}
