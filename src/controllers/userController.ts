import { IncomingMessage, ServerResponse } from "http";
import { findAll, findById, create, update, remove } from "../models/userModel";
import { getPostData, validateId } from "../utils";

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Can't find this user" }));
    } else if (!validateId(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getPostData(req);

    if (body.username && body.age && body.hobbies) {
      const newUser = await create(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Username, age, hobbies are required, please fill them",
        })
      );
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  try {
    const user = await findById(id);
    const updatedUser = await update(req, id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Can't find this user" }));
    } else if (!validateId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!updatedUser) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Username, age, hobbies are required, please fill them",
        })
      );
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedUser));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  try {
    const user = await findById(id);
    const userToBeDeleted = await remove(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (!validateId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!userToBeDeleted) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
    } else {
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User was deleted` }));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};
