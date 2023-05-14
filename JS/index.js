let fechaBase
let eventos = []
let container = document.getElementById("container")
let arrayFiltro = []
let formulario = document.getElementById("form")
let estadisticasDetalles = document.getElementById("statsDos")
let tarjetasEventos = document.getElementById("tarjetas")
var searchContainer = document.getElementById("search")
let checkedCheckboxes = []
let search = ""
var botonNavegacion = []

async function getData() {
  let datosApi
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then(response => response.json())
    .then(json => datosApi = json)

  eventos = datosApi.eventos
  fechaBase = datosApi.fechaActual
  rutasPaginas()
}
getData()

var buttonNav = document.getElementsByClassName("botones")
for (var i = 0; i <buttonNav.length; i++) {
  const element = buttonNav[i];
  botonNavegacion.push(buttonNav[i].innerText)
  element.addEventListener("click", function (e) 
  {
    imprimir(e.target.id);

})}

function imprimir(id) {
  switch (id) {
    case "upcoming":
      let eventosFuturos = eventos.filter(evento => evento.date > fechaBase)
      document.getElementById("tituloEncabezado").innerHTML = "UPCOMING EVENTS";
      document.getElementById("navegacion-titulo").classList.add('nav_home');
      arrayFiltro = eventosFuturos
      searchContainer.style.display = "flex"
      tarjetasEventos.style.display = "flex"
      formulario.style.display = "none"
      estadisticasDetalles.style.display = "none"
      checkedCheckboxes = []
      display(eventosFuturos)
      eventsCategories(eventosFuturos)
      break;

    case "past":
      let eventosPasados = eventos.filter(evento => evento.date <fechaBase)
      document.getElementById("tituloEncabezado").innerHTML = "PAST EVENTS";
      document.getElementById("navegacion-titulo").classList.add('nav_home');
      arrayFiltro = eventosPasados
      searchContainer.style.display = "flex"
      tarjetasEventos.style.display = "flex"
      formulario.style.display = "none"
      estadisticasDetalles.style.display = "none"
      checkedCheckboxes = []
      display(eventosPasados)
      eventsCategories(eventosPasados)
      break;

    case "contact":
      document.getElementById("tituloEncabezado").innerHTML = "CONTACT US";
      document.getElementById("navegacion-titulo").classList.add('nav_home');
      tarjetasEventos.style.display = "none"
      searchContainer.style.display = "none"
      estadisticasDetalles.style.display = "none"
      formulario.style.display = "flex"
      formulario.innerHTML =`
      <section class="formulario">
            <form class="formu">
                <div class="campo_formulario">
                  <label for="nombre"></label>
                  <input type="text" id="nombre" placeholder="Ingresa tu nombre" required>
                </div>
                <div class="campo_formulario">
                  <label for="email"></label>
                  <input type="email" id="email" placeholder="Ingresa tu e-mail" required>
                </div>
                <div class="campo_formulario">
                  <label for="text"></label>
                  <textarea name="message" id="text" placeholder="Dejanos tu mensaje"></textarea>
                </div>
                <div class="campo_formulario butSend">
                  <button type="submit" value="submit" id="enviar">Enviar mensaje</button>
                </div>
            </form>
            <div id="modal" class="modal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <p>Gracias por comunicarte. Nos estaremos contactando pronto. Saludos!</p>
              </div>
            </div>
        </section>
      `
      let form = document.querySelector("form")
      const modal = document.querySelector('#modal')
      const cerrar = document.querySelector('.close')
      form.addEventListener("submit", (event)=>{actionForm(event)
      modal.style.display = "block"
      })

      function modalForm(){
        modal.style.display = "none";
        location.reload()
      }
      cerrar.addEventListener("click", modalForm);

      window.addEventListener("click", (event)=>{
        if(event.target == modal){
        modal.style.display = "none"
        }
      })
      break;

    case "stats":
      document.getElementById("tituloEncabezado").innerHTML = "STATS";
      document.getElementById("navegacion-titulo").classList.add('nav_home');
      tarjetasEventos.style.display = "none"
      searchContainer.style.display = "none"
      formulario.style.display = "none"
      estadisticasDetalles.style.display = "flex"
      estadisticasDetalles.innerHTML = `
      <table>
        <tr class="titulo_tabla">
          <th colspan="3">Events statistics</th>
        </tr>
        <tr class="titulo">
          <th>Events with the highhest percentage of attendance</th>
          <th>Events with the lowest percentage of attendance</th>
          <th>Event with larger capacity</th>
        </tr>
        <tr id="mayoresymenores">
        </tr>
      </table>  
      <table id="statsFuturos">
        <tr class="titulo_tabla">
          <th colspan="3">Upcoming events statistics by category</th>
        </tr>
        <tr class="titulo">
          <th>Categories</th>
          <th>Revenues</th>
          <th>Percentage of attendance</th>
        </tr>
      </table>  
      <table id="statsPasados">
        <tr class="titulo_tabla">
            <th colspan="3">Past events statistics by category</th>
        </tr>
        <tr class="titulo">
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
        </tr>
      </table>
      `
      initStats()
      break;

    default:
      document.getElementById("tituloEncabezado").innerHTML = "HOME";
      document.getElementById("navegacion-titulo").classList.add('nav_home');
      arrayFiltro = eventos
      checkedCheckboxes = []
      tarjetasEventos.style.display = "flex"
      searchContainer.style.display = "flex"
      estadisticasDetalles.style.display = "none"
      formulario.style.display = "none"
      display(eventos)
      eventsCategories(eventos)
}}

