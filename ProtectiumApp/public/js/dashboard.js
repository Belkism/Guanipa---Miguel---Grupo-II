document.addEventListener("click", (e) => {
    // EDITAR
    if (e.target.classList.contains("btn-editar")) {
        e.preventDefault();
        const id = e.target.dataset.id;
        console.log("Editar producto:", id);

        // ejemplo: redirigir o abrir modal
        //window.location.href = `/admin/productos/editar/${id}`;
    }

    // ELIMINAR
    if (e.target.classList.contains("btn-eliminar")) {
        const id = e.target.dataset.id;

        const confirmacion = confirm("¿Seguro que querés eliminar?");
        if (!confirmacion) return;

        fetch(`/admin/productos/eliminar/${id}`, {
            method: "POST"
        })
        .then(res => res.json())
        .then(data => {
            console.log("Eliminado:", data);
            location.reload(); // o remover el card del DOM
        });
    }
});