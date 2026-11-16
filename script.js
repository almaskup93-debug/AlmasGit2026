const greeting = document.getElementById("greeting");
const helloButton = document.getElementById("hello");
const contactButton = document.getElementById("contact-button");
const contactForm = document.getElementById("contact-form");

function sayHello() {
  greeting.textContent = "Привет! Я Алмас. Рад видеть тебя в моём учебном портфолио!";
}

helloButton.addEventListener("click", sayHello);

contactButton.addEventListener("click", () => {
  contactForm.hidden = !contactForm.hidden;
  contactButton.setAttribute("aria-expanded", String(!contactForm.hidden));
  contactButton.textContent = contactForm.hidden
    ? "Показать учебную форму"
    : "Скрыть учебную форму";
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Новогодний след. Обычный курсор и элементы интерфейса сохраняются.
function initPixelTrail() {
  if (typeof Element.prototype.animate !== "function") return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const trail = document.createElement("div");
  trail.className = "pixel-trail";
  trail.setAttribute("aria-hidden", "true");
  document.body.append(trail);

  let lastSpawn = -Infinity;
  let colorIndex = 0;
  const colors = ["#ffdb70", "#ff667c", "#73e6a0"];

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || reducedMotion.matches) return;

    const now = performance.now();
    if (now - lastSpawn < 16) return;
    lastSpawn = now;

    // Снежинка и три маленькие праздничные искры сбоку от указателя.
    for (let index = 0; index < 4; index += 1) {
      if (trail.childElementCount >= 160) break;

      const pixel = document.createElement("span");
      const isSnowflake = index === 0;
      pixel.className = isSnowflake
        ? "pixel-trail__particle pixel-trail__snowflake"
        : "pixel-trail__particle";
      pixel.style.color = isSnowflake ? "#eefaff" : colors[colorIndex % colors.length];
      if (isSnowflake) pixel.textContent = "\u2744\uFE0E";
      colorIndex += 1;
      pixel.style.left = `${Math.round(event.clientX + 10 + (index % 2) * 6)}px`;
      pixel.style.top = `${Math.round(event.clientY + 10 + Math.floor(index / 2) * 6)}px`;
      trail.append(pixel);

      const animation = pixel.animate([
        { transform: "translate(0, 0) rotate(0deg) scale(1)", opacity: 0.8 },
        { transform: `translate(${(index - 1.5) * 10}px, 40px) rotate(${index % 2 === 0 ? -80 : 80}deg) scale(0.3)`, opacity: 0 }
      ], {
        duration: 680,
        easing: "steps(8, end)",
        fill: "forwards"
      });

      animation.finished.then(() => pixel.remove(), () => pixel.remove());
    }
  });

  const clearTrail = () => trail.replaceChildren();
  window.addEventListener("blur", clearTrail);
  document.documentElement.addEventListener("pointerleave", clearTrail);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTrail();
  });
  reducedMotion.addEventListener("change", clearTrail);
}

initPixelTrail();
