// Reponse protocols.
const { createErrorResponse } = require("../factories/responses/api");

// Custom error.
const { Err } = require("../factories/errors");

const { verifyAccessToken } = require("../lib/jwt");

module.exports = async (req, res, next) => {
  try {
    if (req.header("Authorization") || req.header("accessToken")) {
      const bearerToken = req.header("Authorization");
      const token =
        bearerToken?.replace(/^Bearer\s+/, "") || req.header("accessToken");

      try {
        req.user = await verifyAccessToken(token);
        next();
      } catch (error) {
        const err = new Err(`Access token does not valid.`);
        err.status = 401;
        throw err;
      }
    } else {
      // return next();
      const err = new Err(`Access token does not exist.`);
      err.status = 401;
      throw err;
    }
  } catch (error) {
    return createErrorResponse({
      res,
      status: error?.statusCode ?? 401,
      msg: error.message,
    });
  }
};
