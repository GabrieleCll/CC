const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sgMail = require("@sendgrid/mail");

const app = express();

// ENV obbligatorie: SENDGRID_API_KEY, TO_EMAIL, FROM_EMAIL, (opzionale) ALLOWED_ORIGIN
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(",") : "*"
}));

app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));

app.post("/api/notify", async (req, res) => {
  try {
    const { name, email, phone, company, message, product } = req.body || {};

    // Validazioni basilari
    if (!email || !message) {
      return res.status(400).json({ ok: false, error: "email and message are required" });
    }

    const subject = product
      ? `Nuovo contatto (${product}) – Coffee Core`
      : `Nuovo contatto – Coffee Core`;

    const text =
`Nuovo contatto dal sito Coffee Core

Nome: ${name || "-"}
Email: ${email}
Telefono: ${phone || "-"}
Azienda: ${company || "-"}
Prodotto: ${product || "-"}
Messaggio:
${message}

Timestamp: ${new Date().toISOString()}
`;

    await sgMail.send({
      to: process.env.TO_EMAIL,                // es. info@coffeecore.it
      from: process.env.FROM_EMAIL,            // deve essere verificata su SendGrid
      replyTo: email,
      subject,
      text
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Send error:", err?.response?.body || err);
    res.status(500).json({ ok: false, error: "send_failed" });
  }
});

app.post("/api/pre-order", async (req, res) => {
  try {
    const { email, cap, price, onlyInfo } = req.body || {};

    // Validazioni basilari
    if (!email) {
      return res.status(400).json({ ok: false, error: "email and message are required" });
    }

    const subject = `Pre-ordine – Coffee Core`;

    const text =
`${onlyInfo ? "Info about" : "Pre-order"} Enhanced Coffee

Email: ${email}
CAP: ${cap || "-"}
Price: ${price}

Timestamp: ${new Date().toISOString()}
`;

    await sgMail.send({
      to: process.env.TO_EMAIL,                // es. info@coffeecore.it
      from: process.env.FROM_EMAIL,            // deve essere verificata su SendGrid
      replyTo: email,
      subject,
      text
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Send error:", err?.response?.body || err);
    res.status(500).json({ ok: false, error: "send_failed" });
  }
});

// Porta fornita da Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Email service listening on :${port}`));

app.options("/api/notify", (req, res) => {
  res.set("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  return res.status(204).end();
});