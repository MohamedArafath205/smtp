const express = require("express");
const path = require("path");
const app = express();
const port = process.env.SMTP_PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const smtpRouter = require("./api/smtp");
app.use("/api/smtp", smtpRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
