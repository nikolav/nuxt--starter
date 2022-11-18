import httpStatus from "http-status";

import { requestValidationSchemaCheck as check, omit } from "@/utils";
import { authAuthenticate } from "@/validations";
import { authenticate } from "@/services/auth";

export default defineEventHandler(async (event) => {
  try {
    const {
      body: { email, password },
    } = await check(event, { body: authAuthenticate });
    return omit(await authenticate(email, password), ["user.passwordHash"]);
  } catch (error) {}

  return createError({
    statusCode: httpStatus.BAD_REQUEST,
    statusMessage: `bad request`,
  });
});
