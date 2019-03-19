package com.mjimenez.app_android.adapter;

import android.content.Context;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.interfaces.GuarderiaListener;
import com.mjimenez.app_android.models.Guarderia;
import java.util.List;

public class GuarderiaAdapter extends RecyclerView.Adapter<GuarderiaAdapter.ViewHolder> {
    private final List<Guarderia> mValues;
    private final GuarderiaListener mListener;
    private Context ctx;

    public GuarderiaAdapter(Context context, int layout, List<Guarderia> items, GuarderiaListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_guarderia, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.name.setText(holder.mItem.getName());
        holder.address.setText(holder.mItem.getAddress());
        holder.city.setText(holder.mItem.getCity());
        /*if(holder.mItem.getCategoryId().getName().equals("Alquiler")){
            holder.price.setText(String.valueOf(price)+" €/mes");
        }
        else{
            holder.price.setText(String.valueOf(price)+" €");
        }*/
        holder.photo.setScaleType(ImageView.ScaleType.CENTER_CROP);
        if (holder.mItem.getPhoto() == null) {
            Glide.with(ctx).load(R.drawable.ic_noimage).into(holder.photo);
        } else {
            Glide.with(ctx).load(holder.mItem.getPhoto().get(0)).into(holder.photo);
        }
        /*Para ocultar el icono de favoritos si no estás logueado
        if (Util.getToken(ctx) == null) {
            holder.favourite.setVisibility(View.INVISIBLE);
        }
        if (mValues.get(position).getIsFav()) {
            holder.favourite.setImageResource(R.drawable.ic_like);
        }
        else {
            holder.favourite.setImageResource(R.drawable.ic_corazon);
        }
        holder.favourite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (holder.favourite.getDrawable().getConstantState().equals(holder.favourite.getResources().getDrawable(R.drawable.ic_corazon).getConstantState())) {
                    mListener.onClickFav(holder.favourite, holder.mItem.getId());
                }
                else {
                    mListener.onClickDeletFav(holder.favourite, holder.mItem.getId());
                }
            }
        });*/
        holder.CardViewGuarderia.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.OnClickGuarderia(holder.mItem);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView name, address, city;
        public final ImageView photo;
        public final CardView CardViewGuarderia;
        public Guarderia mItem;
        public ViewHolder(View view) {
            super(view);
            mView = view;
            name = view.findViewById(R.id.guarderia_list_name);
            address = view.findViewById(R.id.guarderia_list_address);
            city = view.findViewById(R.id.guarderia_list_city);
            photo = view.findViewById(R.id.guarderia_list_photo);
            CardViewGuarderia = view.findViewById(R.id.guarderia_cardview);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + address.getText() + "'";
        }
    }

    public void addGuarderia(List<Guarderia> guarderia) {
        for(int i=0;i<guarderia.size();i++) {
            guarderia.add(guarderia.get(i));
        }
    }
}
