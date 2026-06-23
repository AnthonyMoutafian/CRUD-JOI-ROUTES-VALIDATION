const express = require("express");
const { createPath, readFile } = require("../middleware");
const usersRouter = express.Router();

usersRouter.get("/", [createPath, readFile], async (req, res) => {
  res.json(res.locals.users);
  return;
});

usersRouter.get("/:id", [createPath, readFile], async (req, res) => {
  const id = parseInt(req.params.id);
  const user = res.locals.users.find((user) => user.id === id);
  res.json(user);
  return;
});

module.exports.usersRouter = usersRouter;
