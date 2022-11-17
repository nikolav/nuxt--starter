import { ServerResponse } from "http";
import { forOwn } from "@/utils";

const downloadHeaders = (size = 0, filename = "out.pdf") => ({
  "Content-Disposition": `attachment; filename=${filename}`,
  "Content-Type": "application/octet-stream",
  "Content-Length": size,
  "Content-Transfer-Encoding": "binary",
  "Content-Description": "File Transfer",
  "Cache-Control": "must-revalidate, post-check=0, pre-check=0",
  Pragma: "public",
  Expires: "0",
});

export const setDownloadHeaders = (
  res: ServerResponse,
  size: number,
  filename?: string | undefined
) =>
  forOwn(
    downloadHeaders(size, filename),
    (value: string | number, header: string) => res.setHeader(header, value)
  );
