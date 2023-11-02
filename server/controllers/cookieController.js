const cookieController = {};

/**
 * setCookie - store the user id in a cookie
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.user.id, { httpOnly: true });
  return next();
};

/**
 * verifyCookie - auth check for user in a cookie
 */
cookieController.verifyCookie = (req, res, next) => {
  const { ssid } = req.cookies;
  const { id } = req.params;

  if (id === ssid) {
    res.locals.user = id;
    return next();
  } else {
    return next({
      log: "User not authorized",
      status: 500,
      message: { err: "User not authorized" },
    });
  }
};
/**
 * signOut - clears cookies upon sign out
 */
cookieController.signOut = (req, res, next) => {
  const { ssid } = req.cookies;
  res.clearCookie("ssid", { httpOnly: true, path: "/" });
  res.locals.signout = "success";
  res.locals.id = ssid;
  return next();
};

module.exports = cookieController;
