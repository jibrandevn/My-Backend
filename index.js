import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./sendEmail.js";

const PORT = 5005;
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", (req, res) => res.status(200).send("Hello world"));

////////////////////////////////////////////////////////////////////////////

app.post('/sent', async (req, res) => {
  const { Name, email, message1 } = req.body;
  console.log(Name, email, message1);
  const send_to = 'jibrandevn@gmail.com';
  const sent_from = 'jibrandevn@gmail.com';
  const reply_to = 'jibrandevn@gmail.com';
  const subjecta = "From Webtose 1";
  const message = ` <p>Name ${Name},</p> 
    <p>Email ${email} </p>
    <p>Message ${message1}</p>`;

  try {
    await sendEmail(subjecta, message, send_to, sent_from, reply_to);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
});

app.post('/sent1', async (req, res) => {
  const { Name, email } = req.body;
  console.log(Name, email);
  const send_to = 'jibrandevn@gmail.com';
  const sent_from = 'jibrandevn@gmail.com';
  const reply_to = 'jibrandevn@gmail.com';
  const subjecta = "From Webtose 2";
  const message = ` <p>Name ${Name},</p> 
    <p>Email ${email} </p>`;

  try {
    await sendEmail(subjecta, message, send_to, sent_from, reply_to);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
});

////////////////////////////////////////////////////////////////////////////
const CONNECTION_URL = "mongodb+srv://jibran:jibranmern@clusterone.u74t8kf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log('Connected Succesfully.') }).catch((err) => console.log('no connection ', err))
const server = app.listen(PORT, () => console.log("Listening on port ", PORT)); 
