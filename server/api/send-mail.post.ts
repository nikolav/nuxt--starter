import { sendMail } from "@/services";
import { authorized } from "@/services/auth";
import { get } from "@/utils";

export default defineEventHandler(async (event) => {
  let messageId;
  try {
    // authorize `admin` role for email service
    await authorized(get(event, "context.user"), "admin");

    const { message, template, locals } = await readBody(event);
    messageId = await sendMail({
      message,
      template: `${template}/index.html`,
      locals,
    });
  } catch (error) {}

  return { messageId };
});

