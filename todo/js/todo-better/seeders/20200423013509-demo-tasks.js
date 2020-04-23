'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tasks', [
      { description: 'Learn Python', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Learn Scala', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Learn GoLang', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Learn Javascript', done: true, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Learn Ruby', done: true, createdAt: new Date(), updatedAt: new Date() },
  
      { description: 'Build a ToDo App', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Add users to the ToDo App', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Create a login', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Develop a UI', done: false, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Add task types', done: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
