import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import { IUser, IUserWithoutId } from "../interface/user";

let users: IUser[] = [];

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const create = (user: IUserWithoutId) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
};

export const update = (req: IncomingMessage, id: string) => {
  return new Promise((resolve, reject) => {
    try {
      let updatedUser: IUser;
      let body = "";

      req.on("data", (chunk: Buffer) => {
        body += chunk;
      });

      req.on("end", () => {
        updatedUser = { id: id, ...JSON.parse(body) };

        if (updatedUser.username && updatedUser.age && updatedUser.hobbies) {
          const index = users.findIndex((user) => user.id === id);
          users[index] = updatedUser;
          resolve(updatedUser);
        } else {
          reject(updatedUser);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    try {
      users.filter((user) => user.id !== id);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
