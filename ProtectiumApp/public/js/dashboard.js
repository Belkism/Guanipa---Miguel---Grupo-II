window.volverAInicio = () => {
    sessionStorage.clear();
    window.location.href = "/";
}

document.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar");
    const botonReactivar = e.target.closest(".btn-reactivar");

    if (!botonEliminar && !botonReactivar) {
        return;
    }

    const id = botonEliminar ? botonEliminar.dataset.id : botonReactivar.dataset.id;

    if (!id) {
        alert("No se encontró el ID del producto.");
        return;
    }

    if (botonEliminar) {
        const confirmar = window.confirm("¿Seguro que deseas dar de baja este producto?");

        if (!confirmar) {
            return;
        }

        fetch(`/admin/productos/eliminar/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.mensaje || "No se pudo eliminar el producto");
                }

                alert(data.mensaje || "Producto dado de baja");
                window.location.reload();
            })
            .catch((error) => {
                alert(error.message || "Error al eliminar el producto");
            });

        return;
    }

    fetch(`/admin/productos/reactivar/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "No se pudo reactivar el producto");
            }

            alert(data.mensaje || "Producto reactivado");
            window.location.reload();
        })
        .catch((error) => {
            alert(error.message || "Error al reactivar el producto");
        });
    
});