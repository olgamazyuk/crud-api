import { IncomingMessage } from "http";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { IUserWithoutId } from "./interface/user";

export const validateId = (uuid: string) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const getPostData = (req: IncomingMessage): Promise<IUserWithoutId> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
