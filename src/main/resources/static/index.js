$(function(){
    receiveAllOwners();
});

function receiveAllOwners(){
    $.get("/receiveOwner",function(owner){
        formattOwner(owner);
    });
}

function formattOwner(owners){
    let out = "<table class='table table-striped'>" + "<tr>" +
        "<th>Name</th><th>Second name</th><th>Owned Car</th>" + "</tr>";
    for(const owner of owners){
        out += "<tr>" + "<td>" + owner.name + "</td>" +
        "<td>" + owner.secondName + "</td>" +
        "<td>" + owner.ownedCarType + " " + owner.ownedCarModel + "</td>" +
             "</tr>";
        }
    $("#owners").html(out);

}

function deleteOwner(){
$.get("/deleteOwner", function(){
    window.location.href = "/";
});
}