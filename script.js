/* ============================================================
   Soluciones PH — script.js
   Todo el código corre en el navegador (GitHub Pages solo sirve
   archivos estáticos, no ejecuta backend). El formulario de
   contacto usa Formspree como servicio externo para recibir los
   envíos: ver la constante FORM_ENDPOINT más abajo.
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
  // Endpoint real de Formspree ya configurado.
  var FORM_ENDPOINT = "https://formspree.io/f/mzebygzz";

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
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
            status.textContent = "Gracias, recibimos tu consulta. Te vamos a responder a la brevedad.";
            form.reset();
          } else {
            status.dataset.state = "error";
            status.textContent = "No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.";
          }
        })
        .catch(function () {
          status.dataset.state = "error";
          status.textContent = "No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
})();
