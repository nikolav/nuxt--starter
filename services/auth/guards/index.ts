import httpStatus from "http-status";
import { User, matchesRoles } from "@/services";
import { OrNoValue } from "@/types";

// authorize roles
// throw if doesnt match
//  ..use after `user` loaded, access-token @/server/middleware
export const authorized = async (
  user: OrNoValue<User>,
  ...policies: string[]
) => {
  const statusMessage = `forbidden`;
  try {
    if (!user) throw statusMessage;
    if (true === (await matchesRoles(user, ...policies))) return;
  } catch (error) {}

  throw createError({
    statusCode: httpStatus.FORBIDDEN,
    statusMessage,
  });
};

export const allowGuest = (user: OrNoValue<User>) =>
  new Promise((resolve, reject) => {
    if (null != user)
      return reject(
        createError({
          statusCode: httpStatus.BAD_REQUEST,
          statusMessage: `bad request`,
        })
      );
    resolve(true);
  });
