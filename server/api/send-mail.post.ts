import { sendMail } from "@/services";
export default defineEventHandler(async (event) => {
  const { message, template, locals } = await readBody(event);
  const messageId = await sendMail({
    message,
    template: `${template}/index.html`,
    locals,
  });
  return { messageId };
});
