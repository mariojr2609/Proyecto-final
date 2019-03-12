package com.mjimenez.app_android.models;

public class Valuation {
    private String id;
    private String name;
    private String opinion;

    public Valuation(){

    }

    public Valuation(String id, String name, String opinion) {
        this.id = id;
        this.name = name;
        this.opinion = opinion;
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

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }
}
