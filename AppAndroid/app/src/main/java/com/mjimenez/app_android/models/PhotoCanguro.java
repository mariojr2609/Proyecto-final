package com.mjimenez.app_android.models;

public class PhotoCanguro {
    private String id;
    private Canguro canguro_id;
    private String imgur_link;
    private String deletehash;

    public PhotoCanguro(){

    }

    public PhotoCanguro(String id, Canguro canguro_id, String imgur_link, String deletehash) {
        this.id = id;
        this.canguro_id = canguro_id;
        this.imgur_link = imgur_link;
        this.deletehash = deletehash;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Canguro getCanguro_id() {
        return canguro_id;
    }

    public void setCanguro_id(Canguro canguro_id) {
        this.canguro_id = canguro_id;
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
