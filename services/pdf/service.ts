import puppeteer, { PDFOptions } from "puppeteer";
import Promise from "bluebird";

// https://www.npmjs.com/package/html-pdf-node
const htmlToPdfBuffer = (
  inlinedHtml: string,
  args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  options: PDFOptions = {
    format: "letter",
  }
) =>
  new Promise<Buffer>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ args, headless: true });
      const page = await browser.newPage();

      await page.setContent(inlinedHtml, { waitUntil: "networkidle0" });

      Promise.props(page.pdf(options))
        .then(async (data) => {
          await browser.close();
          return Buffer.from(Object.values(data));
        })
        .asCallback((error: any, buffer: Buffer) =>
          error ? reject(error) : resolve(buffer)
        );
    } catch (error) {
      reject(error);
    }
  });

export default htmlToPdfBuffer;

// const fs = require('fs');
// const path = require('path');
// const inlineTemplate = require('./src/utils/inline-template');
// const htmlToBufferPdf = require('./src/services/pdf/html-to-buffer-pdf');

// ; (async () => {

//   const message = await inlineTemplate({
//     template: 'test-doc/index.html',
//     locals: {
//       message: `hello --${Date.now()}`
//     },
//     config: {
//       templatesPath: path.join(__dirname, './src/services/pdf')
//     }
//   });

//   const buffer = await htmlToBufferPdf(message);

//   fs.createWriteStream(path.join(__dirname, 'out.pdf')).write(buffer);

// })();
