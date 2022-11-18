import httpStatus from "http-status";

import { requestValidationSchemaCheck as check, omit } from "@/utils";
import { authRegister } from "@/validations";
import { register } from "@/services/auth";

export default defineEventHandler(async (event) => {
  try {
    const {
      body: { email, password },
    } = await check(event, { body: authRegister });
    return omit(await register(email, password), ["user.passwordHash"]);
  } catch (error) {}

  return createError({
    statusCode: httpStatus.BAD_REQUEST,
    statusMessage: `bad request`,
  });
});
