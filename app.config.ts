export default defineAppConfig({
  // @client, useAppConfig()
  TEST_API_STATUS: "http://localhost/api/status",
  PDF_RENDER_ENDPOINT: "/api/render-pdf",
  PDF_CONFIG: {
    http: {
      headers: {},
    },
    defaultPdfTemplate: "text-doc",
    defaultPdfFilename: "out.pdf",
  },
  SEND_MAIL_ENDPOINT: "/api/send-mail",
});
