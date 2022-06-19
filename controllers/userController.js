import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../models/userModel.js";
import { getPostData, validateId } from "../utils.js";

export const getUsers = async (req, res) => {
  try {
    const users = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));

    if (!users) {
      res.end(JSON.stringify({ message: "No users" }));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Can't find this user" }));
    } else if (!validateId) {
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

export const createUser = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };
    const newUser = await create(user);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Username, age, hobbies are required, please fill them",
        })
      );
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const updateUser = async (req, res, id) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Can't find this user" }));
    } else if (!validateId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body);

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatedUser = await update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedUser));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};

export const deleteUser = async (req, res, id) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (!validateId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else {
      await remove(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} is deleted` }));
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Sorry! Something wrong happened" }));
  }
};
