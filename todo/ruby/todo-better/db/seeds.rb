# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Task.create(
  [
    { description: 'Learn Python', done: false },
    { description: 'Learn Scala', done: false },
    { description: 'Learn GoLang', done: false },
    { description: 'Learn Javascript', done: true },
    { description: 'Learn Ruby', done: true },

    { description: 'Build a ToDo App', done: false },
    { description: 'Add users to the ToDo App', done: false },
    { description: 'Create a login', done: false },
    { description: 'Develop a UI', done: false },
    { description: 'Add task types', done: false }    
  ]
)