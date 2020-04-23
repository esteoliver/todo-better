'use strict';
export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  
  Task.associate = function(models) {
    // associations can be defined here
  };
  
  return Task;
};