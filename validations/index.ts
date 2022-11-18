import { z } from "zod";

import { AUTH_PASSWORD_MIN_LENGTH } from "@/config/vars";

export const apiStatus = z.object({
  message: z.string().optional(),
});

export const authRegister = z.object({
  email: z.string().email(), 
  password: z.string().min(AUTH_PASSWORD_MIN_LENGTH)
});

export const authAuthenticate = authRegister;
