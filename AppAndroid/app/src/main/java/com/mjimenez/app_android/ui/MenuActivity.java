package com.mjimenez.app_android.ui;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.mjimenez.app_android.R;
import com.mjimenez.app_android.fragment_dialog.ChildDeleteFragment;
import com.mjimenez.app_android.fragment_dialog.ChildEditFragment;
import com.mjimenez.app_android.fragment_list.CanguroFragment;
import com.mjimenez.app_android.fragment_list.ChildFragment;
import com.mjimenez.app_android.fragment_list.GuarderiaFragment;
import com.mjimenez.app_android.interfaces.CanguroListener;
import com.mjimenez.app_android.interfaces.ChildListener;
import com.mjimenez.app_android.interfaces.GuarderiaListener;
import com.mjimenez.app_android.models.Canguro;
import com.mjimenez.app_android.models.Child;
import com.mjimenez.app_android.models.Guarderia;
import com.mjimenez.app_android.util.Util;
import com.mjimenez.app_android.util.geography.CanguroMapsActivity;

public class MenuActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, ChildListener, CanguroListener, GuarderiaListener {
    private Fragment fragment;
    private Toolbar toolbar;
    private DrawerLayout drawer;
    private NavigationView navigation_view;
    private ImageView user_picture;
    private TextView user_name, user_email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        findViewsById();
        toolbar.setTitle("AppKids");
        setSupportActionBar(toolbar);
        getInfoUser();
        Bundle extras = getIntent().getExtras();
        /*fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });*/
        if (Util.getToken(MenuActivity.this) == null) /*fab.hide()*/;
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();
        navigation_view.setNavigationItemSelectedListener(this);
        hideItems();
        Bundle bundle = new Bundle();
        Fragment ff = new ChildFragment();
        ff.setArguments(bundle);
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.container, ff, "mainF")
                .commit();
    }

    public void findViewsById() {
        toolbar = findViewById(R.id.toolbar);
        drawer = findViewById(R.id.drawer_layout);
        navigation_view = findViewById(R.id.nav_view);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        }
        else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.nav_map) {
            startActivity(new Intent(MenuActivity.this, CanguroMapsActivity.class));
            return true;
        }
        else if (id == R.id.nav_cerrarsesion) {
            startActivity(new Intent(MenuActivity.this, LoginActivity.class));
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.nav_child) {
            fragment = new ChildFragment();
            toolbar.setTitle("Children");
            getSupportFragmentManager().beginTransaction().replace(R.id.container, fragment, "ChildFragment").commit();
        }
        else if (id == R.id.nav_guarderia) {
            fragment = new GuarderiaFragment();
            toolbar.setTitle("Guarderias");
            getSupportFragmentManager().beginTransaction().replace(R.id.container, fragment, "GuarderiaFragment").commit();
        }
        else if (id == R.id.nav_canguro) {
            fragment = new CanguroFragment();
            toolbar.setTitle("Canguros");
            getSupportFragmentManager().beginTransaction().replace(R.id.container, fragment, "CanguroFragment").commit();
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void getInfoUser() {
        View headerView = navigation_view.getHeaderView(0);
        user_picture = headerView.findViewById(R.id.menu_photo);
        user_name = headerView.findViewById(R.id.menu_name);
        user_email = headerView.findViewById(R.id.menu_email);
        if (Util.getToken(MenuActivity.this) == null) {
            Glide.with(MenuActivity.this).load("https://avatars.servers.getgo.com/2205256774854474505_medium.jpg").into(user_picture);
            user_name.setText("Login or Signup");
            user_email.setVisibility(View.INVISIBLE);
        }
        else {
            Glide.with(MenuActivity.this).load(Util.getPhotoUser(MenuActivity.this)).into(user_picture);
            user_name.setText(Util.getNombreUser(MenuActivity.this));
            user_email.setText(Util.getEmailUser(MenuActivity.this));
        }
    }

    public void hideItems() {
        Menu nav_Menu = navigation_view.getMenu();
        if (Util.getToken(MenuActivity.this) == null) {
            nav_Menu.findItem(R.id.nav_child).setVisible(false);
            nav_Menu.findItem(R.id.nav_guarderia).setVisible(false);
            nav_Menu.findItem(R.id.nav_canguro).setVisible(false);
        }
    }

    @Override
    public void OnClickChild(Child child) {
        Intent details = new Intent(MenuActivity.this, ChildFragment.class);
        details.putExtra("CHILD_ID", child.getId());
        details.putExtra("CHILD_NAME", child.getName());
        details.putExtra("CHILD_FECHANACIMIENTO", child.getFecha_nacimiento());
        //details.putExtra("CHILD_CREATEDAT", property.getCreatedAt());
        startActivity(details);
    }

    @Override
    public void OnEditChildClick(Child child) {
        Intent details = new Intent(MenuActivity.this, ChildEditFragment.class);
        details.putExtra("CHILD_ID", child.getId());
        details.putExtra("CHILD_NAME", child.getName());
        details.putExtra("CHILD_FECHANACIMIENTO", child.getFecha_nacimiento());
        //details.putExtra("CHILD_CREATEDAT", property.getCreatedAt());
        startActivity(details);
    }

    @Override
    public void OnDeleteChildClick(String id, String name) {
        Intent details = new Intent(MenuActivity.this, ChildDeleteFragment.class);
        //details.putExtra("CHILD_ID", child.getId());
        //details.putExtra("CHILD_NAME", child.getName());
        //details.putExtra("CHILD_CREATEDAT", property.getCreatedAt());
        startActivity(details);
    }

    @Override
    public void OnClickGuarderia(Guarderia guarderia) {
        Intent details = new Intent(MenuActivity.this, GuarderiaDetailActivity.class);
        details.putExtra("GUARDERIA_ID", guarderia.getId());
        details.putExtra("GUARDERIA_NAME", guarderia.getName());
        details.putExtra("GUARDERIA_PHONE", guarderia.getPhone());
        details.putExtra("GUARDERIA_ADDRESS", guarderia.getAddress());
        details.putExtra("GUARDERIA_CITY", guarderia.getCity());
        details.putExtra("GUARDERIA_DESCRIPTION", guarderia.getDescription());
        details.putExtra("GUARDERIA_LOC", guarderia.getLoc());
        //details.putExtra("GUARDERIA_CREATEDAT", property.getCreatedAt());
        startActivity(details);
    }

    @Override
    public void OnClickCanguro(Canguro canguro) {
        Intent details = new Intent(MenuActivity.this, CanguroDetailActivity.class);
        details.putExtra("CANGURO_ID", canguro.getId());
        details.putExtra("CANGURO_NAME", canguro.getName());
        details.putExtra("CANGURO_AGE", canguro.getAge());
        details.putExtra("CANGURO_PHONE", canguro.getPhone());
        details.putExtra("CANGURO_ADDRESS", canguro.getAddress());
        details.putExtra("CANGURO_CITY", canguro.getCity());
        details.putExtra("CANGURO_STUDIES", canguro.getStudies());
        details.putExtra("CANGURO_LOC", canguro.getLoc());
        //details.putExtra("CANGURO_CREATEDAT", property.getCreatedAt());
        startActivity(details);
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {
    }
}
