# Planificaciones al Día

Landing page estática para ofrecer un servicio independiente de apoyo docente con planificaciones diarias, secuencias didácticas, rúbricas, instrumentos de evaluación y actividades de recuperación pedagógica.

El sitio está construido con HTML, CSS y JavaScript puro. No usa backend y está listo para publicarse con GitHub Pages.

## Estructura

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── hero-planificaciones-docentes.png
```

## Cómo editar los datos de contacto

Abre `script.js` y cambia los valores de `CONTACT_CONFIG`:

```js
const CONTACT_CONFIG = {
  email: "contacto@ejemplo.com",
  whatsappNumber: "18095551234",
  whatsappDisplay: "+1 809 555 1234",
  whatsappMessage: "Hola, quiero solicitar una planificación docente."
};
```

- `email`: correo que se mostrará en la página.
- `whatsappNumber`: número en formato internacional, sin espacios ni signos.
- `whatsappDisplay`: número como quieres que se vea en pantalla.
- `whatsappMessage`: mensaje predeterminado de WhatsApp.

## Cómo publicar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub.
2. Entra a **Settings** del repositorio.
3. Abre **Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama principal, normalmente `main`, y la carpeta raíz `/`.
6. Guarda los cambios.

GitHub generará una URL pública para el sitio.

## Cómo cambiar textos, servicios y planes

- Los textos principales están en `index.html`.
- Las tarjetas de servicios están en la sección `#servicios`.
- Las áreas disponibles están en la sección `#areas`.
- Los planes están en la sección `#planes`.
- Las preguntas frecuentes están en la sección `#preguntas`.
- Los estilos visuales están en `styles.css`.

Si quieres agregar más servicios o áreas, copia una tarjeta existente y cambia el texto.

## Formulario de contacto

GitHub Pages no procesa formularios por sí solo. Por eso el formulario valida los campos y prepara enlaces para enviar la solicitud por WhatsApp o correo.

Si en el futuro usas un servicio externo de formularios, puedes conectar el formulario desde `index.html` y ajustar la lógica en `script.js`.

## Nota legal

No uses logos oficiales del MINERD ni afirmes que el servicio es oficial sin autorización expresa.

Texto legal incluido en el sitio:

> Servicio independiente de apoyo docente. No representa ni sustituye documentos oficiales del ministerio. Las planificaciones deben ser revisadas y contextualizadas por cada docente.
