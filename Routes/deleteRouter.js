const express = require("express");
const fs = require("fs").promises;
const { createPath, readFile } = require("../middleware");

const deleteRouter = express.Router();

deleteRouter.delete("/:id", [createPath, readFile], async (req, res) => {
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

    const deletedUser = res.locals.users[index];

    res.locals.users.splice(index, 1);

    await fs.writeFile(
      res.locals.pathToDB,
      JSON.stringify(res.locals.users),
      "utf-8"
    );

    return res.status(200).json({
      message: "user deleted successfully",
      user: deletedUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports.deleteRouter = deleteRouter;