/* ============================================
   book.js
   Abre/cierra el modal del "libro" y controla el
   avance entre sus páginas (flechas, puntos y teclado).
   ============================================ */

(function () {
  function initBook() {
    const overlay = document.getElementById("book-overlay");
    if (!overlay) return;

    const pages = Array.from(overlay.querySelectorAll(".book__page"));
    const dots = Array.from(overlay.querySelectorAll(".book__dot"));
    const prevBtn = overlay.querySelector("[data-book-prev]");
    const nextBtn = overlay.querySelector("[data-book-next]");
    const closeBtn = overlay.querySelector("[data-book-close]");
    const triggers = document.querySelectorAll("[data-book-trigger]");

    let currentIndex = 0;
    let lastFocusedElement = null;

    function showPage(index) {
      currentIndex = (index + pages.length) % pages.length;

      pages.forEach((page, i) => {
        page.classList.toggle("is-active", i === currentIndex);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }

    function openBook(event) {
      lastFocusedElement = event ? event.currentTarget : document.activeElement;
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      showPage(0);
      closeBtn.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeBook() {
      overlay.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        closeBook();
      } else if (event.key === "ArrowRight") {
        showPage(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        showPage(currentIndex - 1);
      }
    }

    triggers.forEach((trigger) => trigger.addEventListener("click", openBook));
    closeBtn.addEventListener("click", closeBook);
    prevBtn.addEventListener("click", () => showPage(currentIndex - 1));
    nextBtn.addEventListener("click", () => showPage(currentIndex + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showPage(i)));

    // Cerrar al hacer clic fuera del libro (sobre el fondo oscurecido).
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeBook();
    });
  }

  document.addEventListener("DOMContentLoaded", initBook);
})();
