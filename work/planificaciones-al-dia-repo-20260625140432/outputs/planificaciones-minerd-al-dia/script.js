const CONTACT_CONFIG = {
  email: "contacto@ejemplo.com",
  whatsappNumber: "18095551234",
  whatsappDisplay: "+1 809 555 1234",
  whatsappMessage: "Hola, quiero solicitar una planificación docente."
};

const selectors = {
  navToggle: ".nav-toggle",
  navMenu: "#primary-menu",
  navLinks: ".nav-menu a",
  form: "#contact-form",
  formStatus: "#form-status",
  whatsappFloat: "#whatsapp-float",
  emailLinks: ["#contact-email-link", "#footer-email-link"],
  whatsappLinks: ["#contact-whatsapp-link", "#footer-whatsapp-link"]
};

const getWhatsAppUrl = (message = CONTACT_CONFIG.whatsappMessage) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedMessage}`;
};

const setContactLinks = () => {
  selectors.emailLinks.forEach((selector) => {
    const link = document.querySelector(selector);
    if (!link) return;
    link.textContent = CONTACT_CONFIG.email;
    link.href = `mailto:${CONTACT_CONFIG.email}`;
  });

  selectors.whatsappLinks.forEach((selector) => {
    const link = document.querySelector(selector);
    if (!link) return;
    link.textContent = CONTACT_CONFIG.whatsappDisplay;
    link.href = getWhatsAppUrl();
  });

  const floatButton = document.querySelector(selectors.whatsappFloat);
  if (floatButton) {
    floatButton.href = getWhatsAppUrl();
  }
};

const setupMobileMenu = () => {
  const toggle = document.querySelector(selectors.navToggle);
  const menu = document.querySelector(selectors.navMenu);
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    menu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    menu.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll(selectors.navLinks).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
};

const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });
};

const validators = {
  name: (value) => value.trim().length >= 2 || "Escribe tu nombre.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Escribe un correo válido.",
  area: (value) => value.trim() !== "" || "Selecciona el área.",
  grade: (value) => value.trim().length >= 2 || "Indica el grado.",
  "plan-type": (value) => value.trim() !== "" || "Selecciona el tipo de planificación.",
  message: (value) => value.trim().length >= 10 || "Agrega un mensaje con al menos 10 caracteres."
};

const setFieldError = (field, message = "") => {
  const row = field.closest(".form-row");
  const error = row ? row.querySelector(".field-error") : null;

  if (!row || !error) return;

  row.classList.toggle("has-error", Boolean(message));
  error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
};

const validateField = (field) => {
  const validator = validators[field.name];
  if (!validator) return true;

  const result = validator(field.value);
  const isValid = result === true;
  setFieldError(field, isValid ? "" : result);
  return isValid;
};

const buildRequestMessage = (form) => {
  const data = new FormData(form);
  return [
    CONTACT_CONFIG.whatsappMessage,
    "",
    `Nombre: ${data.get("name")}`,
    `Correo: ${data.get("email")}`,
    `Área: ${data.get("area")}`,
    `Grado: ${data.get("grade")}`,
    `Tipo de planificación: ${data.get("plan-type")}`,
    `Mensaje: ${data.get("message")}`
  ].join("\n");
};

const setupContactForm = () => {
  const form = document.querySelector(selectors.form);
  const status = document.querySelector(selectors.formStatus);
  if (!form || !status) return;

  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const validationResults = fields.map(validateField);
    const isValid = validationResults.every(Boolean);
    if (!isValid) {
      status.textContent = "Revisa los campos marcados antes de preparar la solicitud.";
      const firstInvalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const requestMessage = buildRequestMessage(form);
    const whatsappUrl = getWhatsAppUrl(requestMessage);
    const emailSubject = encodeURIComponent("Solicitud de planificación docente");
    const emailBody = encodeURIComponent(requestMessage);
    const mailtoUrl = `mailto:${CONTACT_CONFIG.email}?subject=${emailSubject}&body=${emailBody}`;

    status.innerHTML = `Solicitud preparada. Puedes enviarla por <a href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a> o por <a href="${mailtoUrl}">correo</a>.`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setContactLinks();
  setupMobileMenu();
  setupSmoothScroll();
  setupContactForm();
});
