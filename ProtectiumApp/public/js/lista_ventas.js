window.volverAInicio = () => {
    sessionStorage.clear();
    window.location.href = "/";
}

let ascendente = true;

const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const limpiarFiltro = document.getElementById("limpiarFiltro");
const ordenTotal = document.getElementById("ordenTotal");
const clientes = document.getElementById("clientes");
const fecha = document.getElementById("fecha");

document.addEventListener("DOMContentLoaded", async () => {
    
    ordenTotal.addEventListener("click", ordenarPorTotal);
    clientes.addEventListener("click", ordenarPorCliente);
    fecha.addEventListener("click", ordenarPorFecha);

    fechaDesde.addEventListener("change", filtrarPorFecha);
    fechaHasta.addEventListener("change", filtrarPorFecha);

    limpiarFiltro.addEventListener("click", () => {
        fechaDesde.value = "";
        fechaHasta.value = "";
        filtrarPorFecha();
    });

});


const filtrarPorFecha = () => {

    const desde = fechaDesde.value
        ? new Date(fechaDesde.value)
        : null;

    const hasta = fechaHasta.value
        ? new Date(fechaHasta.value)
        : null;

    const filas = document.querySelectorAll("#tbody tr");

    filas.forEach(fila => {

        const celdaFecha = fila.querySelector(".col-fecha");

        const fechaVenta = new Date(
            celdaFecha.dataset.fecha
        );

        let mostrar = true;

        if (desde && fechaVenta < desde) {
            mostrar = false;
        }

        if (hasta) {

            // incluir todo el día
            hasta.setHours(23,59,59,999);

            if (fechaVenta > hasta) {
                mostrar = false;
            }
        }

        fila.style.display = mostrar ? "" : "none";
    });
}

const ordenarPorTotal = () => {
    const tbody = document.getElementById("tbody");

    const filas = [...tbody.querySelectorAll("tr")];

    filas.sort((a,b) => {

        const totalA = Number(
            a.querySelector(".col-total").dataset.total
        );

        const totalB = Number(
            b.querySelector(".col-total").dataset.total
        );

        return ascendente
            ? totalA - totalB
            : totalB - totalA;
    })

    tbody.innerHTML = "";

    filas.forEach(fila => {
        tbody.appendChild(fila);
    });

    ascendente = !ascendente;
};

const ordenarPorCliente = () => {
    const tbody = document.getElementById("tbody");

    const filas = [...tbody.querySelectorAll("tr")];

    filas.sort((a,b) => {

        const clienteA = a.querySelector(".col-cliente").dataset.cliente.toLowerCase();;

        const clienteB = b.querySelector(".col-cliente").dataset.cliente.toLowerCase();;

        return ascendente
            ?clienteA.localeCompare(clienteB)
            : clienteB.localeCompare(clienteA);
    })

    tbody.innerHTML = "";

    filas.forEach(fila => {
        tbody.appendChild(fila);
    });

    ascendente = !ascendente;
};

const ordenarPorFecha = () => {

    const tbody = document.getElementById("tbody");

    const filas = [...tbody.querySelectorAll("tr")];

    filas.sort((a,b) => {

        const fechaA = new Date(
            a.querySelector(".col-fecha")
            .dataset.fecha
        );

        const fechaB = new Date(
            b.querySelector(".col-fecha")
            .dataset.fecha
        );

        return ascendente
            ? fechaA - fechaB
            : fechaB - fechaA;

    });

    tbody.innerHTML = "";

    filas.forEach(fila => {
        tbody.appendChild(fila);
    });

    ascendente = !ascendente;
};