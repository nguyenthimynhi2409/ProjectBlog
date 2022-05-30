const UserRepository = require("../repositories/UserRepository");

exports.getAllUsers = () => UserRepository.getAllUsers();
exports.getUserById = (id) => UserRepository.getUserById(id);
exports.createUser = (data) => UserRepository.createUser(data);
exports.updateUser = (id, data) => UserRepository.updateUser(id, data);
exports.deleteUser = (id) => UserRepository.deleteUser(id);
exports.login = (data) => UserRepository.login(data);