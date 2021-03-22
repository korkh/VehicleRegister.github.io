package home.practice.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Driver;
import java.util.ArrayList;
import java.util.List;

@RestController
public class RegisterController {
    private final List<Owner> owners = new ArrayList<>();

    @GetMapping("receiveOwner")
    public List<Owner> allOwners(){
        return owners;
    }

    @GetMapping("receiveCars")
    public List<Cars> receiveCars(){
        List<Cars> cars = new ArrayList<>();
        cars.add(new Cars("Audi","A8"));
        cars.add(new Cars("Audi","A4"));
        cars.add(new Cars("Audi","A3"));
        cars.add(new Cars("Peugeot","308"));
        cars.add(new Cars("Peugeot","3008"));
        cars.add(new Cars("Peugeot","5008"));
        return cars;
    }
    @PostMapping("createOwner")
    public void addOwner(Owner innOwner){
        owners.add(innOwner);
    }

    @GetMapping("deleteOwner")
    public void deleteOwner(){
        owners.clear();
    }

}
