# ReportaYa (React + Vite)

## Integrantes

- Lourdes

## Descripción

ReportaYa es un sistema web para que los vecinos reporten problemas del espacio público de su barrio (baches, luminarias rotas, basurales, pérdidas de agua) y sigan en qué estado está cada reclamo: pendiente, en proceso o resuelto.

Repositorio N.º 2 (frontend) de **Programación IV**: migración del proyecto anterior a **React + Vite** con **React Bootstrap**.

🔗 **Sitio publicado:** https://reporta-ya-frontend.vercel.app/

## Tecnologías

- React y Vite
- React Bootstrap y Bootstrap
- Bootstrap Icons
- JavaScript
- Git, GitHub y Vercel

## Cómo ejecutar el proyecto

Requisito: tener instalado [Node.js](https://nodejs.org/).

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev     # abre el servidor de desarrollo en http://localhost:5173
npm run build   # genera la versión de producción en la carpeta dist
```

## Identidad visual: "señalética urbana"

La interfaz toma su estética de la calle: el asfalto, los conos, la pintura vial y los carteles con nombres de calles.

| Elemento | Decisión |
|----------|----------|
| Tipografía | **Overpass**, inspirada en la letra de los carteles de ruta. Una sola familia: muy gruesa en títulos, liviana en textos |
| Colores | Asfalto `#2B2F36`, azul cartel `#1E3A5F`, naranja cono `#F26B1D`, amarillo vial `#F5C400`, gris tiza `#F3F5F7` |
| Estados | Rojo (pendiente), ámbar (en proceso) y verde (resuelto), como un semáforo |
| Portada | Un **mapa ilustrado del barrio** donde cada reporte es un pin del color de su estado |
| Imágenes | **Ilustraciones SVG propias** para cada categoría, hechas con código y con los colores de la marca |
| Direcciones | Se muestran como **carteles de calle** (azul con borde blanco) |

### Movimiento

- **Al cargar:** los pines caen sobre el mapa uno después del otro y se pinta la línea amarilla de la avenida. Los reportes pendientes "laten".
- **Al hacer scroll:** en computadora, a la izquierda hay una **calle con paradas** (una por sección). Un pin baja a medida que se recorre la página y se marca la sección actual. En celular, se reemplaza por una barra de progreso con línea punteada.
- **Estadísticas:** el número total cuenta desde 0 y las barras crecen cuando la sección aparece.
- Si el sistema tiene activada la opción de **reducir movimiento**, las animaciones se desactivan.

## Funcionalidades

- **Mapa interactivo:** al pasar el mouse (o con el teclado) sobre un pin se ve el detalle; al tocarlo, baja hasta la tarjeta del reporte.
- **Categorías:** al tocar una, el listado se filtra por esa categoría.
- **Filtros combinados:** búsqueda por título o calle, categoría, barrio y estado, con contador de resultados y mensaje cuando no hay coincidencias.
- **Nuevo reporte con vista previa en vivo:** mientras se completa el formulario, la tarjeta se arma al lado. Al publicarlo aparece en el mapa, en el listado y en las estadísticas.
- **Validación** con los estilos de React Bootstrap.

## Estructura de carpetas

```
├── public/
│   ├── img/logo.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/          → piezas reutilizables
│   │   ├── BadgeEstado.jsx
│   │   ├── CartelCalle.jsx
│   │   ├── ContadorAnimado.jsx
│   │   ├── Ilustracion.jsx
│   │   ├── MapaBarrio.jsx
│   │   ├── PinMapa.jsx
│   │   ├── Recorrido.jsx
│   │   ├── SeguimientoEstado.jsx
│   │   ├── SelectOpciones.jsx
│   │   ├── TarjetaReporte.jsx
│   │   └── TituloSeccion.jsx
│   ├── hooks/
│   │   └── useEnPantalla.js → avisa cuándo un elemento aparece en pantalla
│   ├── sections/            → secciones de la página
│   │   ├── Encabezado.jsx
│   │   ├── Hero.jsx
│   │   ├── ComoFunciona.jsx
│   │   ├── Categorias.jsx
│   │   ├── Reportes.jsx
│   │   ├── Estadisticas.jsx
│   │   ├── NuevoReporte.jsx
│   │   └── PieDePagina.jsx
│   ├── data/reportes.js     → datos del sistema
│   ├── App.jsx              → componente principal (guarda el estado compartido)
│   ├── main.jsx             → punto de entrada
│   └── index.css            → estilos de la marca
├── index.html               → HTML base con el SEO
├── package.json
└── vite.config.js
```

## Componentes y props

### Componentes reutilizables

| Componente | Props | Dónde se usa |
|------------|-------|--------------|
| `TituloSeccion` | `id`, `titulo`, `bajada`, `claro` | En las 5 secciones con título |
| `Ilustracion` | `tipo`, `className` | Categorías y tarjetas de reportes |
| `TarjetaReporte` | `reporte`, `esVistaPrevia` | Listado **y** vista previa del formulario |
| `BadgeEstado` | `estado` | Dentro de cada tarjeta |
| `SeguimientoEstado` | `estado` | Barra de 3 etapas en cada tarjeta |
| `CartelCalle` | `direccion` | Dirección de cada tarjeta |
| `MapaBarrio` | `reportes` | Portada |
| `PinMapa` | `reporte`, `indice` | Un pin por reporte en el mapa |
| `SelectOpciones` | `nombre`, `opciones`, `textoVacio`, `valor`, `alCambiar`, `requerido` | 6 selects (filtros y formulario) |
| `ContadorAnimado` | `valor`, `duracion` | Total de estadísticas |
| `Recorrido` | `secciones` | Calle lateral y barra de progreso |

### Cómo viajan los datos

`App` guarda el **estado compartido** (`useState`) y lo pasa por **props**:

```
App  (estado: reportes, categoria)
 ├─ reportes ─────────────────► Hero ──► MapaBarrio ──► PinMapa (x cada reporte)
 ├─ pasos ────────────────────► ComoFunciona
 ├─ reportes, alElegir ───────► Categorias ──► Ilustracion
 ├─ reportes, categoria,
 │  alCambiarCategoria ───────► Reportes ──► TarjetaReporte ──► BadgeEstado, CartelCalle, SeguimientoEstado
 ├─ reportes ─────────────────► Estadisticas ──► ContadorAnimado
 └─ alCrear ──────────────────► NuevoReporte ──► TarjetaReporte (vista previa)
```

- Las props `alElegir`, `alCambiarCategoria` y `alCrear` son **funciones**: permiten que un hijo le avise algo al padre (por ejemplo, que se creó un reporte).
- Cuando cambia el estado en `App`, React vuelve a dibujar todas las secciones que lo usan: por eso un reporte nuevo aparece a la vez en el mapa, el listado y las estadísticas.

## SEO

En `index.html`: idioma, título y meta description, meta robots, URL canónica, Open Graph, datos estructurados (JSON-LD), color de tema, un solo `h1` y `robots.txt` y `sitemap.xml` en `public/`. Las secciones usan etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`, `figure`).

## Accesibilidad

- Foco visible al navegar con teclado.
- Los pines del mapa son enlaces con descripción (`aria-label`).
- Mensajes de resultados con `aria-live`.
- Respeta la preferencia de reducir movimiento.

## Organización de ramas

| Rama | Uso |
|------|-----|
| `main` | Versión estable y entregada |
| `dev` | Rama principal de desarrollo |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de errores |
| `refactor/*` | Mejoras de código sin cambiar el funcionamiento |
| `docs/*` | Documentación |
