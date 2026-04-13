const User = require('../database/models/User');

const validateUserModel = async (email, password) => {
  await User.build({ email_user: email, password_user: password }).validate();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email_user: email } });
};

const createUser = async (email, passwordHash) => {
  return await User.create({
    email_user: email,
    password_user: passwordHash,
  });
};

module.exports = {
  validateUserModel,
  findUserByEmail,
  createUser,
};
