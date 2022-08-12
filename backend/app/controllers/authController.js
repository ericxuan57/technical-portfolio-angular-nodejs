const {
  createOKResponse,
  createErrorResponse,
} = require("../factories/responses/api");
const { generateAccessToken } = require("../lib/jwt");

const db = require('../models');
const bcrypt = require('../services/bcrypt.service');

exports.signUp = async (req, res) => {
  // validate
  if (await db.user.findOne({ where: { email: req.body.email } })) {
    return res.json({ status: 'exist' });
  }

  const user = new db.user(req.body);
	user.password = bcrypt.hashPassword(req.body.password);

  // save user
  user.save().then(
    () => res.json({ status: 'success' })
  ).catch(err => {
    throw err;
  });
};

exports.signIn = async (req, res) => {
  // validate
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (bcrypt.comparePasswords(req.body.password, user.password)) {
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });

      return res.json({ status: JSON.stringify(user), accessToken: accessToken })
    } else{
      return res.json({ status: 'unauthorized' });
    }
  } catch (error) {
    return res.json({ status: 'unauthorized' });
  }
};

exports.getCheckAuthentication = async (req, res) => {
  try {
    if (req.user?.id) {
      const user = await db.user.findOne({ where: { id: req.user?.id } });
      if (!user) {
        const err = new Err(`User does not exist.`);
        err.status = 400;
        throw err;
      }

      return createOKResponse({
        res,
        data: {
          user: user.dataValues
        },
      });
    }
    return createErrorResponse({
      res,
      status: 403,
    });
  } catch (error) {
    return createErrorResponse({
      res,
      errors: error.errors,
      msg: error.message,
    });
  }
};