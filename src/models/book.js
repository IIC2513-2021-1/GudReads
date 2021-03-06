const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.author);
    }
  }
  book.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      publication: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      authorId: DataTypes.INTEGER,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'book',
    },
  );
  return book;
};
