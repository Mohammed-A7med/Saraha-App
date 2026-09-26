import nodemailer from "nodemailer";

export const emailSubjects = {
  accountActivation: "Activate Your Saraha Account",
  resetPassword: "Reset Your Password",
};

const sendEmails = async ({ to, subject, html }) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Saraha Application <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    return info.rejected.length == 0 ? true : false;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmails;
