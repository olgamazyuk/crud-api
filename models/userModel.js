import { v4 as uuidv4 } from "uuid";
import users from "../data/usersData.json" assert { type: "json" };
import { writeDataToFile } from "../utils.js";

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile(users);
    resolve(newUser);
  });
};

export const update = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...user };
    writeDataToFile(users);
    resolve(users[index]);
  });
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    writeDataToFile(filteredUsers);
    resolve();
  });
};
