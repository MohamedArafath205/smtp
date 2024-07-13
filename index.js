const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory (adjust as per your frontend structure)
app.use(express.static(path.join(__dirname, "public")));

// Import and use the SMTP router for handling email sending
const smtpRouter = require("./api/smtp");
app.post("/api/smtp", smtpRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
