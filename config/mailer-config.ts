import { APP_PATH } from "./vars";

const mailerConfig = {
  paths: {
    templatesPath: `${APP_PATH}/services/mail`,
    defaultTemplate: "text-message/index.html",
  },

  message: {
    from: "admin@nikolav.rs",
    subject: "hello",
    text: "hello",
    // to: "",
    // cc: defaultFrom,
    // bcc: "",
    // html: '<p>html message</p>',
    // attachments: ["<files...>"],
  },
};

export default mailerConfig;
