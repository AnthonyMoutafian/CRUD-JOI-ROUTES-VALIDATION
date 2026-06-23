const express = require("express");
const fs = require("fs").promises;
const { createPath, readFile } = require("../middleware");
const { schema } = require("../schema/indexSchema");
const authRouter = express.Router();

authRouter.post("/", [createPath, readFile], async (req, res) => {
  try {
    const newUser = await schema.validateAsync(req.body);

    newUser.id = Date.now();
    res.locals.users.push(newUser);
    await fs.writeFile(
      res.locals.pathToDB,
      JSON.stringify(res.locals.users),
      "utf-8",
    );

    res.status(201).json({
      message: "user created successfully",
      user: newUser,
    });
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports.authRouter = authRouter;
