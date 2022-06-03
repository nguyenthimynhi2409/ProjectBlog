const AuthRepository = require("../repositories/AuthRepository");

const signIn = (data) => AuthRepository.signIn(data);
const signUp = (data) => AuthRepository.signUp(data);

module.exports = {
  signIn,
  signUp,
};
