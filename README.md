# ReportaYa (React + Vite)

## Integrantes

- Lourdes

## Descripción

ReportaYa es un sistema web para que los vecinos reporten problemas del espacio público de su barrio (baches, luminarias rotas, basurales, pérdidas de agua) y sigan en qué estado está cada reclamo: pendiente, en proceso o resuelto.

Repositorio N.º 2 (frontend) de **Programación IV**.

🔗 **Sitio publicado:** https://reporta-ya-frontend.vercel.app/

## Funcionalidades

- **Mapa del barrio** en el inicio: cada reporte es un pin del color de su estado. Al pasar el mouse muestra un resumen y al tocarlo abre el detalle.
- **Listado de reportes** con búsqueda por título o calle y filtros por categoría, barrio y estado.
- **Detalle de cada reporte** con su ilustración, ubicación en el mapa y seguimiento del estado.
- **Nuevo reporte** con validación y vista previa en vivo. Al publicarlo se abre su página de detalle.
- **Estadísticas** calculadas a partir de los reportes, con barras por estado y por categoría.
- Los reportes nuevos se **guardan en el navegador** (localStorage) y no se pierden al recargar.
- Página **404** para direcciones que no existen.

## Tecnologías

- React 19 y Vite
- React Router (navegación entre páginas)
- React Bootstrap y Bootstrap 5
- Bootstrap Icons
- JavaScript
- Git, GitHub y Vercel

## Instalación y ejecución

