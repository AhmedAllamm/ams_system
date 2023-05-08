const connection = require("../db/connection");
const util = require("util"); // helper

const bidder = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const { token } = req.headers;
  const bidder = await query("select * from users where token = ?", [token]);
  if (bidder[0] && bidder[0].type == "bidder") {
    next();
  } else {
    res.status(403).json({
      message: "you are not authorized to access this route !",
    });
  }
};

module.exports = bidder;