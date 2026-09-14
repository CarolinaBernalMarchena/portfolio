/* ============================================
   cursor.js
   Corazoncito que sigue al puntero con un suave
   "lag" (interpolación) y se encoge un poco al
   pulsar. Se desactiva por completo en dispositivos
   táctiles o sin soporte de hover.
   ============================================ */

(function () {
  const supportsCustomCursor = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!supportsCustomCursor) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function initCursor() {
    document.documentElement.classList.add("has-custom-cursor");

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.innerHTML = '<img src="assets/svg/cursor-heart.svg" alt="" />';
    document.body.appendChild(dot);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let currentScale = 1;
    let targetScale = 1;
    const EASE = prefersReducedMotion ? 1 : 0.22;

    function onPointerMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.classList.add("is-visible");
    }

    function onPointerLeaveWindow() {
      dot.classList.remove("is-visible");
    }

    function onPointerDown() {
      targetScale = 0.6;
    }

    function onPointerUp() {
      targetScale = 1;
    }

    function tick() {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      currentScale += (targetScale - currentScale) * 0.35;
      dot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${currentScale})`;
      requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeaveWindow);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    requestAnimationFrame(tick);
  }

  document.addEventListener("DOMContentLoaded", initCursor);
})();
