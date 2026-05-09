const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-enquiry-form]");
const status = document.querySelector("[data-form-status]");

const contactEmail = "renuka.bansal@example.com";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const subject = `SMARTBIO tutoring enquiry from ${formData.get("name") || "a parent/student"}`;
    const message = [
      "Hello Renuka,",
      "",
      "I would like to enquire about Biology tutoring.",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Level: ${formData.get("level") || ""}`,
      `Exam board: ${formData.get("examBoard") || ""}`,
      "",
      "Message:",
      `${formData.get("message") || ""}`
    ].join("\n");

    const mailto = new URL(`mailto:${contactEmail}`);
    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", message);

    status.textContent = "Opening your email app with the enquiry details.";
    window.location.href = mailto.toString();
  });
}
