'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(
                models.Post,
                {foreignKey: 'post_id'}
            )
        }
    }
    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING(255),
        },
        date: {
            type: DataTypes.DATE,
        },
        text: {
            type: DataTypes.TEXT,
        },
        post_id : {
            type: DataTypes.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment
}