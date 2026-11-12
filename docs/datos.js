/* ============================================================
   DATOS DE LA INMOBILIARIA — este es el único archivo que hay
   que editar para cambiar contactos o cargar propiedades.
   ============================================================ */

window.CONFIG = {
  nombre: "Inmobiliaria Prezioso",
  direccion: "San Martín 670, Azul, Buenos Aires",
  telefono: "02281 43-2233",          // como se muestra en pantalla
  telefonoLink: "+542281432233",      // para el botón de llamar
  email: "prezioso@speedy.com.ar",
  whatsapp: "",                       // ej: "5492281123456" (sin + ni espacios). Si se completa, aparecen botones de WhatsApp.
  instagram: "",                      // ej: "https://www.instagram.com/usuario"
  mapa: "https://www.google.com/maps/search/?api=1&query=San+Martin+670+Azul+Buenos+Aires"
};

/* ------------------------------------------------------------
   PROPIEDADES
   Para agregar una: copiá un bloque { ... }, pegalo abajo y
   cambiá los datos. Para sacar una, borrá su bloque.

   operacion: "venta" o "alquiler"
   tipo:      "casa", "departamento", "comercial", "terreno" o "campo"
   precio:    número sin puntos (o null para "Consultar")
   moneda:    "u$s" o "$"
   fotos:     nombres de archivo dentro de la carpeta fotos/
   ------------------------------------------------------------ */

window.PROPIEDADES = [
  {
    id: "casa-burgos-tucuman",
    operacion: "venta",
    tipo: "casa",
    titulo: "Excelente propiedad",
    ubicacion: "Burgos y Tucumán",
    precio: 200000,
    moneda: "u$s",
    nota: "Libres",
    descripcion: "Dos dormitorios, amplio living comedor, cocina, comedor diario, quincho, habitación y baño de servicio, lavadero, garage, entrada para autos y patio. Muy buena calidad y en impecable estado.",
    caracteristicas: ["2 dormitorios", "Quincho", "Garage", "Patio", "Lavadero"],
    fotos: ["fotos/IMGP9790_redimensionar.JPG", "fotos/Nelida 1.jpg"]
  },
  {
    id: "casa-antigua-malere",
    operacion: "venta",
    tipo: "casa",
    titulo: "Casa antigua, ideal profesionales o para reciclar",
    ubicacion: "Malere entre Moreno y 25 de Mayo",
    precio: 120000,
    moneda: "u$s",
    nota: "Libre de gastos",
    descripcion: "Muy buena propiedad con 3 dormitorios, living comedor amplio, cocina comedor, baño, lavadero, garage y patio. Lote de 13 x 43 m con 280 m² edificados.",
    caracteristicas: ["3 dormitorios", "Lote 13 x 43 m", "280 m² edificados", "Garage"],
    fotos: [],
    destacada: true
  },
  {
    id: "casa-salon-9julio-rauch",
    operacion: "venta",
    tipo: "casa",
    titulo: "Casa con salón comercial",
    ubicacion: "9 de Julio y Rauch",
    precio: 150000,
    moneda: "u$s",
    nota: "",
    descripcion: "Casa con 3 dormitorios, living, cocina comedor, baño, garage y patio. Local al frente con entrepiso y baño.",
    caracteristicas: ["3 dormitorios", "Local al frente", "Entrepiso", "Garage", "Patio"],
    fotos: ["fotos/IMGP9747_redimensionar.jpg", "fotos/IMGP9748_redimensionar.jpg"]
  },
  {
    id: "local-vivienda-justo-malvinas",
    operacion: "venta",
    tipo: "comercial",
    titulo: "Local comercial con vivienda",
    ubicacion: "Juan B. Justo esquina Malvinas",
    precio: 160000,
    moneda: "u$s",
    nota: "",
    descripcion: "280 m² de moderno salón de exposición con 2 oficinas, baño y taller. Casa con 1 dormitorio, cocina y baño. Otro salón comercial de 20 m² con baño.",
    caracteristicas: ["Salón 280 m²", "2 oficinas", "Taller", "Casa 1 dormitorio", "Salón 20 m²"],
    fotos: ["fotos/Adrian.jpg", "fotos/IMGP9756_redimensionar.JPG"]
  },
  {
    id: "duplex-depaula-guamini",
    operacion: "venta",
    tipo: "casa",
    titulo: "Dúplex a estrenar",
    ubicacion: "De Paula esquina Guamini",
    precio: null,
    moneda: "u$s",
    nota: "",
    descripcion: "Planta baja con living comedor, cocina, toilette y entrada de autos. Planta alta con 3 dormitorios y baño completo. Aberturas de aluminio anodizado blanco línea Modena, puertas interiores de placa de madera, pisos flotantes en dormitorios y cerámicos en el resto. Cocina con muebles bajo mesada y alacenas, mesada de granito, bacha de acero y grifería monocomando FV. Calefacción y agua caliente con caldera dual Peisa y radiadores en ambas plantas, toallero calefaccionado en baños.",
    caracteristicas: ["3 dormitorios", "A estrenar", "Dos plantas", "Caldera dual", "Entrada de autos"],
    fotos: []
  },
  {
    id: "depto-guidospano-arenales",
    operacion: "venta",
    tipo: "departamento",
    titulo: "Departamento en planta alta",
    ubicacion: "Guido Spano y Arenales",
    precio: 60000,
    moneda: "u$s",
    nota: "",
    descripcion: "Dos dormitorios, living comedor, cocina comedor, baño, lavadero y terraza.",
    caracteristicas: ["2 dormitorios", "Terraza", "Lavadero"],
    fotos: ["fotos/DSC01352.JPG", "fotos/DSC01353.JPG"]
  }
];
