
let arrayDatos = [];

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
       
        arrayDatos = [...datos];
              
                   
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const btnLogo = document.getElementById("btnLogo");

    btnLogo.addEventListener("click", (e) => {

        sessionStorage.clear();

        window.location.href = "index.html";
    });

    //Valida que exista nombre 
    const nombre = sessionStorage.getItem("cliente");

    if (!nombre) {
        window.location.href = "index.html";
    }

    await obtenerProductos();
    renderizarProductos(arrayDatos);

})

const renderizarProductos = (datos) => {
    let divContenedor = document.getElementById("contenedorProductos");
    divContenedor.innerHTML = "";

    let cards = '<div class="container mt-4"><div class="row g-4">';
    datos.forEach(producto => {
        cards += `
        <div class="col-12 col-md-6">
            <div class="card card-producto shadow-sm">
                <img src="${producto.imagen}" 
                    class="card-img-top imagen-producto" 
                    alt="Imagen del producto">

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>

                    <p class="card-text text-muted descripcion-producto">
                        ${producto.descripcion}
                    </p>

                    <h4 class="precio-producto text-primary mb-3">
                        $ ${producto.precio}
                    </h4>

                    <button class="btn btn-primary mt-auto btn-carrito">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>`;
        
    });

    divContenedor.innerHTML = cards;
    
}