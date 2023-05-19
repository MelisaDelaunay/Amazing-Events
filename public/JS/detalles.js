async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos

    let id = location.search.split("?id=").filter(Number)
    let selectId = id[0]
    let eventoDetalles = eventos.filter(evento => evento.id == selectId)

    detalleVista(eventoDetalles)
}

getData()


function detalleVista(eventoDetalles) {

    var detalleVista = document.getElementById("contenedor_detalles")
    detalleVista.innerHTML = `
<div class="contenedor">
    <div class="titulo_tarjeta">
        <p class="titulo_uno">${eventoDetalles[0].name}</p>
    </div>
    <div class="general">
        <div class="fotos_detalles">
            <img src="${eventoDetalles[0].image}" class="card-img-top zoomable" alt="${eventoDetalles[0].name}">
        </div>
        <div class="info_detalles">
            <p class="detalle">Descripción: ${eventoDetalles[0].description}</p>
            <div class="detalles_abajo">
                <div class="detalles_uno">
                    <p class="detalle">Lugar: ${eventoDetalles[0].place}</p>
                    <p class="detalle">Fecha: ${eventoDetalles[0].date}</p>
                </div>
                <div class="detalles_dos">
                    <p class=" detalle">Categoria: ${eventoDetalles[0].category}</p>
                    <p class="detalle">Capacidad: ${eventoDetalles[0].capacity}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="precio">
        <p class="detalle">Precio: $${eventoDetalles[0].price}</p>
    </div>
</div>
        `


}

