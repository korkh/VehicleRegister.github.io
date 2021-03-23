$(function(){
    receiveAllCars();
});

function receiveAllCars(){
    $.get("/receiveCars",function(cars) {
        formattCars(cars)
    });
}

/* ------- BLOCK START ------- */
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
/* ------- BLOCK END ------- */

/*
N.B.: I will use names that look like variables (ex: car_type, car_model, etc) just to make them recognisable throughout the explanation.
      Function names will correspond to your original function names.

The problem with the block marked above is as follows:
    receiveAllCars() is retrieving the cars from the server and passing them into formattCars() -> this is okay
    then formattCars() loops through car_array and retrieves only unique values for car_types -> this is okay (but can be made clearer)
    finally, formattCars() turns those values into <option> tags that the user can select from -> this is still okay, BUT here is where the problem starts
        Because you need your next dropdown menu to be created when the option is changed ("onchange"), you need to call onchange="createModel([insert parameters here])"
        And createModel() will need 1.the current car_type 2.the car_array, from which to retrieve all car_models
        Now, createModel() can get the car_type either by a)taking in a parameter (as you did, with dataModel) or b)with getElementById([ID of the dropdown menu for car_type])
            Both of these can be okay, but your initial idea of using getElementById might be simpler (especially if you want to make the second menu appear when the page is loaded)
        The problem is with car_array -> you need to get it from somewhere
            receiveAllCars() is asynchronous, which means that the data it retrieves from the server is not loaded immediately when the page is loaded. It can take some time for it to come in.
            The consequence for this is that if you tried to do something like
                let example_variable;
                function receiveAllCars(){
                    $.get("/address",function(data){
                        example_variable = data;
                    });
                }
                function example_func(example_parameter){
                    return example_variable;
                }
                example_func(example_variable);
            your example_func would return "undefined", and not "data", because it runs BEFORE the data from the server has been loaded.

            What does this mean for you? That whenever you're using the data from the get request, you need it to arrive through the get call first.
            So you need the data either to pass directly (through parameters, even if you have other functions acting as middle-men) or you need to force the functions to take place in a specific order (so that the get call comes first)

            This also implies that, in order to pass that data into a function, that data needs to EXIST in the place of origin.
            That is where things start going wrong.
            When calling createModel() from the HTML, you're not managing to access the car_array data that you want to pass in.
            So what does that mean for us? You need to make sure your function createModel() has access to the car_array.

So, having said all this, I'm going to write some pseudo-code here to guide you. And when implementing it, remember the following:
1. GET calls are asynchronous -> first, retrieve the data; THEN call functions that use it
2. Functions need access to data -> parameters and globals are your friends

----------------- Pseudo-code suggestion (starting from line 1; mostly replaces marked block) -----------------
//create empty array (will be populated with data from get call) -> let's call this "car_array"

[lines 1 to 10 stay the same]

//change function formattCars()
function formattCars(cars){         -> takes in the car data (from the get function, where you call formattCars())
    //loop through cars and add each item to your global car_array
                        // ----------> At this point, the data from your get call will have been saved into memory and can be accessed from anywhere in this script
    //call createType([parameters here])    -> pass in your global car_array variable, now populated
}

//create new function that makes the dropdown menu for the types
function createType(cars){      -> this function takes in the cars. TIP: When calling it, use the global variable car_array!
    //create your <select>      -> onchange will call createModel([parameters here]) -> TIP: use the global variable!
    //loop through cars
        //check if out contains current car
    //add output to HTML page
    //OPTIONAL: call createModel([parameters here]) to have the second dropdown menu appear when you load the page -> TIP: use the global variable!
}

function createModel(cars){     -> this function takes in the cars. TIP: When calling it, use the global variable car_array!
    //get value of the previous <select> tag (let's call this variable "prev")
    //create your <select>
    //loop through cars
        //check if car's type == prev
    //add output to HTML page
}

*/

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