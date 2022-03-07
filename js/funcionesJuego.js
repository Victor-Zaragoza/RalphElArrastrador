//Arreglo de animales
const arreglOriginal = [
  {
    animal: "Abeja",
    imagenAnimal: "/multimedia/images/abeja.png",
    imagenHabitat: "h-abeja.png",
    audioCorrecto: "/multimedia/sound/s-abeja.mp3",
  },
  {
    animal: "Lobo",
    imagenAnimal: "/multimedia/images/lobo.png",
    imagenHabitat: "h-lobo.png",
    audioCorrecto: "multimedia/sound/s-lobo.mp3",
  },
  {
    animal: "Mono",
    imagenAnimal: "/multimedia/images/mono.png",
    imagenHabitat: "h-mono.png",
    audioCorrecto: "/multimedia/sound/s-mono.wav",
  },
  {
    animal: "Pingüino",
    imagenAnimal: "/multimedia/images/pinguino.png",
    imagenHabitat: "h-pinguino.png",
    audioCorrecto: "multimedia/sound/s-pinguino.mp3",
  },
  {
    animal: "León",
    imagenAnimal: "/multimedia/images/leon.png",
    imagenHabitat: "h-leon.png",
    audioCorrecto: "/multimedia/sound/s-leon.mp3",
  },
  {
    animal: "Panda",
    imagenAnimal: "/multimedia/images/panda.png",
    imagenHabitat: "h-panda.png",
    audioCorrecto: "multimedia/sound/s-panda.mp3",
  },
  {
    animal: "Tiburón",
    imagenAnimal: "/multimedia/images/tiburon.png",
    imagenHabitat: "h-tiburon.png",
    audioCorrecto: "multimedia/sound/s-tiburon.mp3",
  },
  {
    animal: "Caballo",
    imagenAnimal: "/multimedia/images/caballo.png",
    imagenHabitat: "h-caballo.png",
    audioCorrecto: "multimedia/sound/s-caballo.mp3",
  },
  {
    animal: "Rana",
    imagenAnimal: "/multimedia/images/rana.png",
    imagenHabitat: "h-rana.png",
    audioCorrecto: "multimedia/sound/s-rana.mp3",
  },
  {
    animal: "Camello",
    imagenAnimal: "/multimedia/images/camello.png",
    imagenHabitat: "h-camello.png",
    audioCorrecto: "multimedia/sound/s-camello.mp3",
  },
  {
    animal: "Vaca",
    imagenAnimal: "/multimedia/images/vaca.png",
    imagenHabitat: "h-vaca.png",
    audioCorrecto: "/multimedia/sound/s-vaca.mp3",
  },
  {
    animal: "Pez",
    imagenAnimal: "/multimedia/images/pez.png",
    imagenHabitat: "h-pez.png",
    audioCorrecto: "/multimedia/sound/s-pez.mp3",
  },
  {
    animal: "Tucán",
    imagenAnimal: "/multimedia/images/tucan.png",
    imagenHabitat: "h-tucan.png",
    audioCorrecto: "multimedia/sound/s-jungla.mp3",
  },
  {
    animal: "Cocodrilo",
    imagenAnimal: "/multimedia/images/cocodrilo.png",
    imagenHabitat: "h-cocodrilo.png",
    audioCorrecto: "multimedia/sound/s-cocodrilo.mp3",
  },
];

//Inicializar variables de juego:
var puntuacion = 0;
const animalesAEscoger = arregloAleatorio(6, arreglOriginal);

//Ahora dividimos los 6 animales seleccionados en 2, 3 para la primera ronda
//y 3 para la segunda ronda.
const mitad = Math.ceil(animalesAEscoger.length / 2);

//Primera Ronda:Debemos de mezclar los hábitats para que no salgan en orden.
const animalesPrimeraRonda = animalesAEscoger.splice(0, mitad);
const habitatsPrimeraRonda = arregloAleatorio(3, animalesPrimeraRonda);

//Segunda Ronda: Debemos de mezclar los hábitats para que no salgan en orden.
const animalesSegundaRonda = animalesAEscoger.splice(-mitad);
const habitatsSegundaRonda = arregloAleatorio(3, animalesSegundaRonda);

controlJuego(animalesPrimeraRonda, habitatsPrimeraRonda);

//Función cuando tomamos a un animal
function ondragstart(e) {
  e.dataTransfer.setData("animal", e.target.id);
  e.dataTransfer.setData("sonido", e.target.getAttribute("data-sonido"));
  //Estilos al momento de tomar un animal
  e.dataTransfer.setDragImage(e.target, 50, 50);
}

//Función para cuando se está sobre un habitat
function ondragover(e) {
  e.preventDefault();
  if (e.target.className == "habitats") return false;
  else return true;
}

//Función para cuando un animal entra a un habitat
function ondragenter(e) {
  //Añadir clase de estilos a habitat
  e.target.style.border = "thick dashed #FFC312";
}

