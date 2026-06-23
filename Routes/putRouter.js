const express = require("express");
const fs = require("fs").promises;
const { createPath, readFile } = require("../middleware");
const { schema } = require("../schema/indexSchema");
const putRouter = express.Router();

putRouter.put("/:id", [createPath, readFile], async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = res.locals.users.findIndex((user) => user.id == id);

    if (index === -1) {
      res.json({ message: "user not found" });
      return;
    }

    const updatedUser = await schema.validateAsync(req.body);
    updatedUser.id = id;

    res.locals.users[index] = updatedUser;

    await fs.writeFile(res.locals.pathToDB, JSON.stringify(res.locals.users));

    res.status(200).json({
      message: "user updated successfully",
      user: updatedUser,
    });
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports.putRouter = putRouter;
