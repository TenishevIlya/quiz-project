function loading(event){	
  event.preventDefault()	
  document.getElementById("spinner").classList.add('show');
  setTimeout('location.replace("index.html")', 3000);	
}
let btn = document.getElementById("sign");
btn.addEventListener('click', loading); 