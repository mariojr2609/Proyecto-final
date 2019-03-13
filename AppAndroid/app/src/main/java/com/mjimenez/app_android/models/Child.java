package com.mjimenez.app_android.models;

public class Child {
    private String id;
    private String name;
    private String fecha_nacimiento;
    private String user_id;

    public Child(){

    }

    public Child(String name, String fecha_nacimiento, String user_id) {
        this.name = name;
        this.fecha_nacimiento = fecha_nacimiento;
        this.user_id = user_id;
    }

    public Child(String id, String name, String fecha_nacimiento, String user_id) {
        this.id = id;
        this.name = name;
        this.fecha_nacimiento = fecha_nacimiento;
        this.user_id = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(String fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
