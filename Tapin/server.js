require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const brevo = require("@getbrevo/brevo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* BREVO */
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API
);

/* WAITLIST */
app.post("/join-waitlist", async (req, res) => {
  try {
    const { email } = req.body;

    /* 1. ADMIN MAIL */
    await apiInstance.sendTransacEmail({
      sender: {
        name: "Tapin",
        email: process.env.ADMIN_EMAIL
      },
      to: [
        {
          email: process.env.ADMIN_EMAIL
        }
      ],
      subject: "🚀 New Tapin Signup",
      htmlContent: `
      <div style="font-family:Arial;padding:20px">
        <h2>New Waitlist Signup</h2>
        <p><b>User Email:</b> ${email}</p>
      </div>
      `
    });

    /* 2. USER MAIL */
    await apiInstance.sendTransacEmail({
      sender: {
        name: "Tapin Team",
        email: process.env.ADMIN_EMAIL
      },
      to: [
        {
          email: email
        }
      ],
      subject: "You're on Tapin Waitlist!!",
      htmlContent: `
    <div style="font-family:Arial;padding:30px;background:#f8fbff">
        
        <h1 style="color:#0057C8;">Welcome to Tapin 🚀</h1>

        <p>You're officially on our early access waitlist.</p>

        <p>
        Tapin helps founders, investors and ambitious professionals build meaningful connections before, during and after travel.
        </p>

        <hr>

        <p><b>Launching First in Hyderabad.</b></p>

        <p>We’ll notify you before launch.</p>

        <br>

        <p>— Tapin Team</p>

      </div>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

/* CONTACT */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await apiInstance.sendTransacEmail({
      sender: {
        name: "Tapin",
        email: process.env.ADMIN_EMAIL
      },
      to: [{ email: process.env.ADMIN_EMAIL }],
      subject: "New Contact Message",
      htmlContent: `
        <h2>Tapin Contact Form</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Index.html"));
});

app.listen(3000, () => {
  console.log("Running on 3000");
});
