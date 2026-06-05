document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("falta programar!! Hay que terminar validaciones lado Frontend y todo el server");
    });
});


// Form reutilizable, si producto es null, muestra campos vacios para crear producto. Si producto existe, muestra form con los datos y permite edicion.
// Falta validaciones desde FrontEnd y Todas las validaciones y logica del Server