/* ============================================
   draggable.js
   Convierte los elementos marcados con [data-draggable]
   (notas de navegación Y objetos decorativos) en
   elementos arrastrables (ratón y táctil).
   Si el elemento tiene data-target y se suelta sin
   apenas moverse, se interpreta como un clic y navega
   a la sección enlazada. Los objetos decorativos no
   llevan data-target, así que solo se arrastran.
   ============================================ */

(function () {
  const DRAG_THRESHOLD = 6; // px — por debajo de esto, cuenta como "clic"

  function makeDraggable(note) {
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    let moved = false;
    let pointerId = null;

    const board = note.closest(".desk__board");

    function onPointerDown(event) {
      // En móvil los elementos están en flujo normal (no absolutos); no arrastramos ahí.
      if (window.innerWidth <= 640) return;

      pointerId = event.pointerId;
      note.setPointerCapture(pointerId);

      const rect = note.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();

      originLeft = rect.left - boardRect.left;
      originTop = rect.top - boardRect.top;

      startX = event.clientX;
      startY = event.clientY;
      moved = false;

      note.classList.add("is-dragging");
      note.addEventListener("pointermove", onPointerMove);
      note.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        moved = true;
      }

      note.style.left = originLeft + dx + "px";
      note.style.top = originTop + dy + "px";
    }

    function onPointerUp() {
      note.classList.remove("is-dragging");
      note.removeEventListener("pointermove", onPointerMove);
      note.removeEventListener("pointerup", onPointerUp);

      if (!moved) {
        // Se trató como un clic: navega a la sección de destino.
        const targetSelector = note.getAttribute("data-target");
        const target = targetSelector && document.querySelector(targetSelector);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }

    note.addEventListener("pointerdown", onPointerDown);

    // Accesibilidad: activar con teclado (Enter/Espacio) navega directamente.
    note.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const targetSelector = note.getAttribute("data-target");
        const target = targetSelector && document.querySelector(targetSelector);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function initDraggableElements() {
    document.querySelectorAll("[data-draggable]").forEach(makeDraggable);
  }

  document.addEventListener("DOMContentLoaded", initDraggableElements);
})();
