import fs from "fs";
import path from "path";
import handlebars from "handlebars";
// @inliner
// https://www.npmjs.com/package/juice
// https://www.npmjs.com/package/web-resource-inliner
import juice from "juice";
import { merge } from "@/utils";
import mailerConfig from "@/config/mailer-config";

const { paths: configDefaults } = mailerConfig;

export default ({
  template = configDefaults.defaultTemplate,
  locals = {},
  config = {},
}) =>
  new Promise<string>((resolve, reject) => {
    const options = merge({}, configDefaults, config);
    try {
      // template file to render
      const templatePath = path.join(options.templatesPath, template);

      // build placeholder template
      const hbTemplate = handlebars.compile(
        fs.readFileSync(templatePath, "utf8")
      );

      // render with placeholders
      const html = hbTemplate(locals);

      // inline everything
      juice.juiceResources(
        html,
        {
          webResources: {
            images: true,
            relativeTo: path.dirname(templatePath),
          },
        },
        (error: any, htmlInlined: string) =>
          error ? reject(error) : resolve(htmlInlined)
      );
    } catch (error) {
      reject(error);
    }
  });
