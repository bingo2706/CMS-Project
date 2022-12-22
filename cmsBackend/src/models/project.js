'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsTo(models.Allcode, { foreignKey: 'statusId', targetKey: 'code', as: 'statusProjectData' })
        }
    };
    Project.init({
        contentMarkdown: DataTypes.TEXT('long'),
        contentHTML: DataTypes.TEXT('long'),
        statusId: DataTypes.STRING,
        name: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate:DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};