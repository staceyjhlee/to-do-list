const express = require("express");
const cookieParser = require("cookie-parser");

const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");
const todoController = require("./controllers/todoController");

const PORT = 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/todo-list/:id", todoController.getToDos, (req, res) => {
  return res.status(200).json(res.locals.todos);
});

app.get("/todo-list", todoController.getAllToDos, (req, res) => {
  return res.status(200).json(res.locals.todos);
});

app.post(
  "/todo-list/:id",
  cookieController.verifyCookie,
  todoController.addToDos,
  (req, res) => {
    return res.status(200).json(res.locals.todos);
  }
);

app.delete(
  "/todo-list/:id",
  cookieController.verifyCookie,
  todoController.deleteToDos,
  (req, res) => {
    return res.status(200).json(res.locals.todos);
  }
);

app.put(
  "/todo-list/:id",
  cookieController.verifyCookie,
  todoController.updateToDos,
  (req, res) => {
    return res.status(200).json(res.locals.todos);
  }
);

app.post(
  "/signup",
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    return res
      .status(200)
      .json({ id: res.locals.user.id, username: res.locals.user.username });
  }
);

app.get(
  "/auth/status",
  sessionController.isLoggedIn,
  userController.getUserById,
  (req, res) => {
    return res.status(200).json({ user: res.locals.user });
  }
);

app.post(
  "/login",
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

app.post(
  "/signout",
  cookieController.signOut,
  sessionController.endSession,
  (req, res) => {
    return res.status(200).json(res.locals.signout);
  }
);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
