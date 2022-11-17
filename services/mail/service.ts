import nodemailer from "nodemailer";
import { emailConfig } from "@/config/vars";
import mailerConfig from "@/config/mailer-config";
import { inlineTemplate, merge } from "@/utils";

const { message: messageDefaults } = mailerConfig;

// SMTP transport
const transporter = nodemailer.createTransport({
  port: emailConfig.port,
  host: emailConfig.host,
  secure: false,
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("error with email connection");
  }
});

export const sendMail = async ({
  message = {},
  template = "text-message/index.html",
  locals = {},
}) => {
  let messageId;
  try {
    const html = await inlineTemplate({ template, locals });
    const mail = merge({}, messageDefaults, message, { html });
    const res = await transporter.sendMail(mail);
    messageId = res.messageId;
  } catch (error) {
    console.error(error);
  }

  return messageId;
};
