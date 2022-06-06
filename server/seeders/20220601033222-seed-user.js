"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

var dummyJSON = [];

for (var i = 0; i < 10; i++) {
  dummyJSON.push({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: bcrypt.hashSync("1234", 10),
    gender: "male",
    phone: faker.phone.phoneNumber('0#########'),
    role: 1,
    avatar: faker.internet.avatar(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },

  listUsers() {
    return dummyJSON;
  },
};