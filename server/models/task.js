'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsToMany(models.list, {
        as: "list",
        through: {
          model: "tasklist",
          as: "bridge",
        },
        foreignKey: "idTask",
      });

    }
  };
  task.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};