'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Comments', [
      {
        post_id : 1,
        date: new Date(),
        author: "john.doe@example.com",
        text: "My first comment under this post",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id : 1,
        date: new Date(),
        author: "john.doe@example.com",
        text: "My second comment under this post",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
