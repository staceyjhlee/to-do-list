const db = require("../models/userModel");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userController = {};
/**
 * getUserById - gets id and username
 */
userController.getUserById = async (req, res, next) => {
  const { ssid } = req.cookies;
  const query = "SELECT * FROM users WHERE id = $1";
  try {
    const value = [ssid];
    const result = await db.query(query, value);

    if (result.rowCount > 0) {
      const { id, username } = result.rows[0];
      res.locals.user = { id, username };
      return next();
    }
  } catch (err) {
    return next({
      log: "Error occured in userController.getUserById",
      message: { err },
    });
  }
};

/**
 * createUser - creates new user in db; uses bcrypt to secure pw
 */
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const userQuery = "SELECT * FROM users WHERE username = $1 LIMIT 1";
  const userValue = [username];
  const userResponse = await db.query(userQuery, userValue);
  if (userResponse.rowCount > 0) {
    return next({
      log: "User already exists",
      status: 409,
      message: { err: "User already exists" },
    });
  }

  if (!username || !password) {
    return next({
      log: "Missing username or password in userController.createUser",
      status: 400,
      message: { err: "An error occurred" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
  const values = [username, hashedPassword];
  const query = `INSERT INTO users (username, password) VALUES ($1, $2 ) RETURNING *`;

  try {
    const result = await db.query(query, values);
    res.locals.user = result.rows[0];
    return next();
  } catch (err) {
    return next({
      log: "Error occurred in userController.createUser",
      status: 500,
      message: { err },
    });
  }
};
/**
 * verifyUser - verify that username and pw matches
 */
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: "Missing username or password in userController.verifyUser.",
      status: 400,
      message: { err: "An error occurred" },
    });
  }
  const query = "SELECT * FROM users WHERE username = $1 LIMIT 1";
  const values = [username];

  try {
    //just check with username, since we dont want to store raw passwords into the DB.
    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!result || !user) {
      return next({
        log: "Error occured: User not found.",
        status: 400,
        message: { err: "An error occurred" },
      });
    }
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (!result) {
          return next({
            log: "Error occured: PW incorrect.",
            status: 400,
            message: { err: "An error occurred" },
          });
        } else {
          res.locals.user = { id: user.id, username: user.username };
          return next();
        }
      })
      .catch((err) => {
        return next({
          log: "error occurred in userController.verifyUser bcrypt",
          status: 500,
          message: { err: "An error occurred" },
        });
      });
  } catch (err) {
    return next({
      log: "Error occured in userController.verifyUser.",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

module.exports = userController;
