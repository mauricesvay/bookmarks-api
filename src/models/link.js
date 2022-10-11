const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Link extends Model {
  static init(sequelize) {
    return super.init(
      {
        url: {
          type: Sequelize.TEXT,
          allowNull: false,
          // validate: {
          //   isUrl: true
          // }
        },
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Link;
