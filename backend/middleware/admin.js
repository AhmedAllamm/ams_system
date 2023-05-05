const connection = require("../db/dbConnection");
const util = require("util"); // helper

const admin = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const { token } = req.headers;
  const admin = await query("select * from users where token = ?", [token]);
  if (admin[0] && admin[0].type == "admin") {
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};

module.exports = admin;