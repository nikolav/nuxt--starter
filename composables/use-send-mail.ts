
interface ISendMailResponse { 
  messageId: string | undefined; 
};

export const useSendMail = () => {
  const { SEND_MAIL_ENDPOINT } = useAppConfig();
  const sendMail = async ({
    message = {},
    template = "text-message",
    locals = {},
  }) => {
    let messageId;
    try {
      const res: ISendMailResponse = 
        await $fetch(SEND_MAIL_ENDPOINT, {
        method: "post",
        body: {
          message,
          template,
          locals,
        },
      });
      messageId = res.messageId;
    } catch (error) {
      console.error(error);
    }

    return { messageId };
  };

  return { sendMail };
};
