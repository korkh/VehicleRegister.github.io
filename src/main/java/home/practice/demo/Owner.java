package home.practice.demo;

public class Owner {
    public String name;
    public String secondName;
    public String ownedCarType;
    public String ownedCarModel;

    public Owner(String name, String secondName, String ownedCarType, String ownedCarModel) {
        this.name = name;
        this.secondName = secondName;
        this.ownedCarType = ownedCarType;
        this.ownedCarModel = ownedCarModel;
    }

    public Owner(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getOwnedCarType() {
        return ownedCarType;
    }

    public void setOwnedCarType(String ownedCarType) {
        this.ownedCarType = ownedCarType;
    }

    public String getOwnedCarModel() {
        return ownedCarModel;
    }

    public void setOwnedCarModel(String ownedCarModel) {
        this.ownedCarModel = ownedCarModel;
    }
}
