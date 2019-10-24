/*fetch("../assets/scripts/sample.json")
    .then(function(resp) {
	   	return resp.json();
	})
	.then(function(data) {
        console.log(data);
    });*/

function create_obj(data) {
	return new Object(data);
}


function test(obj, json) {
	obj = JSON.parse(json);
	var result = obj.reduce(function(elem) {
      return obj.type;
	});
    return result;
}


function run_quiz() {
	var json_obj;
  fetch("../assets/scripts/sample.json")
    .then(function(resp) {
	   	return resp.json();
	})
	.then(function(data) {
        //json_obj = create_obj(data);    
        console.log(test(json_obj,data));
    });	
}      


var btn = document.getElementById("start");
btn.addEventListener('click', run_quiz);