list = []

//code here stays the same

function formattCars(cars){
    for(let c of cars){
        list.push(c);
    }
    createType(list)
}

function createType(cars){
    let out = "<select id = 'selectedCarType' class='m-1 col-md-4 form-control' onchange='createModel(list)'>";
    for (const c of cars){
        if (!out.includes(c.type)){
            out += "<option value='"+c.type+"'>"+c.type+"</option>";
        }
    }
    out += "</select>";
    $("#carType").html(out);
    createModel(list)
}

function createModel(cars){ //dataModel = this.value from See string 12 "on change=..."
    const selected = $("#selectedCarType").val();
    console.log(selected)
    let out1 = "<select id = 'selectedCarModel' name='model' class='m-1 col-md-4 form-control'>";
    for(const c of cars){
        if (selected === c.type) {
            out1 += "<option value='" + c.model + "'>" + c.model + "</option>";
        }
    }
    out1 += "</select>";
    $("#carModel").html(out1);
    console.log(out1);
}