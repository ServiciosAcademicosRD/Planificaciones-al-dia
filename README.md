# Planificación al día

Landing page estática para ofrecer un servicio independiente de apoyo docente: planificaciones diarias, secuencias didácticas, rúbricas, instrumentos de evaluación, actividades de recuperación pedagógica y documentos editables.

El sitio está construido con HTML, CSS y JavaScript puro, por lo que puede publicarse directamente con GitHub Pages sin backend.

## Estructura

- `index.html`: contenido principal de la página.
- `styles.css`: estilos, diseño responsive y animaciones ligeras.
- `script.js`: menú móvil, enlaces de contacto, validación del formulario y botón de WhatsApp.
- `assets/hero-planificacion-docente.png`: imagen principal del hero.

## Cómo editar los datos de contacto

Abre `script.js` y cambia los valores del objeto `CONTACT`:

```js
const CONTACT = {
  email: "contacto@planificacionaldia.com",
  whatsappNumber: "18090000000",
  whatsappDisplay: "+1 809 000 0000",
  whatsappMessage: "Hola, quiero solicitar una planificación docente.",
};
```

Usa el número de WhatsApp en formato internacional, sin espacios, signos ni guiones. Por ejemplo: `18091234567`.

## Cómo publicar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub.
2. Entra a **Settings** del repositorio.
3. Abre **Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama principal, normalmente `main`, y la carpeta `/root`.
6. Guarda los cambios y espera a que GitHub genere la URL pública.

## Cómo cambiar textos, servicios y planes

- Para editar títulos, secciones, preguntas frecuentes o testimonios, modifica `index.html`.
- Para cambiar colores, tamaños, espaciado o comportamiento responsive, modifica `styles.css`.
- Para ajustar el mensaje de WhatsApp, correo o comportamiento del formulario, modifica `script.js`.
- Para agregar o quitar servicios, duplica o elimina tarjetas dentro de la sección `#servicios`.
- Para agregar o quitar planes, edita las tarjetas dentro de la sección `#planes`.

## Nota importante

No uses logos oficiales ni presentes el sitio como un servicio oficial. La página debe mantenerse como un servicio independiente de apoyo docente.

Texto legal recomendado:

> Servicio independiente de apoyo docente. No representa ni sustituye documentos oficiales del ministerio. Las planificaciones deben ser revisadas, adaptadas y contextualizadas por cada docente según las necesidades de su grupo.
