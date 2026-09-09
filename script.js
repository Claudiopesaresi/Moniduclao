/* ============================================================
   [Nombre de tu Empresa] — script.js
   Todo el código corre en el navegador (GitHub Pages solo sirve
   archivos estáticos, no ejecuta backend). El formulario de
   contacto necesita un servicio externo gratuito para recibir
   los envíos: ver la constante FORM_ENDPOINT más abajo y el
   README.md para las instrucciones de alta.
   ============================================================ */

(function () {
  "use strict";

  /* --------- Menú móvil --------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------- Año dinámico en el footer --------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* --------- Formulario de contacto --------- */
  // TODO-EDITAR: creá una cuenta gratis en https://formspree.io (o
  // https://web3forms.com / https://getform.io), obtené tu endpoint
  // propio y pegalo acá abajo. Sin este paso el formulario no va a
  // poder enviar nada, porque GitHub Pages no tiene backend propio.
  var FORM_ENDPOINT = "https://api.web3forms.com/";

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (FORM_ENDPOINT.indexOf("c278f382-6e8f-43a1-b8bd-0a24d9119bf6") !== -1) {
        status.dataset.state = "error";
        status.textContent =
          "Falta configurar el formulario: completá FORM_ENDPOINT -x01- en script.js con tu endpoint de Formspree/Web3Forms.>>>" + status.textContent;
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      status.dataset.state = "";
      status.textContent = "";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            status.dataset.state = "ok";
            status.textContent = "Gracias, recibimos tu consulta. Te vamos a responder a la brevedad.>>" + response;
            form.reset();
          } else {
            status.dataset.state = "error";
            status.textContent = "-x02- No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.>>" + response;
          }
        })
        .catch(function () {
          status.dataset.state = "error";
          status.textContent = "-x03- No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.>>" + response;
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
})();
