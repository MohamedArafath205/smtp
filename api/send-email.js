const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// CORS middleware
app.use(cors({
    origin: "https://sos.gdscsrmrmp.club",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Route to handle sending emails
app.post("/api/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Check if 'to' field is present
  if (!to) {
    return res.status(400).send("Recipient email (to) is required");
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.HOST_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Error sending email: " + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
