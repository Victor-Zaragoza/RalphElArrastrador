//Arreglo de animales
const arreglOriginal = [
    {
        animal: "Oso",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Lobo",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Chango",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Pinguino",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Leon",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Panda",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: ""
    },
    {
        animal: "Tiburon",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: "3"
    },
    {
        animal: "Aguila",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: "2"
    },
    {
        animal: "Ardilla",
        imagenAnimal: "",
        imagenHabitat: "",
        audioCorrecto: "1"
    }
]

//Inicializar variables de juego:
var puntuacion = 0;
const animalesAEscoger = arregloAleatorio(6,arreglOriginal);
//Ahora dividimos los 6 animales seleccionados en 2, 3 para la primera ronda 
//y 3 para la segunda ronda. 
const mitad = Math.ceil(animalesAEscoger.length / 2);
//Primera Ronda:Debemos de revorujar los hábitats para que no salgan en orden.
const animalesPrimeraRonda = animalesAEscoger.splice(0, mitad);   
const habitatsPrimeraRonda = arregloAleatorio(3,animalesPrimeraRonda);

//Segunda Ronda: Debemos de revorujar los hábitats para que no salgan en orden.
const animalesSegundaRonda = animalesAEscoger.splice(-mitad);
const habitatsSegundaRonda = arregloAleatorio(3,animalesSegundaRonda);
//Recuperamos dónde pondremos cada cosa; por defecto mostramos la primera ronda.
//Pudiera ser que tengamos una función que borre lo de las cajas para mostrar 
//lo de la segunda ronda.
const cajaDeHabitats = document.querySelector("#habitats");
const cajaDeAnimales = document.querySelector("#animales");

//Primero imprimimos los animales de la primera ronda.
for(var i=0;i<animalesPrimeraRonda.length;i++){
    //TODO: Agregar las imágenes del oso y también su sonido (puede ser con data-oso = URLDelSonido, y recuperarlo cuando es dragstart)
    //data-sonido contiene la dirección del Sonido del animal. Se puede obtener en un evento Drag and drop con getAttribute("data-sonido")
    var url = "https://upload.wikimedia.org/wikipedia/commons/6/60/OpenEuphoria_mascot_200px.png"; //Sólo es para probar, la línea anterior es la que en realidad se va a quedar. 
    cajaDeAnimales.insertAdjacentHTML("beforeend",'<img class="arrastrable" id="'+animalesPrimeraRonda[i].animal+'" draggable=true data-sonido="'+animalesPrimeraRonda[i].audioCorrecto+'" src="'+url+'">');
}

//Luego imprimimos los hábitats de la primera ronda.
for(var i=0;i<habitatsPrimeraRonda.length;i++){
    //TODO: Agregar las imágenes del oso y también su sonido (puede ser con data-oso = URLDelSonido, y recuperarlo cuando es dragstart)
    //var url = "url('media/"+habitatsPrimeraRonda[i].imagenHabitat+"')";
    var url = "url('https://upload.wikimedia.org/wikipedia/commons/6/60/OpenEuphoria_mascot_200px.png')"; //Sólo es para probar, la línea anterior es la que en realidad se va a quedar. 
    cajaDeHabitats.insertAdjacentHTML("beforeend",'<canvas class="soltar" style="background-image: '+url+'" data-habitat="'+habitatsPrimeraRonda[i].animal+'"></canvas>');
}

const objetosDraggable = document.querySelectorAll(".arrastrable");
const objetosDroppable = document.querySelectorAll(".soltar");

objetosDraggable.forEach(elemto=>{
    elemto.addEventListener("dragstart",ondragstart);
});

objetosDroppable.forEach(elemto=>{
    elemto.addEventListener("dragenter",ondragenter);
    elemto.addEventListener("dragleave",ondragout);
    elemto.addEventListener("dragover",ondragover);
    elemto.addEventListener("drop",soltado);
});

function ondragover(e){
    console.log("Entré Dragover");
    e.preventDefault();
}

function ondragstart(e){
    console.log("Entré Dragstart");
    e.dataTransfer.setData("animal", e.target.id);
    e.dataTransfer.setData("sonido", e.target.getAttribute("data-sonido"));
}

function ondragenter(e){
    //Añadir clase de estilos a habitat
    console.log("Entré dragenter");
}

function ondragout(e){
    console.log("Entré dragout");
    //Quitar clase de estilos a habitat
}

function soltado(e){
    e.preventDefault();
    console.log("Entré");
    const nombreAnimalArrastrado = e.dataTransfer.getData("animal");
    const sonidoAnimal = e.dataTransfer.getData("sonido");
    const nombreHabitatSoltable = e.target.getAttribute("data-habitat");
    if(nombreAnimalArrastrado===nombreHabitatSoltable){
        alert("Correcto");
        //Incrementar score
        //Si el puntaje%3 != 0
            //Si puntaje == 6
                //Pantalla de felicitación.
            //Else
                //Llamar a función de siguiente pantalla.

        //Reproducir sonido
        //Que la imagen no se pueda arrastrar
        //Poner nombre del animal debajo habitat
    }else{
        alert("Incorrecto");
        //Reproducir sonido error.
        //Regresar animal a su lugar original.
    }
}

//Para agregar los eventos drop, dragstart, dragend y eso, se puede hacer un document.querySelector de todos los ´habitats o animales y agregandoles a cada uno las funciones necesarias.


function arregloAleatorio(tam,arreglOriginal){
    let nuevoArreglo = [];
    let arregloClonado = [...arreglOriginal];
    if(tam>arregloClonado.length) 
        tam=arregloClonado.length;
    for(let i=1; i<=tam; i++) {
        const posicion = Math.floor(Math.random()*arregloClonado.length);
        nuevoArreglo.push(arregloClonado[posicion]);
        arregloClonado.splice(posicion, 1);
    }
    return nuevoArreglo;
}