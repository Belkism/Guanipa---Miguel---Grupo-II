SET NAMES utf8mb4;

DROP DATABASE IF EXISTS protectiumapp;
CREATE DATABASE protectiumapp;
USE protectiumapp;



-- =========================
-- TABLA CATEGORIAS
-- =========================
CREATE TABLE categorias (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- TABLA PRODUCTOS
-- =========================
CREATE TABLE productos (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
    stock INT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    categoria_id BIGINT(20) UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_productos_categorias
    FOREIGN KEY (categoria_id)
    REFERENCES categorias(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- USUARIOS
-- =========================
CREATE TABLE usuarios (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    correo VARCHAR(200) NOT NULL UNIQUE,
    contrasena VARCHAR(200) NOT NULL,
    telefono VARCHAR(200) NULL,
    rol VARCHAR(255) NOT NULL,
    activo TINYINT(1) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- VENTAS 
-- =========================
CREATE TABLE ventas (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre_cliente VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    fecha DATETIME NOT NULL,
    medio VARCHAR(50) NOT NULL,

    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)

) ENGINE=InnoDB;

-- =========================
-- DETALLE DE VENTAS
-- =========================
CREATE TABLE detalle_Ventas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    venta_id BIGINT(20) UNSIGNED NOT NULL,
    producto_id BIGINT(20) UNSIGNED NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_detalle_ventas_ventas
    FOREIGN KEY (venta_id)
    REFERENCES ventas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_detalle_ventas_productos
    FOREIGN KEY (producto_id)
    REFERENCES productos(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;


-- =========================
-- INSERTO CATEGORIAS
-- =========================
INSERT INTO categorias (id, tipo) VALUES
(1, 'Seguridad'),
(2, 'Productividad');

-- =========================
-- INSERTO PRODUCTOS
-- =========================
INSERT INTO productos (nombre, descripcion, imagen, precio, stock, activo, categoria_id, createdAt, updatedAt) VALUES
('Antivirus McAfee Total Protection 10 Dispositivos por 1 Año','McAfee LiveSafe brinda protección antivirus galardonada y mucho mas, cubriendo sus computadoras, dispositivos móviles e incluso su identidad. Le ayudamos a mantenerse seguro, para que pueda concentrarse en lo que importa. Entre nuestras soluciones de seguridad, McAfee LiveSafe se destaca por su combinación de herramientas y funciones de antivirus, privacidad e identidad, diseñadas para protegerlo de todo tipo de amenazas. Esta licencia es apta para activar hasta 10 Pcs.',"/images/productos/McAfeeLiveSafe.png",58000,25,1,1,NOW(),NOW()),
('Antivirus ESET Nod32 1 Dispositivo por 1 año','Licencia para activar el antivirus ESET Válida para 1 PC por un año. Descarga el programa desde la página oficial. Todos nuestros productos son originales y cuentan con garantía y soporte técnico. Entrega inmediata directo a su correo electrónico junto con el manual de instalación.',"/images/productos/Nod32Antivirus.png",46500,30,1,1,NOW(),NOW()),
('Licencia Office 2024 Pro Plus para 1 PC','Licencia original para activar Office 2024 Activación original por internet. Duración indefinida en el PC en donde se instale. Licencia "Pro" apta para empresas Incluye Word, Excel, PowerPoint, Outlook, Access y OneNote Todos nuestros productos son originales y cuentan con garantía y soporte técnica. Entrega inmediata directo a tú correo electrónico junto con manual de instalación.',"/images/productos/OfficeProPlus.png",63480,20,1,2,NOW(),NOW()),
('AVG ULTIMATE 10 dispositivos por 1 año','Licencia para Activar AVG Ultimate. Incluye todos los productos de Internet Security, PC TUNEUP y VPN por un solo precio. Windows 11. 10.8, Windows 7 SP1 o superior Licencia de hasta 10 dispositivos por 1 año AVG Internet Security AVG Secure VPN AVG TuneUp AVG AntiTrack Firewall por niveles Todas nuestros productos son originales y cuentan con garantía y soporte técnico. Entrega inmediata directo a su correo electrónico junto con manual de instalación.',"/images/productos/AvgUltimate.png",63000,18,1,1,NOW(),NOW()),
('Microsoft 365 Personal 5 Dispositivos por 1 Año','Subscripción Microsoft 365 Personal por un año Activación con su propia cuenta de Microsoft Incluye todos los programas de Office para Windows: Word, Excel, PowerPoint, Publisher, Access, Outlook y OneNote, para Mac no incluye Publisher y Access Para 32 y 64 Bits Funciona en Windows, Mac, iOS y Android Para cinco computadoras, más cinco celulares, más cinco tablets Sirve para activar el Office preinstalado en su computador Incluye 1 TB de OneDrive Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega Inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/Microsoft365.png",55100,40,1,2,NOW(),NOW()),
('Licencia Antivirus AVG 1 usuario por 1 año','AVG Internet Security ofrece protección avanzada contra virus, ransomware y otras amenazas en linea para todos tus dispositivos. Experimenta navegación segura, transacciones bancarias y compras en linea con total tranquilidad Licencia para activar antivirus AVG Internet Security Licencia para 1 PC por 1 Año Protección del equipo Protección del correo electrónico y la Web Protección contra ataques de hackers Funciona en sistemas Windows 7, Windows 8, Windows 8.1 y Windows 10 Protección de los pagos Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a su correo electrónico junto con manual de instalación.',"/images/productos/AvgInternetSecurity.png",25000,35,1,1,NOW(),NOW()),
('Licencia Office 2024 Hogar y Empresas (Windows y Mac)','Licencia original para activar Office 2024 Hogar y Empresas (Windous y Mac) Activación original vinculada a su cuenta Microsoft Licencia reinstalable con vinculación a su cuenta a través de office.com/setup Duración indefinida Apta para empresas e instituciones Incluye Word, Excel, PowerPoint, Outlook y OneNote Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega Inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/Office2024WindowsYMac.png",367330,10,1,2,NOW(),NOW()),
('AVG PC TuneUp 1 Usuario por 1 año','AVG PC Tuneup mejora su rendimiento de forma espectacular Obtenga el modo de espera en segundo para acelerar su equipo de forma inteligente, el limpiador de registro de registros, Disk Doctor, nuestra herramienta de eliminación de bloatware Licencia para el programa AVG PC Tuneup Válida para 1 PC por una duración de 1 Año Puede instalarse en el sistema que desee Windows 11, 10, 8, Windows 7 SP1 o superior Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a su correo electrónico junto con manual de instalación.',"/images/productos/AvgPcTuneUp.png",18000,22,1,1,NOW(),NOW()),
('Licencia Visio Pro 2024 para 1 PC (Reinstalable)','Licencia para activar Visio Pro 2024 Apta para 64 bits y 32 bits Version Pro apta para personas, empresas e instituciones Licencia Reinstalable, con activación en Office.com/setup En caso de tener instalado un office debe comprar este producto con la misma version y edición de su office, verifique la paqueteria de office antes de hacer su compra Si tiene Office 365 es compatible con esta version de Project Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/Visio2024Profesional.png",192279,12,1,2,NOW(),NOW()),
('Panda Dome Essential 1 dispositivo por 6 meses','Esta edición del antvirus de Panda ofrece protección en tiempo real contra virus, malware y amenazas derivadas de la navegación por internet como el phishing y otros fraudes online También protege la conexión wifi frente a intrusos no deseados Licencia para 1 PC por 2 Años Antivirus Firewall VPN con limite de 150 MB/día para una navegación segura Protección Wifi Compras online seguras Incluye Secure USB y Web Scanner Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a su correo electrónico junto con manual de instalación.',"/images/productos/PandaDome.png",50000,28,1,1,NOW(),NOW()),
('Licencia Office 2010 Professional Plus','Licencia para activar Office 2010 Professional Plus Es válida para un PC Permite utilizar una cuenta de usuario personalizada Licencia Pro apta para personas y empresas Es valida de por vida no tiene fecha de vencimiento Incluye Word, Excel, PowerPoint, Outlook, Access y Publisher Apto para todos los Windows desde Windows XP Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a su correo electrónico junto con manual de instalación.',"/images/TEMP_descripcionesProductos/imagen6.png",25520,15,1,2,NOW(),NOW()),
('BitDefender Internet Security 3 dispositivos por 3 años','Licencia para activar 3 PC por 3 Años Puede descargar el software desde el sitio web oficial Apta para 64 y 32 Bits BitDefender Internet Security es una poderosa solución antivirus que ofrece protección integral contra amenazas en linea incluyendo virus, spyware y phishing Con características avanzadas como control parental, firewall y optimización del sistema garantiza seguridad y rendimiento para usuarios domésticos Su interfaz amigable y actualizaciones automáticas facilitan una experiencia de seguridad confiable y eficiente Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directa a su correo electrónico junto con manual de instalación.',"/images/productos/BitdefenderInternetSecurity.png",74000,16,1,1,NOW(),NOW()),
('Licencia Windows 8.1 Pro','Windows 8 Pro Licencia Permanente para 1 PC Windows 8 Pro es la versión avanzada del sistema operativo de Microsoft diseñada para usuarios profesionales y empresas Introduce una interfaz de usuario optimizada para pantallas táctiles junto con el tradicional escritorio Ofrece características adicionales como BitLocker unión a dominio y capacidad para ejecutar aplicaciones de escritorio remoto Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/McAfeeLiveSafe.png",22750,10,1,2,NOW(),NOW()),
('Kaspersky Standard Para 10 PCs por 2 Años','Licencia Kaspersky Standard para 10 dispositivos por 2 años Protección básica contra virus y amenazas digitales Activación 100% original por internet Compatible con Windows, Mac y dispositivos móviles Incluye protección en tiempo real y control parental Soporte técnico y garantía incluidos Entrega inmediata por correo electrónico con guia de instalación.',"/images/productos/Kaspersky.png",148840,14,1,1,NOW(),NOW()),
('Microsoft Visio 2021','Licencia para activar Visio Pro 2021 Apta para 64 bits y 32 bits Versión Pro apta para personas, empresas e instituciones En caso de tener instalado un office debe comprar este producto con la misma versión y edición de su office, verifique la paquetería de office antes de hacer su compra Si tiene Office 365 es compatible con esta version de Visio Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/Visio2021Profesional.png",29530,18,1,2,NOW(),NOW()),
('Office 2021 Hogar y Empresas Mac','Licencia para Office Hogar y Empresas Mac 2021 Funciona exclusivamente en Mac Descargue el software desde el sitio web oficial Clave de licencia de 25 dígitos Incluye Word, Excel, PowerPoint, Outlook Todos nuestros productos son originales y cuentan con garantía y soporte técnico Entrega inmediata directo a tu correo electrónico junto con manual de instalación.',"/images/productos/OfficeHogarYEmpresa.png",156800,8,1,2,NOW(),NOW());


-- =========================
-- INSERTO USUARIO ADMINISTRADOR
-- =========================
INSERT INTO usuarios
(nombre, correo, contrasena, telefono, rol, activo)
VALUES
(
    "Patricio Rey",
    "patricio@test.com",
    '$2b$10$tII9vvH4OPmM2mpqFkz/WOCtXHPKkJXcgk/1fp7yXBpuQ7UM1BwHq',
    "0303456",
    'administrador',
    1
);



-- =========================
-- INSERTO VENTAS
-- =========================
INSERT INTO ventas (id, nombre_cliente, total, fecha, medio) VALUES
(1, 'Juan Perez', 104500, '2025-01-12 13:15:00', 'Tarjeta'),
(2, 'Lucia Gomez', 63480, '2025-02-03 17:20:00', 'Efectivo'),
(3, 'Martin Diaz', 106000, '2025-03-28 19:10:00', 'Transferencia'),
(4, 'Ana Lopez', 50000, '2025-04-14 12:40:00', 'Efectivo'),
(5, 'Carlos Ruiz', 156800, '2025-05-30 14:35:00', 'Tarjeta'),
(6, 'Sofia Martinez', 93000, '2025-06-10 21:00:00', 'Transferencia'),
(7, 'Pedro Sanchez', 148840, '2025-07-25 16:20:00', 'Tarjeta'),
(8, 'Mariana Torres', 18000, '2025-08-06 20:45:00', 'Efectivo'),
(9, 'Diego Fernandez', 74000, '2025-09-18 11:10:00', 'Tarjeta'),
(10, 'Valentina Rios', 25000, '2025-10-02 15:00:00', 'Efectivo'),
(11, 'Nicolas Herrera', 367330, '2025-11-15 18:25:00', 'Transferencia'),
(12, 'Camila Suarez', 55100, '2025-12-01 09:40:00', 'Tarjeta'),

(13, 'Federico Luna', 192279, '2026-01-20 22:10:00', 'Efectivo'),
(14, 'Agustina Vega', 63000, '2026-02-05 10:30:00', 'Tarjeta'),
(15, 'Tomas Castillo', 29530, '2026-02-25 19:55:00', 'Transferencia'),
(16, 'Julieta Romero', 82500, '2026-03-12 14:20:00', 'Tarjeta'),
(17, 'Matias Acosta', 113400, '2026-03-28 16:50:00', 'Transferencia'),
(18, 'Brenda Silva', 47000, '2026-04-09 11:35:00', 'Efectivo'),
(19, 'Lucas Medina', 256900, '2026-04-26 18:15:00', 'Tarjeta'),
(20, 'Florencia Navarro', 98000, '2026-05-03 13:45:00', 'Transferencia'),
(21, 'Joaquin Benitez', 64500, '2026-05-16 20:30:00', 'Efectivo'),
(22, 'Micaela Ortiz', 121000, '2026-05-29 17:10:00', 'Tarjeta'),
(23, 'Gabriel Morales', 43000, '2026-06-04 09:15:00', 'Efectivo'),
(24, 'Paula Gimenez', 89000, '2026-06-11 21:20:00', 'Transferencia'),
(25, 'Emiliano Castro', 172500, '2026-06-18 16:40:00', 'Tarjeta');



-- =========================
-- INSERTO DETALLE DE VENTAS
-- =========================
INSERT INTO detalle_Ventas (venta_id, producto_id, cantidad) VALUES

(1, 2, 1),
(1, 5, 2),
(2, 7, 1),
(3, 1, 1),
(3, 10, 1),
(4, 3, 2),
(5, 8, 1),
(5, 12, 1),
(5, 15, 2),
(6, 6, 1),
(7, 2, 2),
(7, 11, 1),
(8, 14, 1),
(9, 4, 1),
(9, 9, 2),
(10, 5, 1),
(11, 1, 2),
(11, 7, 1),
(11, 16, 1),
(12, 13, 1),
(13, 3, 1),
(13, 8, 2),
(14, 6, 1),
(15, 12, 1),
(15, 15, 1),
(16, 4, 2),
(16, 9, 1),
(17, 2, 1),
(17, 10, 1),
(17, 14, 2),
(18, 5, 1),
(19, 1, 1),
(19, 7, 2),
(19, 11, 1),
(20, 16, 1),
(21, 3, 1),
(21, 6, 1),
(22, 8, 2),
(22, 13, 1),
(23, 15, 1),
(24, 2, 1),
(24, 4, 1),
(25, 1, 2),
(25, 12, 1),
(25, 16, 1);