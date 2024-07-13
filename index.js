const express = require('express');
const app = express();
const port = process.env.SMTP_PORT || 3000;

app.use(express.json());

const smtpRoute = require('./api/smtp');
app.use('/api/smtp', smtpRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})