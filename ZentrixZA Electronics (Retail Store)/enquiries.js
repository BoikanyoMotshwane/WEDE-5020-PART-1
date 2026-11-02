
"use strict";

// ZentrixZA Electronics: enquiries page validation and on-page responses.
// This file is designed for the IDs and classes in Enquiries(1).html.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.form-card");
  if (!form) return;

  const fields = {
    type: document.getElementById("enquiry-type"),
    name: document.getElementById("customer-name"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    product: document.getElementById("product-name"),
    serial: document.getElementById("serial"),
    description: document.getElementById("description")
  };
  if (Object.values(fields).some(element => !element)) return;

  // Existing HTML radio inputs have no names or values. Configure them here.
  const radios = [...form.querySelectorAll(".radio-group input[type='radio']")];
  const methods = ["Email", "Phone", "SMS", "WhatsApp"];
  radios.forEach((radio, index) => {
    if (index < methods.length) {
      radio.name = "communication-preference";
      radio.value = methods[index];
      radio.required = index === 0;
    } else {
      // The fifth radio has no label in the HTML; it should not be selectable.
      radio.disabled = true;
      radio.hidden = true;
    }
  });

  // Place a visible message panel after the form without changing the HTML file.
  const responsePanel = document.createElement("div");
  responsePanel.id = "enquiry-response";
  responsePanel.setAttribute("role", "status");
  responsePanel.setAttribute("aria-live", "polite");
  responsePanel.style.cssText = "margin:18px auto;padding:16px;max-width:700px;border-radius:8px;display:none;white-space:pre-line;line-height:1.6";
  form.insertAdjacentElement("afterend", responsePanel);

  function showResponse(message, isError = false) {
    responsePanel.textContent = message; // Safe: never interpret user input as HTML.
    responsePanel.style.display = "block";
    responsePanel.style.backgroundColor = isError ? "#fff0f0" : "#edf8f0";
    responsePanel.style.border = `1px solid ${isError ? "#b42318" : "#287a45"}`;
    responsePanel.style.color = isError ? "#8f1d18" : "#205a34";
  }

  function clearValidation() {
    Object.values(fields).forEach(field => {
      field.removeAttribute("aria-invalid");
      field.style.borderColor = "";
      field.setCustomValidity("");
    });
  }

  function invalid(field, message) {
    field.setAttribute("aria-invalid", "true");
    field.style.borderColor = "#b42318";
    field.setCustomValidity(message);
    return { field, message };
  }

  function validate() {
    clearValidation();
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const phone = fields.phone.value.trim();
    const type = fields.type.value.trim();
    const product = fields.product.value.trim();
    const serial = fields.serial.value.trim();
    const description = fields.description.value.trim();
    const method = radios.find(radio => radio.checked && !radio.disabled)?.value;
    const errors = [];
    const add = (field, message) => errors.push(invalid(field, message));

    if (!/^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u.test(name))
      add(fields.name, "Enter a valid customer name (2–80 characters). ");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      add(fields.email, "Enter a valid email address.");

    // Accept 0XXXXXXXXX, +27XXXXXXXXX, or 27XXXXXXXXX (spaces/hyphens allowed).
    const digits = phone.replace(/[\s()-]/g, "");
    if (phone && !/^(?:0\d{9}|\+27\d{9}|27\d{9})$/.test(digits))
      add(fields.phone, "Enter a valid South African phone number.");

    if (!email && !phone)
      add(fields.email, "Provide an email address or phone number.");

    if (!method)
      errors.push({
        field: radios[0] || fields.email,
        message: "Choose a communication preference."
      });

    if (method === "Email" && !email)
      add(fields.email, "Email is required for email communication.");

    if (["Phone", "SMS", "WhatsApp"].includes(method) && !phone)
      add(fields.phone, `Phone number is required for ${method} communication.`);

    if (!methods.length || ![
      "General Enquiry",
      "Product Information Enquiry",
      "Product Repair Request",
      "Purchase Request",
      "Financing Products"
    ].includes(type))
      add(fields.type, "Select a valid enquiry type.");

    if (type !== "General Enquiry" && product.length < 2)
      add(fields.product, "Enter the product name (at least 2 characters).");

    if (product.length > 120)
      add(fields.product, "Product name is too long.");

    if (serial.length > 100)
      add(fields.serial, "Serial number must be 100 characters or fewer.");

    if (description.length > 2000)
      add(fields.description, "Description must be 2000 characters or fewer.");

    if (["General Enquiry", "Product Repair Request"].includes(type) &&
        description.length < 10)
      add(fields.description,
        "Describe your enquiry or repair issue in at least 10 characters.");

    return {
      errors, name, email, phone, type,
      product, serial, description, method
    };
  }

  // Respond according to the selected enquiry. Prices/stock are not invented.
  function buildResponse(data) {
    const greeting = `Thank you, ${data.name}.`;
    const contact = `Preferred contact method: ${data.method}.`;
    const product = data.product ? `Product: ${data.product}.\n` : "";

    const messages = {
      "General Enquiry":
        "Your general enquiry has been checked and is ready for the ZentrixZA Electronics team to review.",

      "Product Information Enquiry":
        "Product information requested. Current specifications, pricing and availability need confirmation from ZentrixZA Electronics.",

      "Product Repair Request":
        "Repair request prepared. The repair cost and turnaround time depend on inspection, parts and technician availability. A confirmed quotation is not yet available.",

      "Purchase Request":
        "Purchase request prepared. Final price, stock availability, delivery and payment arrangements must be confirmed before purchase.",

      "Financing Products":
        "Financing enquiry prepared. Deposit, instalments, repayment terms and eligibility require confirmation from the financing provider. No financing approval has been issued."
    };

    return `${greeting}\n\n${product}${messages[data.type]}\n\n${contact}\n\nThis is an on-page acknowledgement only. Your enquiry has NOT been sent to the business.`;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const data = validate();

    if (data.errors.length) {
      showResponse(
        "Please correct the following:\n• " +
        data.errors.map(e => e.message.trim()).join("\n• "),
        true
      );

      data.errors[0].field?.focus();
      return;
    }

    showResponse(buildResponse(data));
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      clearValidation();
      responsePanel.style.display = "none";
      responsePanel.textContent = "";
    }, 0);
  });

  // Optional prefill from Products.html links.
  // Example: Enquiries.html?product=Laptop
  const selectedProduct =
    new URLSearchParams(window.location.search).get("product");

  if (selectedProduct) {
    fields.product.value = selectedProduct.slice(0, 120);
    fields.type.value = "Product Information Enquiry";
  }

  
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);

    const product = params.get("product");
    const price = Number(params.get("price"));

    const display = document.getElementById("selectedProductDetails");

    if (display && product && Number.isFinite(price) && price >= 0) {
        display.textContent =
            "Selected Product: " + product +
            " | Price: R" + price.toFixed(2);
    }
});

});

