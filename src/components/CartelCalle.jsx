// Componente reutilizable: muestra una dirección con el estilo de los
// carteles de nombre de calle (fondo azul, borde blanco).
// Props:
//   - direccion: texto de la dirección (ej: "San Martín 450")

function CartelCalle({ direccion }) {
  return (
    <span className="cartel-calle">
      <i className="bi bi-signpost-split" aria-hidden="true"></i>
      {direccion}
    </span>
  );
}

export default CartelCalle;
