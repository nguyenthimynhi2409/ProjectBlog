"use strict";
const { faker } = require("@faker-js/faker");
const { sequelize } = require("../config/db");
const { listUsers } = require("./20220601033222-seed-user");

let users = listUsers();
var dummyJSON = [];
for (var i = 0; i < 10; i++) {
  dummyJSON.push({
    id: faker.datatype.uuid(),
    title: faker.lorem.text(),
    content: faker.lorem.text(),
    coverImage: faker.image.abstract(),
    status: "publish",
    description: faker.lorem.text(),
    userId: users[Math.floor(Math.random() * users.length)].id,
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
    await queryInterface.bulkInsert("posts", dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },

  listPosts() {
    return dummyJSON;
  },
};
