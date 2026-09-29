import EventEmitter from "events";
import jwt from "jsonwebtoken";

import { emailTemplate } from "./emailTemplate/generateHTML.js";
import sendEmails, { emailSubjects } from "./sendEmails.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email) => {
  // logic for send email
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  const link = `http://localhost:3000/auth/activate_account/${token}`;

  const isEmailSend = await sendEmails({
    to: email,
    subject: emailSubjects.accountActivation,
    html: emailTemplate(link),
  });

  if (!isEmailSend) {
    console.error("Failed to send activation email to", email);
  }
});
