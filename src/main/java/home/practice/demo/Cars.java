package home.practice.demo;

public class Cars {
    public String type;
    public String model;

    public Cars(String type, String model) {
        this.type = type;
        this.model = model;
    }

    public Cars(){}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
