package com.mjimenez.app_android.models;

import java.util.List;

public class Canguro {
    private String id;
    private String name;
    private List<String> photo;
    private String phone;
    private String age;
    private String address;
    private String city;
    private String studies;
    private String loc;

    public Canguro(){

    }

    public Canguro(String id, String name, String phone, String age, String address, String city, String studies, String loc) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.address = address;
        this.city = city;
        this.studies = studies;
        this.loc = loc;
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

    public List<String> getPhoto() {
        return photo;
    }

    public void setPhoto(List<String> photo) {
        this.photo = photo;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStudies() {
        return studies;
    }

    public void setStudies(String studies) {
        this.studies = studies;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }
}
