
const obtenerCarrito = () => {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
};


const guardarCarrito = (carrito) => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};

const quitarDelCarrito = (id) => {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito(carrito);
    renderizarCarrito(carrito);
}

const renderizarCarrito = (productos) => {
    const contenedor = document.querySelector("#contenedor-carrito");

    contenedor.innerHTML = "";

    //Renderizo si hay productos
    if (productos.length !== 0){
        let html = "";
        productos.forEach(producto => {
            html += `
            <div class="card mb-3 shadow-sm mx-auto" style="max-width: 900px;">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2 text-center p-2">
                        <img src="${producto.imagen}"
                            class="img-fluid rounded"
                            alt="Producto">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="fw-bold text-success mb-0">
                                $ ${producto.precio}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <label class="form-label">Cantidad</label>
                        <input type="number"
                            class="form-control w-75 mx-auto cantidad-producto"
                            min="1"
                            value="${producto.cantidad}"
                            data-id="${producto.id}">
                    </div>
                    <!-- Subtotal y eliminar -->
                    <div class="col-md-2 text-center">
                        <label class="form-label">Subtotal</label>
                        <p class="fw-bold">
                            $ ${producto.cantidad * producto.precio}
                        </p>
                    </div>
                    <div class="col-md-1 text-center">
                        <button class="btn btn-danger btn-sm"
                            onclick="quitarDelCarrito(${producto.id})">
                            Quitar
                        </button>
                    </div>
                </div>
            </div>`
        });
        
        contenedor.innerHTML = html;
        renderizarTotal(productos);

    } else {
        contenedor.innerHTML = `
        <div class="w-100 text-center mt-5">
            <h3>No hay productos en el carrito</h3>
            <p class="text-muted">Agregá productos para comenzar tu compra.</p>
        </div>
        `;
    }

}

const calcularTotal = (carrito) =>{
    return carrito.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);
}

const renderizarTotal = (carrito) => {
    const total = calcularTotal(carrito);
    const contenedorTotal = document.querySelector("#total-carrito");

    contenedorTotal.innerHTML = `
        <div class="card shadow-sm mx-auto mt-4" style="max-width: 900px;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">
                        Total: <span class="text-success">$ ${total}</span>
                    </h4>
                    <button
                        class="btn btn-success btn-lg"
                        onclick="abrirModal()">
                        Confirmar compra
                    </button>
                </div>
            </div>
        </div>
    `;
};


const modal = document.getElementById("modal-confirmacion");

//Controladores de eventos expuestos a 'window' para los onclick inline
window.volverAInicio = () => {
    sessionStorage.clear();
    window.location.href = "index.html";
}

window.quitarDelCarrito = quitarDelCarrito;

window.abrirModal = () => {

    modal.classList.add("modal-visible");
    modal.classList.remove("modal-oculto");
};

window.cancelarCompra = () => {
    
    modal.classList.add("modal-oculto");
    modal.classList.remove("modal-visible");
}

window.confirmarCompra = async () => {
    const carrito = obtenerCarrito();
    const nombreClienteInput = document.getElementById("nombre-cliente");
    const medioPagoSelect = document.getElementById("medio-pago");
    const nombreCliente = nombreClienteInput ? nombreClienteInput.value.trim() : "";
    const medioPago = medioPagoSelect ? medioPagoSelect.value : "";

    if (!Array.isArray(carrito) || carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    if (!nombreCliente) {
        alert("Debes ingresar el nombre del cliente");
        return;
    }

    try {
        const respuesta = await fetch("/ticket/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                carrito,
                nombre_cliente: nombreCliente,
                medio: medioPago || "No especificado",
            }),
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo registrar la compra");
        }

        const data = await respuesta.json();

        alert("Compra realizada con éxito");
        sessionStorage.removeItem("carrito");

        // Redirijo a pantalla ticket con el ID persistido
        window.location.href = `/ticket?ids=${data.idticket}`;
    } catch (error) {
        console.error(error);
        alert("No se pudo completar la compra. Intenta nuevamente.");
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector("#contenedor-carrito");

    let carrito = obtenerCarrito();

    renderizarCarrito(carrito)

    //Uso delegados para escuchar los inputs Cantidad y renderizo si hay cambios
    contenedor.addEventListener("change", (e) => {
        if (!e.target.classList.contains("cantidad-producto")) return;

        const id = Number(e.target.dataset.id);
        const cantidad = Number(e.target.value);

        let carrito = obtenerCarrito();

        const producto = carrito.find(p => p.id === id);

        if (producto) {
            producto.cantidad = cantidad;
        }

        guardarCarrito(carrito);

        renderizarCarrito(carrito);
    });
   
});






