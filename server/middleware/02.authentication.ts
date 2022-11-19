import { get, set } from "@/utils";
import { jwtVerify, userFindById } from "@/services";

const reBearerToken = /^Bearer\s+(.*)$/;

// +event.context.user @access-token
export default defineEventHandler(async (event) => {
  // console.log({ "#": 1 });
  try {
    const authHeader = getRequestHeader(event, `Authorization`);
    if (authHeader) {
      const token = get(reBearerToken.exec(authHeader), "[1]");
      if (token) {
        const id = get(jwtVerify(token), "id");
        if (id) {
          const user = await userFindById(id);
          if (user) {
            set(event, "context.user", user);
          }
        }
      }
    }
  } catch (error) {}
});
