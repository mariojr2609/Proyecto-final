package com.mjimenez.app_android.responses;

import com.mjimenez.app_android.models.Child;
import java.util.List;

public class UserOneResponse {
    private String id;
    private String nombre;
    private String picture;
    private List<Child> child;

    public UserOneResponse(){

    }

    public UserOneResponse(String id, String nombre, String picture, List<Child> child) {
        this.id = id;
        this.nombre = nombre;
        this.picture = picture;
        this.child = child;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public List<Child> getChild() {
        return child;
    }

    public void setChild(List<Child> child) {
        this.child = child;
    }

    @Override
    public String toString() {
        return "UserOneResponse{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", picture='" + picture + '\'' +
                ", child=" + child +
                '}';
    }
}
