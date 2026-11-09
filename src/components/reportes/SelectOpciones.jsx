import { Form } from "react-bootstrap";

// Select reutilizable armado con map() a partir de un objeto de opciones.
// Debe ir dentro de un <Form.Group controlId="...">: de ahí toma su id.
// Props:
//   - nombre: atributo name del campo
//   - opciones: objeto { valor: "Texto" } o { valor: { nombre: "Texto" } }
//   - textoVacio: texto de la primera opción (ej: "Todas")
//   - valor: opción elegida
//   - alCambiar: función que recibe la opción nueva
//   - requerido: si el campo es obligatorio

function SelectOpciones({ nombre, opciones, textoVacio, valor, alCambiar, requerido = false }) {
  return (
    <Form.Select
      name={nombre}
      value={valor}
      onChange={(evento) => alCambiar(evento.target.value)}
      required={requerido}
    >
      <option value="">{textoVacio}</option>
      {Object.entries(opciones).map(([clave, dato]) => (
        <option key={clave} value={clave}>
          {typeof dato === "string" ? dato : dato.nombre}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectOpciones;