Requisito: tener instalado [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/lourdesrodriguez071102-ui/ReportaYA-frontend.git
cd ReportaYA-frontend
npm install     # instala las dependencias
npm run dev     # abre el sitio en http://localhost:5173
npm run build   # genera la versión de producción en la carpeta dist
```

## Páginas y rutas (React Router)

| Ruta | Página | Qué muestra |
|------|--------|-------------|
| `/` | `Inicio` | Mapa del barrio, cómo funciona, categorías y últimos reportes |
| `/reportes` | `Reportes` | Listado con filtros. Acepta `?categoria=bache` para llegar ya filtrado |
| `/reportes/:id` | `DetalleReporte` | Un reporte. El `:id` se lee con `useParams` |
| `/nuevo-reporte` | `NuevoReporte` | Formulario con vista previa |
| `/estadisticas` | `Estadisticas` | Totales por estado y por categoría |
| `*` | `NoEncontrada` | Página 404 |

Cómo se usa React Router en el proyecto:

- `BrowserRouter` (en `main.jsx`) habilita la navegación.
- `Routes` y `Route` (en `App.jsx`) definen qué página corresponde a cada ruta.
- `Layout` usa `<Outlet />` para dibujar la página actual entre el encabezado y el pie.
- `NavLink` en el menú marca la página activa; `Link` navega sin recargar la página.
- `useParams` lee el id del reporte, `useSearchParams` lee la categoría de la dirección, `useNavigate` lleva al detalle después de publicar y vuelve atrás con el botón "Volver".
- `vercel.json` hace que Vercel sirva la app en cualquier ruta (si no, recargar en `/reportes` daría error 404).

## Estructura de carpetas

```
├── public/              → logo, robots.txt y sitemap.xml
├── src/
│   ├── components/
│   │   ├── comunes/     → Seo, EncabezadoPagina, TituloSeccion, Calle, ContadorAnimado
│   │   ├── layout/      → Layout, Encabezado, PieDePagina
│   │   ├── inicio/      → Hero, PasoTarjeta, CategoriaTarjeta
│   │   ├── reportes/    → TarjetaReporte, FiltrosReportes, SelectOpciones, BadgeEstado,
│   │   │                  CartelCalle, SeguimientoEstado, Ilustracion
│   │   └── mapa/        → MapaBarrio, PinMapa
│   ├── pages/           → Inicio, Reportes, DetalleReporte, NuevoReporte, Estadisticas, NoEncontrada
│   ├── data/            → reportes.js (categorías, barrios, estados y reportes de ejemplo)
│   ├── hooks/           → useEnPantalla.js
│   ├── utils/           → formato.js (fechas y búsqueda)
│   ├── App.jsx          → estado de los reportes y rutas
│   ├── main.jsx         → punto de entrada (BrowserRouter + Bootstrap)
│   └── index.css        → variables globales
├── index.html
├── vercel.json
└── package.json
```

- **pages:** una vista completa por ruta.
- **components:** piezas reutilizables, agrupadas por tema.

## Componentes y props

| Componente | Props | Se reutiliza en |
|------------|-------|-----------------|
| `Seo` | `titulo`, `descripcion`, `ruta` | Las 6 páginas |
| `EncabezadoPagina` | `titulo`, `bajada`, `children` | Reportes, Detalle, Nuevo reporte, Estadísticas |
| `TituloSeccion` | `id`, `titulo`, `bajada`, `claro` | Las 3 secciones del inicio |
| `TarjetaReporte` | `reporte`, `esVistaPrevia` | Inicio, Reportes y vista previa del formulario |
| `MapaBarrio` | `reportes` | Inicio (todos los reportes) y Detalle (un reporte) |
| `PinMapa` | `reporte`, `indice` | Un pin por reporte |
| `FiltrosReportes` | `filtros`, `alCambiar` | Reportes |
| `SelectOpciones` | `nombre`, `opciones`, `textoVacio`, `valor`, `alCambiar`, `requerido` | Filtros y formulario (5 selects) |
| `BadgeEstado` | `estado` | Tarjetas y detalle |
| `CartelCalle` | `direccion` | Tarjetas y detalle |
| `SeguimientoEstado` | `estado` | Tarjetas y detalle |
| `Ilustracion` | `tipo`, `className` | Categorías, tarjetas, detalle y 404 |
| `CategoriaTarjeta` | `clave`, `nombre`, `descripcion`, `cantidad` | Inicio (5 veces) |
| `PasoTarjeta` | `numero`, `icono`, `titulo`, `texto` | Inicio (3 veces) |
| `PieDePagina` | `autora` | Layout |

**Cómo viajan los datos:** `App` guarda la lista de reportes con `useState` y se la pasa por props a cada página. `NuevoReporte` recibe la función `alCrear`: así el formulario le avisa a `App` que hay un reporte nuevo, y todas las páginas se actualizan.

## Uso de `map()`

`map()` recorre una lista y devuelve un elemento por cada ítem, sin repetir código. Se usa para:

- Los enlaces del menú y del pie de página.
- Los pines del mapa, las manzanas y las calles del dibujo.
- Las tarjetas de reportes, categorías y pasos.
- Las opciones de los selects y los selects de los filtros.
- Los campos de texto del formulario.
- Las barras y listas de las estadísticas y los datos del detalle.

Cada elemento creado con `map()` lleva una `key` única para que React lo identifique.

## Estrategias de SEO

| Estrategia | Dónde |
|------------|-------|
| Título y descripción **distintos en cada página** | Componente `Seo`, usado en todas las páginas |
| URL canónica y Open Graph actualizados por página | Componente `Seo` |
| Un solo `h1` por página | `Hero` en el inicio y `EncabezadoPagina` en el resto |
| Etiquetas semánticas | `header`, `nav`, `main`, `section`, `article`, `figure`, `footer`, `dl` |
| Metadatos base, JSON-LD, idioma y color de tema | `index.html` |
| `alt` y `aria-label` en imágenes y pines | Componentes del mapa e ilustraciones |
| `robots.txt` y `sitemap.xml` con todas las rutas | `public/` |
| Direcciones claras y legibles | `/reportes`, `/reportes/2`, `/nuevo-reporte` |

## Estilos: Bootstrap primero

El diseño se arma con componentes de React Bootstrap (`Navbar`, `Card`, `Badge`, `Form`, `ProgressBar`, `ListGroup`, `Tooltip`, `Alert`) y con utilidades de Bootstrap (`d-flex`, `gap-*`, `py-*`, `ratio`, `position-absolute`, `rounded-*`, `shadow-*`, `text-*`, `bg-*`, etc.).

`index.css` tiene **74 líneas**, cerca del **5%** del código de la interfaz. Solo contiene:

- **Variables globales** de la marca y la paleta aplicada a Bootstrap (`--bs-primary`, `--bs-warning`, etc.), así `bg-primary` o `btn-primary` usan los colores de ReportaYa.
- Unas pocas piezas de identidad que Bootstrap no trae: la franja de asfalto (`.calle`), el fondo de plano, el botón naranja y la animación de los pines.

## Identidad visual

Inspirada en la señalética urbana: azul cartel `#1E3A5F`, naranja cono `#F26B1D`, amarillo vial `#F5C400` y asfalto `#2B2F36`, con la tipografía **Overpass** (basada en los carteles de ruta) e ilustraciones SVG propias para cada categoría.

## Organización de ramas

| Rama | Uso |
|------|-----|
| `main` | Versión estable y entregada |
| `dev` | Rama principal de desarrollo |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de errores |
| `refactor/*` | Mejoras de código sin cambiar el funcionamiento |
| `docs/*` | Documentación |
