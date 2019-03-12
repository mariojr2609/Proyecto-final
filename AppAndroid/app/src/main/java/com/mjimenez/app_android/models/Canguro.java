package com.mjimenez.app_android.models;

public class Canguro {
    private String id;
    private String name;
    private String photo;
    private String age;
    private String address;
    private String zipcode;
    private String city;
    private String province;
    private String description;
    private String studies;
    private String loc;

    public Canguro(){

    }

    public Canguro(String id, String name, String photo, String age, String address, String zipcode, String city, String province, String description, String studies, String loc) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.age = age;
        this.address = address;
        this.zipcode = zipcode;
        this.city = city;
        this.province = province;
        this.description = description;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
