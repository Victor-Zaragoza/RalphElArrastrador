// Funciones Para la pantalla de inicio

//Se carga al abrir la pantalla y reproduce el sonido
function sonido(){
    const inicio= cargarSonido("../multimedia/sound/sonido.mp3"); 
    inicio.play();
}

const cargarSonido = function (fuente) {
    const sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; 
    document.body.appendChild(sonido);
    return sonido;
};

// Crea el lienzo canvas
function iniciar(){
    canvas= document.getElementById('lienzo');
    lienzo= canvas.getContext('2d');
}

// Almacena el nombre del jugador en el local storage y redirige al juego
function guardarDatos(){
    let nombre= document.getElementById("nombre").value;
    nombre= JSON.stringify(nombre);

    localStorage.setItem("nombre",nombre);
    alert("Datos gurdados")
    window.open("../main.html", "_self");
    // window.open("main.html", "_self");

}

window.addEventListener('load', iniciar, false);