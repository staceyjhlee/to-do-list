const db = require("../models/userModel");

const todoController = {};

/**
 * getAllToDos - gets all to do items for every user in db
 */
todoController.getAllToDos = async (req, res, next) => {
  const query = `SELECT t.*, u.username FROM todos t JOIN users u ON t.user_id = u.id ORDER BY t.id ASC`;

  try {
    const result = await db.query(query);
    const obj = {};
    result.rows.forEach((item) => {
      const { id, todo, user_id: userId, username } = item;
      if (obj[userId]) {
        obj[userId].items += 1;
      } else {
        obj[userId] = {
          username,
          id,
          userId,
          items: 1,
        };
      }
    });

    res.locals.todos = Object.values(obj);
    return next();
  } catch (err) {
    return next({
      log: "Error occurred todoController.getToDos",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * getToDos - gets todos for specific user
 */
todoController.getToDos = async (req, res, next) => {
  const { id } = req.params;
  //step1 check if user exists
  const userQuery = `SELECT 1 FROM users WHERE id = $1`;
  //step2 check for todos for clients
  // const query = `SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC `;
  const query = `SELECT todos.*, users.username FROM todos JOIN users ON todos.user_id = users.id WHERE todos.user_id = $1 ORDER BY todos.id ASC;`;
  try {
    const userResult = await db.query(userQuery, [id]);
    if (userResult.rows.length === 0) {
      return next({
        log: "User not found.",
        status: 404,
        message: { err: "An error occurred" },
      });
    }
    res.locals.todoUser = userResult.rows[0];

    const result = await db.query(query, [id]);
    res.locals.todos = result.rows;

    return next();
  } catch (err) {
    console.log({ err });
    return next({
      log: "Error occurred todoController.getToDos",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * addToDos - adds new todos for user & returns new to do list
 */
todoController.addToDos = async (req, res, next) => {
  const { id } = req.params;
  const { todo } = req.body;
  const query = `INSERT INTO todos (user_id, todo) VALUES ($1, $2) RETURNING *`;
  const values = [id, todo];

  const selectQuery = `SELECT * FROM todos WHERE user_id = $1 ORDER BY todos.id ASC`;
  const values2 = [id];

  try {
    const result = await db.query(query, values);
    const resultAll = await db.query(selectQuery, values2);

    res.locals.todos = resultAll.rows;

    return next();
  } catch (err) {
    console.log({ err });
    return next({
      log: "Error occurred todoController.getToDos",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * deleteToDos - deletes todos from list
 */
todoController.deleteToDos = async (req, res, next) => {
  const { id } = req.params;
  const { toDoId } = req.body;
  const query = `DELETE FROM todos WHERE id = $1 `;
  const values = [toDoId];

  const selectQuery = `SELECT * FROM todos WHERE user_id = $1 ORDER BY todos.id ASC`;
  const values2 = [id];
  try {
    const result = await db.query(query, values);
    const resultAll = await db.query(selectQuery, values2);

    res.locals.todos = resultAll.rows;
    return next();
  } catch (err) {
    return next({
      log: "Error occurred todoController.deleteToDos",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * updateToDos - updates to dos/completed status for todo list items
 */
todoController.updateToDos = async (req, res, next) => {
  const { id } = req.params;
  const { toDoId, data, field } = req.body;
  const query = `UPDATE todos SET ${field} = $1 WHERE id = $2`;
  const values = [data, toDoId];

  const selectQuery = `SELECT * FROM todos WHERE user_id = $1 ORDER BY todos.id ASC`;
  const values2 = [id];
  try {
    const result = await db.query(query, values);
    const resultAll = await db.query(selectQuery, values2);

    res.locals.todos = resultAll.rows;
    return next();
  } catch (err) {
    console.log({ err });
    return next({
      log: "Error occurred todoController.updateToDos",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

module.exports = todoController;
