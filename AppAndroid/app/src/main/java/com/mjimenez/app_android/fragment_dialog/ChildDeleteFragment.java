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
import android.widget.TextView;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.viewmodel.ChildDeleteViewModel;

public class ChildDeleteFragment extends DialogFragment {
    private static final String ARG_NAME = "name";
    private static final String ARG_CHILDID = "child_id";
    private ChildDeleteViewModel mViewModel;
    private DialogInterface.OnDismissListener onDismissListener;
    private View view;
    private TextView name;
    private String argName, argChildId;

    public void setOnDismissListener(DialogInterface.OnDismissListener onDismissListener) {
        this.onDismissListener = onDismissListener;
    }

    public static ChildDeleteFragment newInstance() {
        return new ChildDeleteFragment();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(ChildDeleteViewModel.class);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            argName = getArguments().getString(ARG_NAME);
            argChildId = getArguments().getString(ARG_CHILDID);
        }
    }

    public static ChildDeleteFragment newInstance(String childid, String name) {
        Bundle args = new Bundle();
        args.putString(ARG_NAME, name);
        args.putString(ARG_CHILDID, childid);
        ChildDeleteFragment fragment = new ChildDeleteFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        LayoutInflater inflater = getActivity().getLayoutInflater();
        view = inflater.inflate(R.layout.child_delete_fragment, null);
        name = view.findViewById(R.id.child_delete_name);
        name.setText(argName);
        //*Se crea el DialogFragment*//
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage("Eliminar a: ")
                .setPositiveButton(R.string.delete, new DialogInterface.OnClickListener() {

                    public void onClick(final DialogInterface dialog, int id) {
                        String nombreEditado = name.getText().toString();
                        mViewModel.deleteChild(nombreEditado,argChildId, dialog);
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
