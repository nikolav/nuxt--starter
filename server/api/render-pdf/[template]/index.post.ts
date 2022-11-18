import { Readable } from "node:stream";
import { inlineTemplate, hasOwn, setDownloadHeaders, pick } from "@/utils";
import { htmlToPdfBuffer } from "@/services";
import { defaultPdfTemplate, pdfTemplatesPath } from "@/config/vars";
import { ScalarAny, CallbackAny } from "@/types";

const templateLocals: {
  [key: ScalarAny]: CallbackAny;
} = {
  "title-description": (body: any) => pick(body, ["title", "description"]),
  [defaultPdfTemplate]: (body: any) => pick(body, ["text"]),
};

export default defineEventHandler(async (event) => {
  let { template } = event.context.params;
  const body = await readBody(event);

  if (!hasOwn(templateLocals, template)) template = defaultPdfTemplate;
  const locals = templateLocals[template](body);

  const inlinedHtml = await inlineTemplate({
    template: `${template}/index.html`,
    locals,
    config: {
      templatesPath: pdfTemplatesPath,
    },
  });
  const bufferPdf = await htmlToPdfBuffer(inlinedHtml);
  const read$ = new Readable({
    read() {
      this.push(bufferPdf);
    },
  });

  setDownloadHeaders(event.node.res, bufferPdf.length);
  return sendStream(event, read$);
});
