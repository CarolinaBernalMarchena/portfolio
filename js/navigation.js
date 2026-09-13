/* ============================================
   navigation.js
   Navegación auxiliar en forma de "pestañas de
   libreta" fija arriba, para quien prefiera no
   arrastrar las notas del escritorio.
   ============================================ */

(function () {
  function initTabNavigation() {
    const links = document.querySelectorAll(".tabs__link");

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initTabNavigation);
})();
