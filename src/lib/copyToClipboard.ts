export function copyWithTooltip(text: string, event: React.MouseEvent) {
  navigator.clipboard.writeText(text);

  const el = document.createElement("div");
  el.textContent = "Скопировано";
  el.style.cssText = `
    position: fixed;
    left: ${event.clientX}px;
    top: ${event.clientY - 32}px;
    background: #333;
    color: #fff;
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 8px;
    pointer-events: none;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s, transform 0.4s;
    transform: translateY(0);
  `;
  document.body.appendChild(el);

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";
  }, 800);

  setTimeout(() => el.remove(), 1300);
}
