const CONTACT = {
  email: "contacto@planificacionaldia.com",
  whatsappNumber: "18090000000",
  whatsappDisplay: "+1 809 000 0000",
  whatsappMessage: "Hola, quiero solicitar una planificación docente.",
};

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const whatsappFloat = document.querySelector("#whatsapp-float");
const footerEmail = document.querySelector("#footer-email");
const footerWhatsapp = document.querySelector("#footer-whatsapp");
const form = document.querySelector("#request-form");
const feedback = document.querySelector("#form-feedback");
const exampleButton = document.querySelector("[data-prefill-example]");

function buildWhatsappUrl(message = CONTACT.whatsappMessage) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodedMessage}`;
}

function updateContactLinks() {
  const whatsappUrl = buildWhatsappUrl();

  if (whatsappFloat) {
    whatsappFloat.href = whatsappUrl;
  }

  if (footerEmail) {
    footerEmail.href = `mailto:${CONTACT.email}`;
    footerEmail.textContent = CONTACT.email;
  }

  if (footerWhatsapp) {
    footerWhatsapp.href = whatsappUrl;
    footerWhatsapp.textContent = `WhatsApp: ${CONTACT.whatsappDisplay}`;
  }
}

function closeMobileMenu() {
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Abrir menú");
  navMenu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  const isOpen = navToggle?.getAttribute("aria-expanded") === "true";
  navToggle?.setAttribute("aria-expanded", String(!isOpen));
  navToggle?.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navMenu?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
}

function clearFieldErrors() {
  form?.querySelectorAll(".is-invalid").forEach((field) => {
    field.classList.remove("is-invalid");
  });
}

function setFeedback(message, type = "error") {
  if (!feedback) return;

  feedback.textContent = message;
  feedback.classList.toggle("success", type === "success");
}

function getFormData() {
  const fields = form.elements;

  return {
    name: fields.name.value.trim(),
    email: fields.email.value.trim(),
    area: fields.area.value.trim(),
    grade: fields.grade.value.trim(),
    planningType: fields.planningType.value.trim(),
    message: fields.message.value.trim(),
  };
}

function markInvalid(fieldName) {
  const field = form?.elements[fieldName];
  field?.classList.add("is-invalid");
}

function validateForm(data) {
  const requiredFields = ["name", "email", "area", "grade", "planningType", "message"];
  const missingField = requiredFields.find((field) => !data[field]);

  if (missingField) {
    markInvalid(missingField);
    return "Completa todos los campos para preparar tu solicitud.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    markInvalid("email");
    return "Escribe un correo valido para poder responderte.";
  }

  return "";
}

function buildRequestMessage(data) {
  return [
    "Hola, quiero solicitar una planificación docente.",
    "",
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `Área: ${data.area}`,
    `Grado: ${data.grade}`,
    `Tipo de planificación: ${data.planningType}`,
    `Mensaje: ${data.message}`,
  ].join("\n");
}

function handleSubmit(event) {
  event.preventDefault();
  clearFieldErrors();

  const data = getFormData();
  const error = validateForm(data);

  if (error) {
    setFeedback(error);
    return;
  }

  const requestMessage = buildRequestMessage(data);
  const subject = encodeURIComponent("Solicitud de planificación docente");
  const body = encodeURIComponent(requestMessage);
  const mailtoUrl = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

  setFeedback(
    "Solicitud preparada. Puedes enviarla por correo o continuar por WhatsApp.",
    "success"
  );

  window.location.href = mailtoUrl;
  window.open(buildWhatsappUrl(requestMessage), "_blank", "noopener");
}

function prefillExampleRequest() {
  const message = document.querySelector("#message");
  const area = document.querySelector("#area");
  const grade = document.querySelector("#grade");
  const planningType = document.querySelector("#planning-type");

  if (area) area.value = "Matemática";
  if (grade) grade.value = "1.er grado de secundaria";
  if (planningType) planningType.value = "Secuencia didáctica completa";
  if (message) {
    message.value =
      "Quiero solicitar un ejemplo de planificación para Matemática, 1.er grado de secundaria, sobre diseño de tanques prismáticos.";
  }

  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
  setFeedback("Ejemplo seleccionado. Completa tu nombre y correo para continuar.", "success");
}

navToggle?.addEventListener("click", toggleMobileMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
form?.addEventListener("submit", handleSubmit);
exampleButton?.addEventListener("click", prefillExampleRequest);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

updateContactLinks();
