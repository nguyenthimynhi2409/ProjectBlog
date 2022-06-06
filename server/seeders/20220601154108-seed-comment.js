"use strict";

const { faker } = require("@faker-js/faker");
const { listUsers } = require("./20220601033222-seed-user");
const { listPosts } = require("./20220601045427-seed-post");

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
    const users = listUsers();
    const posts = listPosts();
    var dummyJSON = [];
    for (var i = 0; i < 10; i++) {
      dummyJSON.push({
        id: faker.datatype.uuid(),
        content: faker.lorem.text(),
        postId: posts[Math.floor(Math.random() * posts.length)].id,
        userId: users[Math.floor(Math.random() * users.length)].id,
        // commentId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("comments", dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("comments", null, {});
  },
};
