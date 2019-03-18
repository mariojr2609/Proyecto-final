package com.mjimenez.app_android;

import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.mjimenez.app_android.models.Guarderia;
import com.mjimenez.app_android.responses.ContainerResponse;
import com.mjimenez.app_android.retrofit.generator.ServiceGenerator;
import com.mjimenez.app_android.retrofit.services.GuarderiaService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GuarderiaMapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guarderia_maps);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        GuarderiaService service = ServiceGenerator.createService(GuarderiaService.class);
        Call<ContainerResponse<Guarderia>> call = service.getNearProps("-5.9731700,37.3828300", 100);
        call.enqueue(new Callback<ContainerResponse<Guarderia>>() {
            @Override
            public void onResponse(Call<ContainerResponse<Guarderia>> call, final Response<ContainerResponse<Guarderia>> response) {
                if (response.isSuccessful()) {
                    for (int i = 0; i < response.body().getRows().size(); i++) {
                        if (response.body().getRows().get(i).getLoc() == null) {
                            LatLng seville = new LatLng(37.3828300, -5.9731700);
                            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(seville, 30));
                        }
                        else {
                            String[] latlong = response.body().getRows().get(i).getLoc().split(",");
                            double lat = Double.parseDouble(latlong[0]);
                            double lon = Double.parseDouble(latlong[1]);
                            LatLng loc_marker = new LatLng(lat, lon);
                            LatLng seville = new LatLng(37.3828300, -5.9731700);
                            if(response.body().getRows().get(i).getName().equals("Guarderia")) {
                                mMap.addMarker(new MarkerOptions()
                                        .position(loc_marker)
                                        .draggable(true)
                                        .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_ubication))
                                );
                            }
                            else {
                                mMap.addMarker(new MarkerOptions()
                                        .position(loc_marker)
                                        .draggable(true)
                                        .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_ubication))
                                );
                            }
                            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(seville, 10));
                        }
                    }

                }
                else {
                    Toast.makeText(GuarderiaMapsActivity.this, "Error al cargar los datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ContainerResponse<Guarderia>> call, Throwable t) {
                Toast.makeText(GuarderiaMapsActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
