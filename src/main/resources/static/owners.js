$(function(){
    receiveAllCars();
});

function receiveAllCars(){
    $.get("/receiveCars",function(cars){
        formattCars(cars);

    });
}

function formattCars(cars){
    let out = "<select id = 'selectedCarType' class='m-1 col-md-4 form-control' onchange='createModel(this.value, cars)'>";
    /*let out1 = "<select id = 'selectedCarModel' class='m-1 col-md-4 form-control'>"*/
    console.log(cars);
    let carTypes = [];
    for(const car of cars) {
        if (!carTypes.includes(car.type)) {
            carTypes.push(car.type);
            out += "<option value='" + car.type + "'>" + car.type+ "</option>";
            }
        }

    out += "</select>";
    /*out1 += "</select>";*/
    $("#carType").html(out);
   /* $("#carModel").html(out1);*/
}



function createModel(dataModel, cars){ //dataModel = this.value from See string 12 "on change=..."
    let out1 = "<select id = 'selectedCarModel' name='model' class='m-1 col-md-4 form-control'>";
    for(const car of cars){
        if (dataModel === car.type) {
            out1 += "<option value='" + car.model + "'>" + car.model + "</option>";
        }
    }
    out1 += "</select>";
    $("#carModel").html(out1);
    console.log(out1);
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