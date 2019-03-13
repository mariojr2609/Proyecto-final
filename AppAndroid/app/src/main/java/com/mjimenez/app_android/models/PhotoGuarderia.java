package com.mjimenez.app_android.models;

public class PhotoGuarderia {
    private String id;
    private Guarderia guarderia_id;
    private String imgur_link;
    private String deletehash;

    public PhotoGuarderia(){

    }

    public PhotoGuarderia(String id, Guarderia guarderia_id, String imgur_link, String deletehash) {
        this.id = id;
        this.guarderia_id = guarderia_id;
        this.imgur_link = imgur_link;
        this.deletehash = deletehash;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Guarderia getGuarderia_id() {
        return guarderia_id;
    }

    public void setGuarderia_id(Guarderia guarderia_id) {
        this.guarderia_id = guarderia_id;
    }

    public String getImgur_link() {
        return imgur_link;
    }

    public void setImgur_link(String imgur_link) {
        this.imgur_link = imgur_link;
    }

    public String getDeletehash() {
        return deletehash;
    }

    public void setDeletehash(String deletehash) {
        this.deletehash = deletehash;
    }
}
