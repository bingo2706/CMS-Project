'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Userproject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
        }
    };
    Userproject.init({
        userId: DataTypes.INTEGER,
        projectId: DataTypes.INTEGER,
        
    }, {
        sequelize,
        modelName: 'Userproject',
    });
    return Userproject;
};