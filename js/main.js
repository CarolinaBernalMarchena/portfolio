/* ============================================
   main.js
   Un único momento de animación orquestada: las notas
   "caen" en su sitio al cargar la página, en cascada.
   Respeta prefers-reduced-motion.
   ============================================ */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function playEntrance() {
    const notes = document.querySelectorAll(".note");

    if (prefersReducedMotion) {
      notes.forEach((note) => (note.style.opacity = 1));
      return;
    }

    notes.forEach((note, index) => {
      note.style.opacity = "0";
      note.style.transform += " translateY(-24px) scale(0.92)";
      note.style.transition = "none";

      setTimeout(() => {
        note.style.transition =
          "opacity 0.45s ease, transform 0.45s cubic-bezier(.34,1.56,.64,1)";
        note.style.opacity = "1";
        note.style.transform = note.style.transform.replace(
          " translateY(-24px) scale(0.92)",
          ""
        );
      }, 120 * index + 150);
    });
  }

  document.addEventListener("DOMContentLoaded", playEntrance);
})();
