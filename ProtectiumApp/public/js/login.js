const btnAccesoRapido = document.getElementById("btnAccesoRapido");

btnAccesoRapido.addEventListener("click", () => {

    document.getElementById("email").value =
        "admin@test.com";

    document.getElementById("password").value =
        "123456";
});