const UserRepository = require("../repositories/UserRepository");

const getAllUsers = () => UserRepository.getAllUsers();
const getUserById = (id) => UserRepository.getUserById(id);
const createUser = (data) => UserRepository.createUser(data);
const updateUser = (id, data) => UserRepository.updateUser(id, data);
const deleteUser = (id) => UserRepository.deleteUser(id);
const forgotPassword = (data) => UserRepository.forgotPassword(data);
const updatePassword = (id, data) => UserRepository.updatePassword(id, data);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  updatePassword,
};
