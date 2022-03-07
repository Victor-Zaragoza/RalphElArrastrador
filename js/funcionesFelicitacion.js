function recuperar(){
    document.getElementById("NameUser").innerHTML = localStorage.nombre;
   }

   window.onload = function(){
    recuperar(); 
};   