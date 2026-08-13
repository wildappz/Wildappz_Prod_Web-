const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/* WAITLIST FORM */
const waitlistForm = document.getElementById("waitlistForm");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const msg = document.getElementById("message");
    const email = emailInput.value.trim();

    msg.innerHTML = "";
    msg.style.color = "";

    /* Validation */
    if (!email) {
      msg.innerHTML = "Please enter your email";
      msg.style.color = "red";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      msg.innerHTML = "Please enter a valid email";
      msg.style.color = "red";
      return;
    }

    const formData = new FormData(waitlistForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      msg.innerHTML = "Submitting...";
      msg.style.color = "#0057C8";

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await res.json();

      if (data.success) {
        msg.innerHTML = "You're on the Tapin waitlist 🚀";
        msg.style.color = "green";
        waitlistForm.reset();
      } else {
        msg.innerHTML = data.message || "Something went wrong";
        msg.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      msg.innerHTML = "Server error. Try again.";
      msg.style.color = "red";
    }
  });
}

/* CONTACT FORM */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const messageText = document.getElementById("messageText").value.trim();

    const msg = document.getElementById("contactMessage");

    msg.innerHTML = "";
    msg.style.color = "";

    /* Validation */
    if (!name || !email || !messageText) {
      msg.innerHTML = "Please fill all required fields";
      msg.style.color = "red";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      msg.innerHTML = "Please enter valid email";
      msg.style.color = "red";
      return;
    }

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      msg.innerHTML = "Sending...";
      msg.style.color = "#0057C8";

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await res.json();

      if (data.success) {
        msg.innerHTML = "Message sent successfully, We will contact you soon.";
        msg.style.color = "green";
        contactForm.reset();
      } else {
        msg.innerHTML = data.message || "Failed to send message";
        msg.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      msg.innerHTML = "Server error. Try again.";
      msg.style.color = "red";
    }
  });
}