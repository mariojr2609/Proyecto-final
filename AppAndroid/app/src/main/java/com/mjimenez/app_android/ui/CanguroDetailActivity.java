package com.mjimenez.app_android.ui;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.models.Canguro;
import com.mjimenez.app_android.models.PhotoCanguro;
import com.mjimenez.app_android.retrofit.generator.Authentication;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.CanguroService;
import com.mjimenez.app_android.retrofit.services.PhotoCanguroService;
import com.mjimenez.app_android.util.Util;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CanguroDetailActivity extends AppCompatActivity implements OnMapReadyCallback {
    private Context ctx;
    private int count = 0;
    private Canguro canguro;
    Uri uri_selected;
    String jwt, id_user;
    public static final int READ_REQUEST_CODE = 42;
    private CanguroService service;
    private PhotoCanguroService photo_service;
    private MapView map;
    private GoogleMap gmap;
    private static final String MAP_VIEW_BUNDLE_KEY = "MapViewBundleKey";
    Map options = new HashMap();
    private ImageView photo;
    private TextView name, age, address, city, studies, phone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_canguro_detail);
        Toolbar toolbar = findViewById(R.id.toolbar);
        jwt = Util.getToken(CanguroDetailActivity.this);
        id_user = Util.getToken(getApplicationContext());
        options.put("near", "-6.0071807999999995,37.3803677");
        System.out.println(id_user);
        setSupportActionBar(toolbar);
        //checkOwnerPhotos();
        FloatingActionButton fab = findViewById(R.id.fab);
        Intent i = getIntent();
        canguro = (Canguro) i.getSerializableExtra("canguro");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        loadItems();
        setItems();
        Bundle mapViewBundle = null;
        if (savedInstanceState != null) {
            mapViewBundle = savedInstanceState.getBundle(MAP_VIEW_BUNDLE_KEY);
        }
        map = findViewById(R.id.canguro_detail_map);
        map.onCreate(mapViewBundle);
        map.getMapAsync(this);
    }

    private void loadItems() {
        ctx = this;
        photo = findViewById(R.id.canguro_detail_photo);
        name = findViewById(R.id.canguro_detail_name);
        age = findViewById(R.id.canguro_detail_age);
        address = findViewById(R.id.canguro_detail_address);
        city = findViewById(R.id.canguro_detail_city);
        studies = findViewById(R.id.canguro_detail_studies);
        phone = findViewById(R.id.canguro_detail_phone);
        map = findViewById(R.id.canguro_detail_map);
        if (canguro.getPhoto().size() == 0) {
            Glide.with(this).load(R.drawable.ic_noimage)
                    //.centerCrop()
                    .into(photo);
        }
        else {
            Glide.with(this).load(canguro.getPhoto().get(0));
                    //.centerCrop().into(photo);
        }
    }

    public void onActivityResult(int requestCode, int resultCode, Intent resultData) {
        if (requestCode == READ_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            Uri uri = null;
            if (resultData != null) {
                uri = resultData.getData();
                Log.i("Filechooser URI", "Uri: " + uri.toString());
            }
            uri_selected = uri;
        }
        upload_photo();
    }

    public void setItems() {
        name.setText(canguro.getName());
        age.setText((String.valueOf(canguro.getAge()) + "años"));
        address.setText(canguro.getAddress());
        city.setText(canguro.getCity());
        studies.setText(canguro.getStudies());
        phone.setText(canguro.getPhone());
    }

    /*public void performFileSearch() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, READ_REQUEST_CODE);
    }*/

    @Override
    public void onMapReady(GoogleMap googleMap) {
        gmap = googleMap;
        gmap.setMinZoomPreference(10);
        String loc = canguro.getLoc();
        String[] locs = loc.split(",");
        locs[0].trim();
        locs[1].trim();
        float latitud = Float.parseFloat(locs[0]);
        float longitud = Float.parseFloat(locs[1]);
        LatLng position = new LatLng(latitud, longitud);
        googleMap.addMarker(new MarkerOptions()
                .position(position)
                .title(canguro.getAddress())
                .snippet("com.mjimenez.app_android")
                .draggable(true)
                .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_ubication))
        );
        gmap.moveCamera(CameraUpdateFactory.newLatLng(position));
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        Bundle mapViewBundle = outState.getBundle(MAP_VIEW_BUNDLE_KEY);
        if (mapViewBundle == null) {
            mapViewBundle = new Bundle();
            outState.putBundle(MAP_VIEW_BUNDLE_KEY, mapViewBundle);
        }
        map.onSaveInstanceState(mapViewBundle);
    }

    @Override
    protected void onResume() {
        super.onResume();
        map.onResume();
    }

    @Override
    protected void onStart() {
        super.onStart();
        map.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        map.onStop();
    }

    @Override
    protected void onPause() {
        map.onPause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        map.onDestroy();
        super.onDestroy();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        map.onLowMemory();
    }

    public void upload_photo(){
        try {
            InputStream inputStream = getContentResolver().openInputStream(uri_selected);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
            int cantBytes;
            byte[] buffer = new byte[1024 * 4];
            while ((cantBytes = bufferedInputStream.read(buffer, 0, 1024 * 4)) != -1) {
                baos.write(buffer, 0, cantBytes);
            }
            RequestBody requestFile = RequestBody.create(MediaType.parse(getContentResolver().getType(uri_selected)), baos.toByteArray());
            MultipartBody.Part body = MultipartBody.Part.createFormData("photo", "photo", requestFile);
            RequestBody canguro_id = RequestBody.create(MultipartBody.FORM, canguro.getId());
            PhotoCanguroService servicePhoto = ServiceGenerator.createService(PhotoCanguroService.class, jwt, Authentication.JWT);
            Call<PhotoCanguro> callPhoto = servicePhoto.getAll(body, canguro_id);
            callPhoto.enqueue(new Callback<PhotoCanguro>() {
                @Override
                public void onResponse(Call<PhotoCanguro> call, Response<PhotoCanguro> response) {
                    if (response.isSuccessful()) {
                        canguro.getPhoto().add(response.body().getId());
                        Log.d("Uploaded", "Éxito");
                        Log.d("Uploaded", response.body().toString());
                        System.out.println(response.code());
                    }
                    else {
                        Log.e("Upload error", response.errorBody().toString());
                    }

                }
                @Override
                public void onFailure(Call<PhotoCanguro> call, Throwable t) {
                }
            });
        }
            catch (IOException e) {
            e.printStackTrace();
        }
    }
}
