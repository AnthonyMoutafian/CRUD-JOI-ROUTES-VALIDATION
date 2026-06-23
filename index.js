const express = require("express");
const fs = require("fs").promises;
const { createPath, readFile } = require("./middleware");
const { usersRouter } = require("./Routes/usersRouter");
const { authRouter } = require("./Routes/authRouter");
const { putRouter } = require("./Routes/putRouter");
const { deleteRouter } = require("./Routes/deleteRouter");
const { patchRouter } = require("./Routes/patchRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", putRouter);
app.use("/", patchRouter);
app.use("/", deleteRouter);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Running Server On Port ${PORT}`);
});
