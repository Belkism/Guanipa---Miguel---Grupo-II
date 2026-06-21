const btnAccesoRapido = document.getElementById("btnAccesoRapido");

const params = new URLSearchParams(window.location.search);

if (params.get("session") === "expirada") {
    alert("Tu sesión expiró. Inicia sesión nuevamente.");
    window.history.replaceState({}, document.title, "/auth/login");
}

btnAccesoRapido.addEventListener("click", () => {

    document.getElementById("email").value =
        "patricio@test.com";

    document.getElementById("password").value =
        "password123";
});