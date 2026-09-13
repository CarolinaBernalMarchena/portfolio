/* ============================================
   draggable.js
   Convierte las notas del escritorio en elementos
   arrastrables (ratón y táctil). Si el usuario suelta
   la nota sin haberla movido apenas, se interpreta
   como un clic y se navega a la sección enlazada.
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
      // En móvil las notas están en flujo normal (no absolutas); no arrastramos ahí.
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

  function initDraggableNotes() {
    document.querySelectorAll(".note").forEach(makeDraggable);
  }

  document.addEventListener("DOMContentLoaded", initDraggableNotes);
})();
