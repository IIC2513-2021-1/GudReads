const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.book);
    }
  }
  author.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'author',
    },
  );
  return author;
};
