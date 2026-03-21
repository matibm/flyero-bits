<p align="center">
  <img src="https://img.shields.io/badge/Flyer_Gen-Generador_de_Obituarios-1a1a2e?style=for-the-badge&labelColor=0f0f23" alt="Flyer Gen" />
</p>

<h1 align="center">Flyer Gen</h1>

<p align="center">
  <strong>Editor visual de flyers para servicios funerarios</strong><br />
  Genera obituarios profesionales en alta resolucion directamente desde el navegador.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Konva-10.2-0D83CD?style=flat-square&logo=data:image/svg+xml;base64,&logoColor=white" alt="Konva" />
  <img src="https://img.shields.io/badge/Zustand-5.0-433E38?style=flat-square&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Licencia-MIT-green?style=flat-square" alt="Licencia MIT" />
</p>

---

## Descripcion

**Flyer Gen** es una aplicacion web que permite crear flyers de obituario de forma rapida y profesional. A traves de un editor visual basado en canvas, el usuario puede personalizar textos, fotografias, fondos y estilos tipograficos, obteniendo como resultado una imagen en alta resolucion lista para impresion o distribucion digital.

La aplicacion esta orientada a servicios funerarios que necesitan generar este tipo de material de manera agil, con un flujo de trabajo intuitivo y sin dependencias de software de diseno externo.

---

## Capturas de Pantalla

> _Proximamente: capturas del editor, panel lateral y resultado exportado._

|             Editor Visual              |         Panel de Propiedades         |          Resultado Exportado           |
| :------------------------------------: | :----------------------------------: | :------------------------------------: |
| ![Editor](docs/screenshots/editor.png) | ![Panel](docs/screenshots/panel.png) | ![Export](docs/screenshots/export.png) |

---

## Caracteristicas

- **Editor visual en canvas** -- Renderizado en tiempo real con Konva sobre un lienzo de 800x1200px.
- **Drag & Drop** -- Reposiciona la fotografia del difunto y los elementos del flyer directamente en el canvas.
- **Transformacion de elementos** -- Escala, rota y redimensiona nodos con controles visuales (Transformer).
- **Exportacion en alta resolucion** -- Genera archivos JPG a 3x de resolucion (2400x3600px efectivos) con un solo clic.
- **Personalizacion tipografica** -- Cambia fuente, tamano, color, alineacion, negrita y cursiva por cada campo de texto.
- **Fondo personalizado** -- Sube imagenes de fondo propias y aplica filtros de overlay con opacidad y color configurables.
- **Sistema de plantillas** -- Estructura basada en templates con mapeo dinamico de campos a posiciones del canvas.
- **Gestion de estado centralizada** -- Store reactivo con Zustand para datos del difunto, transformaciones y overrides de texto.
- **Interfaz responsiva** -- El canvas se adapta automaticamente al tamano del viewport sin perder proporciones.
- **Carga diferida de fuentes** -- El motor de renderizado espera a que las web fonts esten listas antes de mostrar el canvas.

---

## Stack Tecnologico

