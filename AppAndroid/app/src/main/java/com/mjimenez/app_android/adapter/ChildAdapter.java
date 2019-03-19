package com.mjimenez.app_android.adapter;

import android.content.Context;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.interfaces.ChildListener;
import com.mjimenez.app_android.models.Child;
import java.util.List;

public class ChildAdapter extends RecyclerView.Adapter<ChildAdapter.ViewHolder> {
    private final List<Child> mValues;
    private final ChildListener mListener;
    private Context ctx;

    public ChildAdapter(Context ctx, int layout, List<Child> items, ChildListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_child, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.name.setText(holder.mItem.getName());
        holder.fecha_nacPersona.setText(holder.mItem.getFecha_nacimiento());
        holder.BtnDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onDeleteBtnClick(holder.mItem.getId(), holder.mItem.getName());
            }
        });
        holder.BtnEditar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onEditPersonaClick(holder.mItem);
            }
        });
        holder.infoPersona.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onClickPersona(holder.mItem);
            }

        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
    public final View mView;
    public final TextView name;
    public final TextView fecha_nacPersona;
    public Child mItem;
    public final Button BtnDelete;
    public final CardView infoPersona;
    public final Button BtnEditar;
    //public final CardView elementoPersona;
    public ViewHolder(View view) {
        super(view);
        mView = view;
        nombrePersona = view.findViewById(R.id.nombreMedicamento);
        fechaNacPersona = view.findViewById(R.id.diaSemana);
        btnDelete = view.findViewById(R.id.btnDeletePersona);
        infoPersona = view.findViewById(R.id.cardViewPersonas);
        btnEditar = view.findViewById(R.id.btnEditPersona);
        //elementoPersona = view.findViewById(R.id.cardView);
    }

    @Override
    public String toString() {
        return super.toString() + " '" + nombrePersona.getText() + "'";
    }
    }
}
