// Shared interactions for every page. Each block only runs if its elements exist.

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- phone menu toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.querySelector(".nav-toggle-label").textContent = open ? "Menu" : "Close";
      links.classList.toggle("is-open", !open);
    });
  }

  /* ---------- quality cards: always open on desktop, collapsible on phone ---------- */
  const qualities = document.querySelectorAll(".quality");
  if (qualities.length) {
    const desktop = window.matchMedia("(min-width: 861px)");
    const sync = () => { if (desktop.matches) qualities.forEach((q) => (q.open = true)); };
    sync();
    desktop.addEventListener("change", sync);
    qualities.forEach((q) => q.querySelector("summary").addEventListener("click", (e) => {
      if (desktop.matches) e.preventDefault();
    }));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- dialogs: open, close, click backdrop ---------- */
  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => document.getElementById(btn.dataset.open)?.showModal());
  });
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dlg.close()));
  });

  /* ---------- certificate lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const img = lightbox.querySelector(".lightbox-img");
    const title = lightbox.querySelector("#lightbox-title");
    const caption = lightbox.querySelector(".lightbox-caption");
    document.querySelectorAll("[data-lightbox]").forEach((btn) => {
      btn.addEventListener("click", () => {
        img.src = btn.dataset.lightbox;
        img.alt = btn.dataset.title;
        title.textContent = btn.dataset.title;
        caption.textContent = btn.dataset.caption || "";
        lightbox.showModal();
      });
    });
  }

  /* ---------- project gallery: thumbnail swaps main image ---------- */
  document.querySelectorAll(".gallery").forEach((g) => {
    const main = g.querySelector(".gallery-main");
    const thumbs = g.querySelectorAll(".gallery-thumbs button");
    thumbs.forEach((t) => {
      t.addEventListener("click", () => {
        const img = t.querySelector("img");
        main.src = img.src;
        main.alt = img.alt;
        thumbs.forEach((x) => x.setAttribute("aria-current", String(x === t)));
      });
    });
  });

  /* ---------- works filter with result count ---------- */
  const chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    const cards = document.querySelectorAll(".work-card");
    const count = document.getElementById("result-count");
    const empty = document.getElementById("empty-state");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const f = chip.dataset.filter;
        chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        let shown = 0;
        cards.forEach((card) => {
          const match = f === "all" || card.dataset.category.split(" ").includes(f);
          card.hidden = !match;
          if (match) shown++;
        });
        count.textContent = `Showing ${shown} of ${cards.length} projects` + (f === "all" ? "" : ` in “${chip.textContent.trim()}”`);
        empty.hidden = shown !== 0;
      });
    });
  }

  /* ---------- contact form validation (mock: sends nothing) ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    const submit = form.querySelector("button[type=submit]");
    const success = document.getElementById("form-success");
    const msg = form.elements.message;
    const counter = document.getElementById("message-count");
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const rules = {
      name: (v) => v.trim().length >= 2 || "Please enter your name (at least 2 characters).",
      email: (v) => (!v.trim() ? "Please enter your email address." : EMAIL.test(v.trim()) || "Email looks incomplete. Use the format name@example.com."),
      subject: (v) => v !== "" || "Please choose what this message is about.",
      message: (v) => v.trim().length >= 10 || `Message is too short (${v.trim().length}/10 characters minimum).`,
    };

    const check = (field, show) => {
      const result = rules[field.name](field.value);
      const ok = result === true;
      const wrap = field.closest(".field");
      if (show) {
        wrap.classList.toggle("invalid", !ok);
        wrap.classList.toggle("valid", ok);
        field.setAttribute("aria-invalid", String(!ok));
        wrap.querySelector(".error-text").textContent = ok ? "" : result;
      }
      return ok;
    };
    const fields = Object.keys(rules).map((n) => form.elements[n]);
    const refresh = () => (submit.disabled = !fields.every((f) => check(f, false)));

    fields.forEach((f) => {
      f.addEventListener("blur", () => { if (f.value) check(f, true); });
      f.addEventListener("input", () => {
        if (f.closest(".field").classList.contains("invalid") || f.closest(".field").classList.contains("valid")) check(f, true);
        refresh();
      });
      f.addEventListener("change", refresh);
    });
    msg.addEventListener("input", () => (counter.textContent = `${msg.value.trim().length} / 10 minimum`));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!fields.every((f) => check(f, true))) return;
      success.hidden = false;
      success.querySelector("[data-name]").textContent = form.elements.name.value.trim();
      form.reset();
      fields.forEach((f) => f.closest(".field").classList.remove("valid", "invalid"));
      counter.textContent = "0 / 10 minimum";
      refresh();
      success.focus();
    });
    refresh();
  }
});
