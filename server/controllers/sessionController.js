const db = require("../models/userModel");
const sessionController = {};

/**
 * startSession - creates session for logged in user in db
 */
sessionController.startSession = async (req, res, next) => {
  const query = `INSERT INTO sessions (cookieId) VALUES ($1) RETURNING *`;
  const value = [res.locals.user.id];

  try {
    const session = await db.query(query, value);
    return next();
  } catch (err) {
    console.error({ err });
    return next({
      log: "Error occurred in sessionController.startSession.",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * endSession - deletes session from db
 */
sessionController.endSession = async (req, res, next) => {
  const query = `DELETE FROM sessions WHERE cookieid = $1`;
  const value = [res.locals.id];
  try {
    const session = await db.query(query, value);
    return next();
  } catch (err) {
    return next({
      log: "Error occurred in sessionController.endSession.",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
/**
 * isLoggedIn - checks session exists in db/user is logged in
 */
sessionController.isLoggedIn = async (req, res, next) => {
  const { ssid } = req.cookies;
  const query = "SELECT * FROM sessions WHERE cookieId = $1 LIMIT 1";
  const values = [ssid];
  try {
    //check if active session
    const result = await db.query(query, values);
    const session = result.rows[0];
    if (!session) {
      console.log("You are not logged in, no session!");
      return next({
        log: "Error occured: You need to log-in.",
        status: 400,
        message: { err: "An error occurred" },
      });
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: "Error occurred in sessionController.isLoggedIn.",
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

module.exports = sessionController;