function display(array) {
  var html = "";
  for (var i = 0; i <array.length; i++) {
    html +=
      `<div class="item">
            <img src="${array[i].image}" class="card-img-top zoomable" alt="${array[i].name}">
            <p class="titulo_dos">${array[i].name}</p>
            <div class="detalles">
              <p class="precio">Precio: $${array[i].price}</p>
            <p>
                    <button class="botones boton_d">
                    <a href="./Pages/detalles.html?id=${array[i].id}">Ver más</a>
                    </button>
            </p>
            </div>
          </div>
          `
  }
  tarjetasEventos.innerHTML = html
}

var time = location.search.split("?time=")
function rutasPaginas(){

switch (time[1]) {
  case "past":
   imprimir("past")
   break;
  case "upcoming":
   imprimir("upcoming")
   break;
 case "stats":
   imprimir("stats")
   break;
 case "contact":
   imprimir("contact")
   break;
 default:
   imprimir("home")

}}

var buttonD = document.getElementById("flechaDerecha")
buttonD.addEventListener("click", function (e) {
  var pagina = document.getElementById("tituloEncabezado").innerText
  if (botonNavegacion.indexOf(pagina) <4) {
    nextPage(botonNavegacion.indexOf(pagina) + 1);
  } else {
    nextPage(0)
  }})

function nextPage(i) {
  switch (i) {
    case 0:
      imprimir("home")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 1:
      imprimir("upcoming")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 2:
      imprimir("past")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 3:
      imprimir("contact")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    default:
      imprimir("stats")
  }
}

var buttonI = document.getElementById("flechaIzquierda")
buttonI.addEventListener("click", function (e) {
  var paginaI = document.getElementById("tituloEncabezado").innerText
  if (botonNavegacion.indexOf(paginaI) <=4) {
    antPage(botonNavegacion.indexOf(paginaI) - 1);
  } else {
    antPage(0)
  }})

function antPage(i) {
  switch (i) {
    case 0:
      imprimir("home")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 1:
      imprimir("upcoming")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 2:
      imprimir("past")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    case 3:
      imprimir("contact")
      document.getElementById("tituloEncabezado").innerHTML = botonNavegacion[i]
      break;
    default:
      imprimir("stats")
  }
}

function actionForm(event){
  event.preventDefault()
  let formDatos = {
      name: event.target[0].value,
      email: event.target[1].value,
      message: event.target[2].value
  }
  console.log(formDatos);
}

var inputSearch = document.getElementById("Search")
inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value
  search = datoInput.trim().toLowerCase()
  filtrosCombinados()
})

function eventsCategories(array) {
  let categories = array.map(evento => evento.category)
  let unica = new Set(categories)
  let lastCategories = [...unica]
  let categoriasEventos = ""
  lastCategories.map(category =>
    categoriasEventos +=
    `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `
  )
  document.getElementById("container").innerHTML = categoriasEventos
  checkboxListener()
}

function checkboxListener() {
  var checkboxs = document.querySelectorAll('input[type=checkbox]')
  for (i = 0; i <checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function () {
      checkedCheckboxes = []
      for (i = 0; i <checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          checkedCheckboxes.push(checkboxs[i].value)
        }
      }
      filtrosCombinados()
    })
  }
}

function filtrosCombinados() {
  var filtrado = []
  if (search !== "" && checkedCheckboxes.length > 0) {
    checkedCheckboxes.map(category => filtrado.push(...arrayFiltro.filter(evento =>
      evento.name.toLowerCase().trim().includes(search) && evento.category === category)
    ))
  }
  else if (search !== "" && checkedCheckboxes.length == 0) {
    filtrado = arrayFiltro.filter(evento => evento.name.toLowerCase().trim().includes(search))
  }
  else if (search === "" && checkedCheckboxes.length > 0) {
    checkedCheckboxes.map(category =>
      filtrado.push(...arrayFiltro.filter(evento => evento.category === category))
    )
  }
  else {
    filtrado = arrayFiltro
  }
  filtrado.length > 0 ?
    display(filtrado) :
    tarjetasEventos.innerHTML = `
    <div class="sinresultado">
    <h1 class="sinEventos" >No se han encontrado eventos para tu busqueda. Prueba buscando con otras palabras clave.</h1>
    </div>
    `
}

