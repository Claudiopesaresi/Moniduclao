/* ============================================================
   Soluciones PH — script.js
   Todo el código corre en el navegador (GitHub Pages solo sirve
   archivos estáticos, no ejecuta backend). El formulario de
   contacto envía los datos a un script propio de Google Apps Script,
   que manda el mail desde tu Gmail: ver FORM_ENDPOINT más abajo.
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* --------- Encabezado que cambia al hacer scroll --------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --------- Aparición suave de las secciones --------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --------- Menú móvil --------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* --------- Año dinámico en el footer --------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* --------- Formulario de contacto --------- */
  // TODO-EDITAR: pegá acá la URL de tu aplicación web de Google Apps Script
  // (Implementar → Nueva implementación → Aplicación web). Termina en /exec.
  var FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwYuQCZRqCI0rpxRPKW5V-21nZeauDQoooM5V4-07hcRVIwtXTlsHO4vDq1W6FN-NwnGg/exec";

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function showStatus(state, text) {
    status.dataset.state = state;
    status.textContent = text;
  }

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (FORM_ENDPOINT.indexOf("PEGAR_ID_AQUI") !== -1) {
        showStatus("error", "El formulario todavía no está configurado. Escribinos por WhatsApp.");
        console.error("Falta configurar FORM_ENDPOINT en script.js con la URL /exec de Google Apps Script.");
        return;
      }

      // CAPTCHA: Turnstile agrega al formulario el campo "cf-turnstile-response"
      var captchaField = form.querySelector('[name="cf-turnstile-response"]');
      if (!captchaField || !captchaField.value) {
        showStatus("error", "Por favor, completá la verificación de seguridad antes de enviar.");
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      showStatus("", "");

      // URLSearchParams = envío "simple" (sin preflight CORS), compatible con Apps Script.
      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data && data.ok) {
            showStatus("ok", "Gracias, recibimos tu consulta. Te vamos a responder a la brevedad.");
            form.reset();
          } else {
            var detail = (data && data.error) || "error desconocido";
            console.error("Apps Script rechazó el envío:", detail, data);
            showStatus("error", "No pudimos enviar el formulario (" + detail + "). Probá de nuevo o escribinos por WhatsApp.");
          }
        })
        .catch(function (err) {
          console.error("Error de red al enviar el formulario:", err);
          showStatus("error", "No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.");
        })
        .finally(function () {
          // Cada verificación sirve para un solo envío: la renovamos
          if (window.turnstile) window.turnstile.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
})();
