function validarLogin(req, res, next){

    req.body.correo = req.body.correo?.trim().toLowerCase() || "";
    req.body.contrasena = req.body.contrasena || "";

    if(!req.body.correo || !req.body.contrasena){
        return res.render("login", {
            error: "Debe completar todos los campos"
        });
    }

    next();
}

module.exports = validarLogin;