async function initStats() {
  var categorias = []
  var unique = eventos.map(evento => evento.category)
  const quitoRepetidas = new Set(unique)
  categorias = [...quitoRepetidas]
  var porCategoria = []
  categorias.forEach(categoria => {
      porCategoria.push(
          {
              categoria: categoria,
              data: eventos.filter(evento => evento.category === categoria)
          }
      )
  })

  var ingresoYassitencia = []

  porCategoria.map(datos => {
      ingresoYassitencia.push({
          categoria: datos.categoria,
          ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
          estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
          asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
          estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
          capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
      })
  })

  ingresoYassitencia.forEach(categoria => {

      let totalAsistencia = 0
      let totalAsistenciaEstimada = 0
      let totalCapacidadPasados = 0
      let totalCapacidadFuturos = 0

      for (var i = 0; i <categoria.ingreso.length; i++) {

          if (categoria.ingreso[i] > 0) {
              totalCapacidadPasados += categoria.capacidad[i]
              totalAsistencia += categoria.asistencia[i]
              categoria.totalCapacidadPasados = totalCapacidadPasados
              categoria.totalAsistencia = totalAsistencia

          } else {
              totalCapacidadFuturos += categoria.capacidad[i]
              totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
              categoria.totalCapacidadFuturos = totalCapacidadFuturos
              categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
          }
      }
      categoria.porcentajeDeAsistencia = ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2) + "%"
      categoria.porcentajeDeEstimacion = ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2) + "%"

      let totalIngreso = 0
      categoria.ingreso.map(ingresos => totalIngreso += ingresos)
      categoria.ingresos = totalIngreso

      let totalIngresoEstimado = 0
      categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
      categoria.estimacionIngresos = totalIngresoEstimado

  })

  let eventosPasados = []
  let eventosFuturos = []
  await eventos.filter(evento => {
      if (evento.assistance) {
          eventosPasados.push(evento)
      } else { eventosFuturos.push(evento) }
  })
  eventosPasados.map(evento => {
      evento.porcentajeAsistencia = evento.assistance * 100 / evento.capacity
  })

  let asistenciaEventos = []
  eventosPasados.filter(evento => { asistenciaEventos.push(evento.porcentajeAsistencia) })
  let mayor = Math.max(...asistenciaEventos)
  let eventoMayorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === mayor)
  let menor = Math.min(...asistenciaEventos)
  let eventoMenorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === menor)
  let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })

  var rowMayoresYmenores = document.getElementById("mayoresymenores")
  rowMayoresYmenores.innerHTML = ""
  var tdMayorAsistencia = document.createElement("td")
  var tdMenorAsistencia = document.createElement("td")
  var tdMayorCapacidad = document.createElement("td")

  rowMayoresYmenores.append(tdMayorAsistencia)
  tdMayorAsistencia.append(eventoMayorAsistencia[0].name + " --->" + eventoMayorAsistencia[0].porcentajeAsistencia.toFixed(2) + "%" )

  rowMayoresYmenores.append(tdMenorAsistencia)
  tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " --->" + eventoMenorAsistencia[0].porcentajeAsistencia.toFixed(2) + "%" )

  rowMayoresYmenores.append(tdMayorCapacidad)
  tdMayorCapacidad.append(mayorCapacidad[0].name + " (" + mayorCapacidad[0].category + ")")


  var tablaFuturos = document.getElementById("statsFuturos")
  ordenarFuturos = []
  ordenarFuturos.push(...ingresoYassitencia.sort((a, b) => {
      return b.estimacionIngresos - a.estimacionIngresos
  }))

  ordenarFuturos.map(evento => {
      if (evento.estimacionIngresos > 0) {
          tablaFuturos.innerHTML +=
              `
          <tr>
            <td>${evento.categoria}</td>
            <td>$${evento.estimacionIngresos}</td>
            <td>${evento.porcentajeDeEstimacion}</td>
          </tr>       
      `
      }
  })

  var tablaPasados = document.getElementById("statsPasados")
  let ordenarPasados = []
  ordenarPasados.push(...ingresoYassitencia.sort((a, b) => {
      return b.ingresos - a.ingresos
  }))
  ordenarPasados.map(evento => {
      if (evento.ingresos > 0) {
          tablaPasados.innerHTML += `
      <tr>
         <td>${evento.categoria}</td>
         <td>$${evento.ingresos}</td>
         <td>${evento.porcentajeDeAsistencia}</td>
      </tr>       
   `
      }
  })
}