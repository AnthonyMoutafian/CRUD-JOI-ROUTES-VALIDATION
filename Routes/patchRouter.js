const express = require("express");
const fs = require("fs").promises;
const { createPath, readFile } = require("../middleware");
const { schema } = require("../schema/indexSchema");

const patchRouter = express.Router();

const patchSchema = schema.fork(
  ["name", "age", "email", "password"],
  (field) => field.optional()
);

patchRouter.patch("/:id", [createPath, readFile], async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = res.locals.users.findIndex(
      (user) => user.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const validatedUserData = await patchSchema.validateAsync(req.body);

    res.locals.users[index] = {
      ...res.locals.users[index],
      ...validatedUserData,
      id,
    };

    await fs.writeFile(
      res.locals.pathToDB,
      JSON.stringify(res.locals.users),
      "utf-8"
    );

    return res.status(200).json({
      message: "user updated successfully",
      user: res.locals.users[index],
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports.patchRouter = patchRouter;