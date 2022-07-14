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
    await queryInterface.bulkInsert('Posts', [
        {
          title: 'My first blog post',
          date: new Date(),
          author: "john.doe@example.com",
          text: "This is content of my first blog post",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'My second blog post',
          date: new Date(),
          author: "john.doe@example.com",
          text: "This is content of my second blog post",
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
    await queryInterface.bulkDelete('Posts', null, {})
  }
}
