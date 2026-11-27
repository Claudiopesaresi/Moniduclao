# Plantilla — Administración de consorcios

Landing page estática (HTML/CSS/JS puro, sin build). Pensada para editar en VS Code y publicar en GitHub Pages.

## 1. Personalizar el contenido

Buscá `TODO-EDITAR` en `index.html` y `script.js` (Ctrl+F / Cmd+F) para encontrar todo lo que hay que completar:

- Nombre de la empresa: reemplazá `[Nombre de tu Empresa]` en todo `index.html` (título, header, footer, sección "Sobre la empresa").
- Número de WhatsApp: en `index.html` hay dos links `https://wa.me/5491100000000?...`. Reemplazá `5491100000000` por tu número real, en formato `549` + código de área sin el 0 + número sin el 15 (ej. `5491122334455`).
- Datos de contacto: teléfono, email y dirección en la sección de Contacto.
- Estadísticas de ejemplo (`[XX]`) en "Sobre la empresa".
- Testimonios: son de ejemplo, reemplazalos por comentarios reales de tus consorcios en cuanto los tengas.

## 2. Activar el formulario de contacto (Google Apps Script, gratis)

GitHub Pages solo sirve archivos estáticos: no puede enviar mails. El formulario manda los datos a un
script propio en Google Apps Script, que envía el mail desde tu cuenta de Gmail (sin servicios de
terceros, hasta 100 destinatarios por día con una cuenta de Gmail común).

1. Entrá a https://script.google.com con la cuenta de Gmail donde querés recibir las consultas → **Nuevo proyecto**.
2. Borrá el contenido y pegá el código del archivo `google-apps-script.gs` (viene junto con este sitio).
   Revisá la constante `DESTINO` (el mail donde llegan las consultas).
3. **Implementar → Nueva implementación** → engranaje → **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. **Implementar**, autorizá los permisos (si aparece "app no verificada": *Configuración avanzada → Ir a…*;
   es normal porque el script es tuyo).
5. Copiá la URL que termina en `/exec` y pegala en `script.js`, en la constante `FORM_ENDPOINT`
   (reemplazando `https://script.google.com/macros/s/PEGAR_ID_AQUI/exec`).
6. Subí los cambios y hacé un envío de prueba.

Si más adelante modificás el script: **Implementar → Gestionar implementaciones → ✏️ → Versión: nueva → Implementar**.
Así la URL `/exec` no cambia y no hay que tocar la página.

Si algo falla, el mensaje debajo del botón muestra el motivo, y también queda en la consola del navegador (F12).

### 2.b CAPTCHA (Cloudflare Turnstile, gratis)

Antes de enviar, el visitante tiene que pasar una verificación de seguridad. El script de Google la
valida con Cloudflare y, si no es válida, no manda el mail.

1. Entrá a tu panel de Cloudflare → **Turnstile** → **Add widget** (o *Agregar widget*).
2. Nombre: `Formulario web`. Hostname: `solucionesph.com.ar`. Modo: **Managed**.
3. Cloudflare te da dos claves:
   - **Site Key** → pegala en `index.html`, en `data-sitekey="..."` (reemplazando `1x00000000000000000000AA`).
   - **Secret Key** → pegala en el script de Google, en `TURNSTILE_SECRET` (reemplazando `1x0000000000000000000000000000000AA`),
     y volvé a implementar (Gestionar implementaciones → ✏️ → Versión: nueva).

Las claves que vienen puestas son las de **prueba** de Cloudflare: el formulario funciona, pero el captcha
siempre aprueba y muestra "Testing only". Sirven para probar; reemplazalas antes de dejarlo publicado.

Nota: al autorizar el script de Google te va a pedir también permiso para "conectarse a un servicio
externo" — es para consultar a Cloudflare si el captcha es válido.

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

La única foto decorativa es la de facturas y calculadora (sección "Cómo trabajamos"). Viene de
[Unsplash](https://unsplash.com/license), es de uso libre y gratuito, y se carga directo desde
`images.unsplash.com`. Si preferís tenerla dentro del repo, descargala (la URL está en `index.html`),
guardala en `img/` y cambiá el `src` por la ruta local (por ejemplo `img/facturas.jpg`).

Las fotos de las noticias siguen estando en `img/`.

## Estructura de archivos

```
index.html  → contenido y estructura de las secciones
style.css   → paleta, tipografía y layout responsive
script.js   → menú móvil, encabezado al hacer scroll, animaciones, año del footer, envío del formulario
img/        → fotos de las noticias
README.md   → este archivo
```

No hay dependencias que instalar ni paso de build: abrir `index.html` en el navegador ya muestra el sitio completo.
