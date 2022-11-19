import { get } from "@/utils";

export default defineEventHandler(async (event) => {
  // console.log({ "#": 2 });
  console.log(`@auth`, get(event, "context.user"));
});