| Capa           | Tecnologia                                                                                            | Version     |
| -------------- | ----------------------------------------------------------------------------------------------------- | ----------- |
| UI Framework   | [React](https://react.dev)                                                                            | 19.2        |
| Lenguaje       | [TypeScript](https://www.typescriptlang.org)                                                          | 5.9         |
| Bundler        | [Vite](https://vite.dev)                                                                              | 7.3         |
| Canvas 2D      | [Konva](https://konvajs.org) + [react-konva](https://github.com/konvajs/react-konva)                  | 10.2 / 19.2 |
| Estado         | [Zustand](https://zustand-demo.pmnd.rs) + [Zundo](https://github.com/charkour/zundo)                  | 5.0 / 2.3   |
| Estilos        | [Tailwind CSS](https://tailwindcss.com)                                                               | 4.2         |
| Iconos         | [Lucide React](https://lucide.dev)                                                                    | 0.576       |
| PDF            | [jsPDF](https://github.com/parallax/jsPDF)                                                            | 4.2         |
| Notificaciones | [Sonner](https://sonner.emilkowal.dev)                                                                | 2.0         |
| Linting        | [ESLint](https://eslint.org)                                                                          | 9.39        |
| Formateo       | [Prettier](https://prettier.io)                                                                       | 3.8         |
| Testing        | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)                         | 4.1         |
| Git Hooks      | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | 9.1 / 16.4  |

---

## Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

| Herramienta                   | Version minima                          |
| ----------------------------- | --------------------------------------- |
| [Node.js](https://nodejs.org) | 20.0 o superior                         |
| [npm](https://www.npmjs.com)  | 10.0 o superior (incluido con Node 20+) |

Para verificar las versiones instaladas:

```bash
node --version
npm --version
```

---

## Instalacion y Configuracion

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/flyer-gen.git
cd flyer-gen
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`.

---

## Scripts Disponibles

| Comando           | Descripcion                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Inicia el servidor de desarrollo con HMR (Hot Module Replacement). |
| `npm run build`   | Compila TypeScript y genera el bundle de produccion en `dist/`.    |
| `npm run preview` | Sirve localmente el build de produccion para verificacion.         |
| `npm run lint`    | Ejecuta ESLint sobre todo el proyecto.                             |

---

## Estructura del Proyecto

```
flyer-gen/
├── public/                          # Archivos estaticos
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Background.tsx       # Fondo del canvas (template + custom + overlay)
│   │   │   ├── CanvasWorkspace.tsx   # Contenedor responsivo del canvas
│   │   │   ├── DeceasedPhoto.tsx     # Fotografia del difunto (draggable)
│   │   │   ├── DynamicTexts.tsx      # Campos de texto dinamicos mapeados
│   │   │   ├── EditorStage.tsx       # Stage de Konva con todas las capas
│   │   │   └── MasterTransformer.tsx # Transformer compartido para nodos
│   │   └── ui/
│   │       ├── BgOverlayControls.tsx # Controles de filtro de fondo
│   │       ├── ExportButton.tsx      # Boton de exportacion JPG
│   │       ├── Sidebar.tsx           # Panel lateral con formularios
│   │       └── TextPropertiesPanel.tsx # Editor de propiedades de texto
│   ├── data/
│   │   └── mockData.ts              # Datos iniciales y plantilla por defecto
│   ├── store/
│   │   └── useEditorStore.ts        # Store global (Zustand)
│   ├── types.ts                     # Interfaces y tipos TypeScript
│   ├── App.tsx                      # Componente raiz
│   ├── main.tsx                     # Punto de entrada
│   └── index.css                    # Estilos globales (Tailwind)
├── .husky/                          # Git hooks
├── .github/                         # Configuracion de GitHub
├── eslint.config.js                 # Configuracion de ESLint
├── tsconfig.json                    # Configuracion base de TypeScript
├── tsconfig.app.json                # TS config para la aplicacion
├── tsconfig.node.json               # TS config para Node/Vite
├── vite.config.ts                   # Configuracion de Vite
├── .prettierrc                      # Configuracion de Prettier
├── .editorconfig                    # Configuracion de EditorConfig
└── package.json
```

---

## Contribuir

Las contribuciones son bienvenidas. Para colaborar con el proyecto:

1. Realiza un fork del repositorio.
2. Crea una rama para tu funcionalidad o correccion:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Asegurate de que el codigo pasa las verificaciones:
   ```bash
   npm run lint
   npm run build
   ```
4. Realiza commits descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org).
5. Abre un Pull Request describiendo los cambios realizados.

### Normas del proyecto

- Todo el codigo debe estar escrito en **TypeScript** con tipado estricto.
- Los estilos se gestionan exclusivamente con **Tailwind CSS** (no CSS modules ni styled-components).
- Los commits deben pasar los hooks de **Husky** y **lint-staged** antes de ser aceptados.
- Manten la estructura de carpetas existente al agregar nuevos componentes.

---

## Licencia

Este proyecto esta distribuido bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para mas informacion.

---

<p align="center">
  Desarrollado para <strong>Imperial</strong>
</p>
