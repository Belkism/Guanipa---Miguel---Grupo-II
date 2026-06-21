// 1. Estado Global de la aplicación
let arrayDatos = []; // Se llenará con la respuesta del Servidor/API

const estadoPaginacion = {
    seguridad: { paginaActual: 1, productosPorPagina: 3 },
    productividad: { paginaActual: 1, productosPorPagina: 3 }
};

// 2. Petición Asíncrona original a tu Backend/API
const obtenerProductos = async () => {
    try {
        let respuesta = await fetch("/productos");
        
        if (!respuesta.ok) {
            switch (respuesta.status) {
                case 400:
                    throw new Error("Solicitud incorrecta");
                default:
                    throw new Error(`Error ${respuesta.status}`);
            }
        }
        let datos = await respuesta.json();        
        arrayDatos = [...datos]; // Guardamos los productos reales detectados
                   
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// 3. Función unificada que divide por categoría y aplica Paginación
function renderizarSeccion(categoria) {

    // Armar dinámicamente los IDs que coinciden con tu HTML
    const idContenedor = `contenedor${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
    const idPaginacion = `paginacion${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;

    
    const contenedor = document.getElementById(idContenedor);
    const contenedorPag = document.getElementById(idPaginacion);

    //Muestro solo la seccion actual
    const seccion = contenedor.closest("section");
    seccion.classList.remove("oculto");

    if (!contenedor || !contenedorPag) return;

    // 1. FILTRAR: Tomar del array global solo los de la categoría correspondiente
    // Nota: Asegúrate de que en tu base de datos el campo se llame exactamente "seguridad" o "productividad"
   const productosFiltrados = arrayDatos.filter(p => {
    // Verificamos que el producto y su categoria_id existan
    if (p && p.categoria_id !== undefined && p.categoria_id !== null) {
        
        // Si la sección que estamos renderizando es "seguridad", buscamos el ID 1
        if (categoria === "seguridad") {
            return Number(p.categoria_id) === 1;
        }
        
        // Si la sección es "productividad", buscamos el ID 2
        if (categoria === "productividad") {
            return Number(p.categoria_id) === 2;
        }
    }
    return false;
});;
    
    // 2. PAGINAR: Calcular cortes (Slice)
    const config = estadoPaginacion[categoria];
    const indiceInicio = (config.paginaActual - 1) * config.productosPorPagina;
    const indiceFin = indiceInicio + config.productosPorPagina;
    const productosPagina = productosFiltrados.slice(indiceInicio, indiceFin);

    // 3. DIBUJAR: Estructura de tarjetas (Usando tus clases de Bootstrap y propiedades)
    contenedor.innerHTML = `<div class="row g-4" id="grid-${categoria}"></div>`;
    const grid = document.getElementById(`grid-${categoria}`);

    if (productosPagina.length === 0) {
        grid.innerHTML = `<p class="text-muted text-center col-12">No hay productos en esta categoría.</p>`;
        return;
    }

    productosPagina.forEach(producto => {
        // Lógica del carrito con sessionStorage
        const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
        const existeEnCarrito = carrito.some(item => item.id === producto.id);

        grid.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card card-producto h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top imagen-producto p-3" alt="Imagen de ${producto.nombre}" style="max-height: 180px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fs-6 fw-bold">${producto.nombre}</h5>
                    <p class="card-text small descripcion-producto">${producto.descripcion}</p>
                    <h4 class="precio-producto mt-auto mb-3">$ ${producto.precio}</h4>
                    
                    <div class="mt-2">
                        ${existeEnCarrito ? 
                            `<button class="btn btn-danger btn-sm w-100" onclick="quitarDelCarrito(${producto.id}, '${categoria}')">Quitar del carrito</button>` : 
                            `<button class="btn btn-primary btn-sm w-100 btn-carrito" onclick="agregarAlCarrito(${producto.id}, '${categoria}')">Agregar al carrito</button>`
                        }
                    </div>
                </div>
            </div>
        </div>`;
    });

    // 4. BOTONERA: Dibujar la paginación de esta sección
    renderizarBotoneraSeccion(categoria, productosFiltrados.length, contenedorPag);
}

// 4. Generador dinámico de botones numéricos
function renderizarBotoneraSeccion(categoria, totalItems, contenedorPag) {
    const config = estadoPaginacion[categoria];
    const totalPaginas = Math.ceil(totalItems / config.productosPorPagina);
    contenedorPag.innerHTML = "";

    if (totalPaginas <= 1) return;

    let navHTML = `<nav><ul class="pagination pagination-sm justify-content-center mt-5">`;

    // Anterior
    navHTML += `
        <li class="page-item ${config.paginaActual === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="cambiarPaginaSeccion('${categoria}', ${config.paginaActual - 1})">Anterior</button>
        </li>
    `;

    // Números
    for (let i = 1; i <= totalPaginas; i++) {
        navHTML += `
            <li class="page-item ${config.paginaActual === i ? 'active' : ''}">
                <button class="page-link" onclick="cambiacambiarPaginaSeccion('${categoria}', ${i})">${i}</button>
            </li>
        `;
    }

    // Siguiente
    navHTML += `
        <li class="page-item ${config.paginaActual === totalPaginas ? 'disabled' : ''} ">
            <button class="page-link" onclick="cambiarPaginaSeccion('${categoria}', ${config.paginaActual + 1})">Siguiente</button>
        </li>
    `;

    navHTML += `</ul></nav>`;
    contenedorPag.innerHTML = navHTML;
}

// 5. Controladores de eventos expuestos a 'window' para los onclick inline
window.cambiarPaginaSeccion = function(categoria, nuevaPagina) {
    estadoPaginacion[categoria].paginaActual = nuevaPagina;
    renderizarSeccion(categoria);
};

window.agregarAlCarrito = function(idProducto, categoria) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const producto = arrayDatos.find(p => p.id === idProducto);
    
    if (producto && !carrito.some(item => item.id === idProducto)) {
        // Agregamos el producto y el atributo cantidad
        carrito.push({...producto, cantidad : 1});
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }
    renderizarSeccion(categoria);
};

window.quitarDelCarrito = function(idProducto, categoria) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== idProducto);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    
    renderizarSeccion(categoria);
};

window.volverAInicio = () => {
    sessionStorage.clear();
    window.location.href = "/";
}

// 6. Listener de arranque DOMContentLoaded (Tu lógica de inicio preservada)
document.addEventListener("DOMContentLoaded", async () => {
    
    // Validar sesión del cliente
    const nombre = sessionStorage.getItem("cliente");
    if (!nombre) {
        window.location.href = "/";
        return; // Detiene la ejecución si no está logueado
    }

    // Traer los datos desde la API
    await obtenerProductos();

    //Escucha clicks en cualquier elemento que tenga data-categoria (Cards y botones en menu)
    document.addEventListener("click", (e) => {
        const elemento = e.target.closest("[data-categoria]");      
        if(!elemento) return;

        // Ocultar todas las secciones antes de renderizar nuevamente
        document
        .querySelectorAll(".categoria-section")
        .forEach(seccion => {
            seccion.classList.add("oculto");
        });
        
        //Mostramos la categoria seleccionada
        let categoria = elemento.dataset.categoria;
        renderizarSeccion(categoria);
        
    });

});