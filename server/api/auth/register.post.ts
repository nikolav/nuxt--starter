import httpStatus from "http-status";

import { requestValidationSchemaCheck as check, omit, get } from "@/utils";
import { authRegister } from "@/validations";
import { register, allowGuest } from "@/services/auth";

export default defineEventHandler(async (event) => {
  try {
    // guest only
    await allowGuest(get(event, "context.user"));

    // validate input
    const {
      body: { email, password },
    } = await check(event, { body: authRegister });

    // db.add, format response
    return omit(await register(email, password), ["user.passwordHash"]);
  } catch (error) {}

  return createError({
    statusCode: httpStatus.BAD_REQUEST,
    statusMessage: `bad request`,
  });
});
