# Plantilla — Administración de consorcios

Landing page estática (HTML/CSS/JS puro, sin build). Pensada para editar en VS Code y publicar en GitHub Pages.

## 1. Personalizar el contenido

Buscá `TODO-EDITAR` en `index.html` y `script.js` (Ctrl+F / Cmd+F) para encontrar todo lo que hay que completar:

- Nombre de la empresa: reemplazá `[Nombre de tu Empresa]` en todo `index.html` (título, header, footer, sección "Sobre la empresa").
- Número de WhatsApp: en `index.html` hay dos links `https://wa.me/5491100000000?...`. Reemplazá `5491100000000` por tu número real, en formato `549` + código de área sin el 0 + número sin el 15 (ej. `5491122334455`).
- Datos de contacto: teléfono, email y dirección en la sección de Contacto.
- Estadísticas de ejemplo (`[XX]`) en "Sobre la empresa".
- Testimonios: son de ejemplo, reemplazalos por comentarios reales de tus consorcios en cuanto los tengas.

## 2. Activar el formulario de contacto

GitHub Pages solo sirve archivos estáticos: no ejecuta código de servidor, así que el `<form>` no puede procesar el envío por sí solo. La forma más simple de resolverlo sin backend propio:

1. Creá una cuenta gratis en [formspree.io](https://formspree.io) (o [web3forms.com](https://web3forms.com), [getform.io](https://getform.io)).
2. Generá un formulario nuevo y copiá el endpoint que te dan (algo como `https://formspree.io/f/abc12345`).
3. Pegalo en `script.js`, en la constante `FORM_ENDPOINT`, reemplazando `https://formspree.io/f/TU_ID_DE_FORMULARIO`.

Hasta que hagas ese paso, el formulario va a avisar en pantalla que falta configurarlo (no falla en silencio). El botón de WhatsApp funciona directo, sin ningún servicio adicional.

## 3. Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (público, o privado si tenés plan que lo permita) y subí estos 4 archivos (`index.html`, `style.css`, `script.js`, este `README.md`) a la raíz del repo.
   - Desde VS Code: `Source Control` → `Publish to GitHub`, o por terminal:
     ```bash
     git init
     git add .
     git commit -m "Landing page inicial"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
     git push -u origin main
     ```
2. En GitHub, andá a **Settings → Pages**.
3. En **Build and deployment → Source**, elegí **Deploy from a branch**.
4. En **Branch**, elegí `main` y la carpeta `/ (root)`. Guardá.
5. Esperá uno o dos minutos: GitHub te va a dar la URL pública, con este formato:
   `https://TU_USUARIO.github.io/TU_REPO/`

Cada vez que hagas `git push` con cambios, el sitio se actualiza solo en esa URL (puede tardar un minuto).

## 4. Dominio propio (opcional)

Si más adelante comprás un dominio (ej. `tuempresa.com.ar`):

1. En el repo, creá un archivo `CNAME` (sin extensión) con una sola línea: `tuempresa.com.ar`.
2. En el panel DNS de donde registraste el dominio, agregá un registro `CNAME` apuntando a `TU_USUARIO.github.io`.
3. En **Settings → Pages**, escribí el dominio en el campo "Custom domain" y activá "Enforce HTTPS" cuando esté disponible.

## 5. Diseño, colores y fotos

Los colores están centralizados en `style.css`, dentro de `:root` (arriba del todo):

```
--evergreen (verde petróleo, color principal), --brass (bronce, acento), --stone (fondo piedra)
```

Tipografías (Google Fonts): **Cormorant Garamond** para títulos y **Manrope** para textos.

Las fotos de edificios (hero, "Cómo trabajamos", "Servicios", "La empresa" y "Contacto") vienen de
[Unsplash](https://unsplash.com/license), de uso libre y gratuito, y se cargan directo desde
`images.unsplash.com`. Si preferís tenerlas dentro del repo, descargá cada una (las URLs están en
`index.html`), guardalas en `img/` y cambiá el `src` por la ruta local (por ejemplo `img/hero.jpg`).

Las fotos de las noticias siguen estando en `img/`.

## Estructura de archivos

```
index.html  → contenido y estructura de las secciones
style.css   → paleta, tipografía y layout responsive
script.js   → menú móvil, encabezado al hacer scroll, animaciones, año del footer, formulario
img/        → fotos de las noticias
README.md   → este archivo
```

No hay dependencias que instalar ni paso de build: abrir `index.html` en el navegador ya muestra el sitio completo.
