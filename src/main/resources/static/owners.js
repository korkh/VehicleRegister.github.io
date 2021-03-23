let car_array = []; //create empty array (will be populated with data from get call) -> let's call this "car_array"

$(function(){
    receiveAllCars();
});

function receiveAllCars(){
    $.get("/receiveCars",function(cars){
        formattCars(cars);

    });
}

function formattCars(cars){   //takes in the car data (from the get function, where you call formattCars())

     for(const car of cars) {  //loop through cars and
            car_array.push(car);  //add each item to your global car_array --- I'm not sure should I pass car.type and car.model or complete car as object???
            console.log(car_array);// ----------> At this point, the data from your get call will have been saved into memory and can be accessed from anywhere in this script
        }
     createType(car_array);  //call createType([parameters here])    -> pass in your global car_array variable, now populated

}
function createType(cars){
    //create your <select>      -> onchange will call createModel([parameters here]) -> TIP: use the global variable!
    let out = "<select id = 'selectedCarType' class='m-1 col-md-4 form-control' onchange='createModel(this.value, car_array)'>";
    for (const car of cars){   //loop through cars
        if(!cars.includes(car.types)){ // or it should be if(!cars.includes(car.type){....} ?
            car_array.push(car.types);
            out += "<option value='" + car.type + "'>" + car.type+ "</option>";
        }
    }
    out += "</select>";
    $("#carType").html(out);  //add output to HTML page
    console.log(out);
    //OPTIONAL: call createModel([parameters here]) to have the second dropdown menu appear when you load the page -> TIP: use the global variable!
    createModel(car_array);
}


function createModel(cars){ //dataModel = this.value from See string 12 "on change=..."
    //get value of the previous <select> tag (let's call this variable "prev")
    let prev = $("#selectedCarType").val();
    let out1 = "<select id = 'selectedCarModel' name='model' class='m-1 col-md-4 form-control'>";
    for(const car of cars){    //loop through cars
        //check if car's type == prev
        if (car.type === prev) {
            out1 += "<option value='" + car.model + "'>" + car.model + "</option>";
            console.log(out1);
        }
    }
    out1 += "</select>";
    $("#carModel").html(out1);

}


function createOwner(){
    const owner = {
        name: $("#name").val(),
        secondName: $("#secondName").val(),
        ownedCarType: $("#selectedCarType").val(),
        ownedCarModel: $("#selectedCarModel").val()
    };

    const url = "/createOwner";
    $.post(url, owner, function(){
        window.location.href= '/';
    });
}