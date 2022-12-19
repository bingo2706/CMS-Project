'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            statusId: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            startDate: {
                type: Sequelize.STRING
            },
            endDate: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Projects');
    }
};