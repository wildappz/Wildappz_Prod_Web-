
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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      msg.innerHTML = "Please enter a valid email";
      msg.style.color = "red";
      return;
    }

    try {
      msg.innerHTML = "Submitting...";
      msg.style.color = "#0057C8";

      const res = await fetch("/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        msg.innerHTML = "You're on the Tapin waitlist 🚀";
        msg.style.color = "green";
        emailInput.value = "";
      } else {
        msg.innerHTML = "Something went wrong";
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
    const phone = document.getElementById("phone").value.trim();
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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      msg.innerHTML = "Please enter valid email";
      msg.style.color = "red";
      return;
    }

    try {
      msg.innerHTML = "Sending...";
      msg.style.color = "#0057C8";

      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: messageText
        })
      });

      const data = await res.json();

      if (data.success) {
        msg.innerHTML = "Message sent successfully,We will contact you soon.";
        msg.style.color = "green";
        contactForm.reset();
      } else {
        msg.innerHTML = "Failed to send message";
        msg.style.color = "red";
      }

    } catch (error) {
      console.error(error);
      msg.innerHTML = "Server error. Try again.";
      msg.style.color = "red";
    }
  });
}