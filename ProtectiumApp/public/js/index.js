document.addEventListener("DOMContentLoaded", () => {
    const btnContinuar = document.getElementById("btnContinuar");
    const inputNombre = document.getElementById("nombre");
    const aviso = document.getElementById("aviso");

    btnContinuar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const error = validarNombre(nombre);

        if (error) {
            aviso.textContent = error;
            return;
        }

        aviso.textContent = "";

        sessionStorage.setItem("cliente", nombre);

        window.location.href = "/productos.html";
    })

})

const validarNombre = (dato) => {
    //valida que una cadena contenga únicamente letras (incluyendo tildes y ñ) y espacios
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!dato) {
        return "El nombre no puede estar vacío";
    }

    if (dato.length < 3) {
        return "El nombre es muy corto";
    }

    if (dato.length > 30) {
        return "El nombre es demasiado largo";
    }

    if (!regex.test(dato)) {
        return "El nombre solo puede contener letras";
    }

    return null; 
}
