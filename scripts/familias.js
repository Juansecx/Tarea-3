let listaFamilia = document.querySelector("[name='familia']");

listaFamilia.addEventListener("change", (e) => {
    //En primer lugar, comprobaremos si se está mostrando alguna familia para eliminarla
    let divCasas = document.querySelectorAll(".tarjetaCasa");
    divCasas.forEach((element) => {
      element.remove();
    });
    //Capturamos el valor del Select
    let casa = e.target.value;
    //Hacemos el fetch
    fetch(`https://thronesapi.com/api/v2/Characters`)
      .then((response) => response.json())
      .then((personajes) => {
        //De Personajes, voy a filtrar aquellos que coincidan con el valor de la opción escogida
        let arrayCasa = personajes.filter(
          (personaje) => personaje.family == casa
        );
        //Utilizamos la función para mostrar los personajes
        mostrar(arrayCasa, "#porCasa");
      })
      .catch((error) => console.error("Error" + error));
  });

  //FUNCIONES:

//Esta función mostrará nombre, apellido y foto
//Recibe como parametros el Json y el div donde queremos mostrarlo
function mostrar(personajes, donde) {
  
    let divDonde = document.querySelector(donde);
  
    if (donde == "#porId") {
      //Cuando introducimos el id, solo devuelve un personaje por lo tanto no necesitamos recorrerlo con un for
      //Creo un div para mostrar el personaje por Id
      let div = document.createElement("div");
      div.classList = "tarjetaId";
      divDonde.appendChild(div);
  
      //Metemos la imagen
      let foto = document.createElement("img");
      foto.setAttribute("src", personajes.imageUrl);
      div.appendChild(foto);
  
      //Metemos el nombre
      let h4 = document.createElement("h4");
      h4.textContent = personajes.firstName + " " + personajes.lastName;
      div.appendChild(h4);
  
      //Metemos el Título
      let p = document.createElement("p");
      p.textContent = personajes.title;
      div.appendChild(p);
  
    } else {
  
      //En los otros dos casos, los personajes se encuentran en el array del objeto json, por lo tanto hay que recorrerlo
      for (var i = 0; i < personajes.length; i++) {
        //Creo un div por cada personaje
        let div = document.createElement("div");
        if (donde == "#porCasa") {
          div.classList = "tarjetaCasa";
        } else {
          div.classList = "tarjetaPersonaje";
        }
        divDonde.appendChild(div);
  
        //Metemos la imagen
        let foto = document.createElement("img");
        foto.setAttribute("src", personajes[i].imageUrl);
        div.appendChild(foto);
  
        //Metemos el nombre
        let h4 = document.createElement("h4");
        h4.textContent = personajes[i].firstName + " " + personajes[i].lastName;
        div.appendChild(h4);
  
        //Metemos el Título
        let p = document.createElement("p");
        p.textContent = personajes[i].title;
        div.appendChild(p);
      }
    }
  }

  