//Función para cuando un animal sale de un habitat
function ondragout(e) {
  //Quitar clase de estilos a habitat
  e.target.style.border = "none";
}

//Función cuando un animal es soltado en un habitat
function soltado(e) {
  e.preventDefault();

  const nombreAnimalArrastrado = e.dataTransfer.getData("animal");
  const sonidoAnimal = e.dataTransfer.getData("sonido");
  const nombreHabitatSoltable = e.target.getAttribute("data-habitat");

  if (nombreAnimalArrastrado === nombreHabitatSoltable) {
    //Reproducir sonido
    reproducirSonido(sonidoAnimal);

    //Agregar animal al hábitat
    e.target.appendChild(document.getElementById(nombreAnimalArrastrado));

    //Poner nombre del animal debajo habitat
    e.target.insertAdjacentHTML("beforeend", "<h2>"+ nombreAnimalArrastrado +"</h2>");
    
    //Establecer atributo draggable como false
    document.getElementById(nombreAnimalArrastrado).draggable = false;

    //Incrementar score
    puntuacion++;

    if (puntuacion == 3) {
      //Agregar botón para siguiente ronda
      document.getElementById("divBoton").innerHTML =
      '<button id="boton" type="button" onclick="controlJuego(animalesSegundaRonda, habitatsSegundaRonda);" >Siguiente Ronda<img src="multimedia/images/correcto.png"></button>';
    }
    if (puntuacion == 6) {
      //Mostrar pantalla de felicitación
      window.open("../felicitacion.html", "_self");
        
    }
  } else {
    //Reproducir sonido error.
    reproducirSonido("/multimedia/sound/error.wav");
  }

  //Quitar estilos aplicados al habitat
  e.target.style.border = "none";
  e.target.style.borderRadius = "0px";
}

function arregloAleatorio(tam, arreglOriginal) {
  let nuevoArreglo = [];
  let arregloClonado = [...arreglOriginal];
  if (tam > arregloClonado.length) tam = arregloClonado.length;
  for (let i = 1; i <= tam; i++) {
    const posicion = Math.floor(Math.random() * arregloClonado.length);
    nuevoArreglo.push(arregloClonado[posicion]);
    arregloClonado.splice(posicion, 1);
  }
  return nuevoArreglo;
}

function reproducirSonido (fuente) {
  const sonido = document.createElement("audio");
  sonido.src = fuente;
  sonido.setAttribute("preload", "auto");
  sonido.setAttribute("controls", "none");
  sonido.style.display = "none";
  document.body.appendChild(sonido);
  sonido.play();
};

/*Esta función agrega a la ventana los animales y habitats y sus respectivas propiedades o eventos*/
function controlJuego(animales, habitats) {
  //Recuperamos dónde pondremos cada cosa
  const cajaDeHabitats = document.querySelector("#habitats");
  const cajaDeAnimales = document.querySelector("#animales");

  cajaDeHabitats.innerHTML = "";
  cajaDeAnimales.innerHTML = "";
  document.getElementById("divBoton").innerHTML = "";

  //Para agregar los animales de la ronda.
  /*Características de estas etiquetas:
    Etiqueta: img
    data-sonido:  contiene la dirección del Sonido del animal
    atributo draggable=true
    clase: arrastrable
  */
  //data-sonido contiene la dirección del Sonido del animal. Se puede obtener en un evento Drag and drop con getAttribute("data-sonido")
  for (var i = 0; i < animales.length; i++) {
    cajaDeAnimales.insertAdjacentHTML(
      "beforeend",
      '<img class="arrastrable" id="' +
        animales[i].animal +
        '" draggable=true data-sonido="' +
        animales[i].audioCorrecto +
        '" src="' +
        animales[i].imagenAnimal +
        '">'
    );
  }

  //Para agregar los hábitats de la ronda.
  /*Características de estas etiquetas:
    Etiqueta: div
    data-habitat:
    clase: soltar
  */
  for (var i = 0; i < habitats.length; i++) {
    var url = "url('/multimedia/images/" + habitats[i].imagenHabitat + "')";
    cajaDeHabitats.insertAdjacentHTML(
      "beforeend",
      '<div class="soltar" style="background-image: ' +
        url +
        '" data-habitat="' +
        habitats[i].animal +
        '"></div>'
    );
  }
  //Recuperar los objetos involucrados en el funcionamiento del juego
  const objetosDraggable = document.querySelectorAll(".arrastrable");
  const objetosDroppable = document.querySelectorAll(".soltar");

  //Para los que pertenecen a la clase arrastrable (animales)
  objetosDraggable.forEach((elemento) => {
    elemento.addEventListener("dragstart", ondragstart);
  });

  //Para los que pertenecen a la clase soltar (habitats)
  objetosDroppable.forEach((elemento) => {
    elemento.addEventListener("dragenter", ondragenter);
    elemento.addEventListener("dragleave", ondragout);
    elemento.addEventListener("dragover", ondragover);
    elemento.addEventListener("drop", soltado);
  });
}
