let change_to_tab1 = () => {
  document.getElementById("first-tab").classList.add("active-tab");
  document.getElementById("second-tab").classList.remove("active-tab");
  document.getElementById("sphere_two").classList.remove("active-spheres");
  document.getElementById("sphere_two").classList.add("hide-spheres");
  document.getElementById("sphere_one").classList.remove("hide-spheres");
  document.getElementById("sphere_one").classList.add("active-spheres");
}
let change_to_tab2 = () => {
  document.getElementById("second-tab").classList.add("active-tab");
  document.getElementById("first-tab").classList.remove("active-tab");
  document.getElementById("sphere_one").classList.remove("active-spheres");
  document.getElementById("sphere_one").classList.add("hide-spheres");
  document.getElementById("sphere_two").classList.remove("hide-spheres");
  document.getElementById("sphere_two").classList.add("active-spheres");
}
let tab_one = document.getElementById("first-tab");
let tab_two = document.getElementById("second-tab");
tab_one.addEventListener('click', change_to_tab1); 
tab_two.addEventListener('click', change_to_tab2); 


let allTestsBtns = document.querySelectorAll('.showThisTest');
let firstSpheres = document.querySelector('.first-spheres');
let secondSpheres = document.querySelector('.second-spheres');

firstSpheres.onclick = function() {
	let target = event.target;
	localStorage.setItem("endpoint",target.getAttribute('data-endpoint'));
	window.location = 'quiz_test_version.html';
}

secondSpheres.onclick = function(event) {
	let target = event.target;
	localStorage.setItem("endpoint",target.getAttribute('data-endpoint'));
	window.location = 'quiz_test_version.html';
}