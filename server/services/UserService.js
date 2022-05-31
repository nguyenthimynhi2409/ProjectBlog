const UserRepository = require("../repositories/UserRepository");

exports.getAllUsers = (data) => UserRepository.getAllUsers(data);
exports.getUserById = (id) => UserRepository.getUserById(id);
exports.createUser = (data) => UserRepository.createUser(data);
exports.updateUser = (id, data) => UserRepository.updateUser(id, data);
exports.deleteUser = (id) => UserRepository.deleteUser(id);
exports.signIn = (data) => UserRepository.signIn(data);
exports.signUp = (data) => UserRepository.signUp(data);