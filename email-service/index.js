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
    const { name, email, phone, company, message, product, price, cap } = req.body || {};

    // Regole:
    // - Contatti: serve email + message
    // - Pre-ordine (se c'è product): basta email (message opzionale)
    const isPreorder = Boolean(product);
    if (!email || (!isPreorder && !message)) {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    const subject = isPreorder
      ? `Pre-ordine (${product}${price ? ` €${price}` : ""}) – Coffee Core`
      : `Nuovo contatto – Coffee Core`;

    const msgText =
`${isPreorder ? "Richiesta pre-ordine" : "Nuovo contatto"} dal sito Coffee Core

Nome: ${name || "-"}
Email: ${email}
Telefono: ${phone || "-"}
Azienda: ${company || "-"}
Prodotto: ${product || "-"}
Prezzo selezionato: ${price || "-"}
CAP: ${cap || "-"}

Messaggio:
${message || "(non inserito)"}

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

