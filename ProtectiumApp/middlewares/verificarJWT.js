const jwt = require("jsonwebtoken");

const verificarJWT = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/auth/login");
    }

    try {
        const payload = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        req.usuario = payload;

        const ahora = Math.floor(Date.now() / 1000);

        const tiempoRestante = payload.exp - ahora;

        if (tiempoRestante <= 180) {

            const nuevoToken = jwt.sign(
                {
                    id: payload.id,
                    rol: payload.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '10m',
                    algorithm: 'HS256'
                }
            );

            res.cookie("token", nuevoToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 10 * 60 * 1000
            });
        }

        next();

    } catch (error){
        return res.redirect("/auth/login");
    }
    
};

module.exports = verificarJWT;