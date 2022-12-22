import db from '../models/index';
const { Op } = require('sequelize');

let handleCreateNewProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.contentMarkdown || !data.contentHTML) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !',
                });
            } else {
                let res = await db.Project.create({
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    statusId: data.statusId,
                    name: data.name,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    isDeleted: 0,
                });
                if (res && data.arrUserId && data.arrUserId.length > 0) {
                    data.arrUserId = data.arrUserId.map((item) => {
                        return { ...item, projectId: res.id };
                    });
                    await db.Userproject.bulkCreate(data.arrUserId);
                }
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {
                where: { isDeleted: data.isDeleted },
                include: [{ model: db.Allcode, as: 'statusProjectData', attributes: ['value', 'code'] }],
                raw: true,
                nest: true,
            };
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit;
                objectFilter.offset = +data.offset;
            }
            if (data.keyword !== '') objectFilter.where = { ...objectFilter.where, name: { [Op.substring]: data.keyword } };
            let res = await db.Project.findAndCountAll(objectFilter);
            resolve({
                errCode: 0,
                data: res.rows,
                count: res.count,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let handleSoftDeleteProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Project.update({ isDeleted: data.isDeleted }, { where: { id: data.ids } });
            resolve({
                errCode: 0,
                errMessage: 'Soft Delete the project succeeds!',
            });
        } catch (error) {
            reject(error);
        }
    });
};
let handleRestoreProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters`,
                });
            } else {
                let project = await db.Project.findOne({
                    where: { id: data.id },
                    raw: false,
                });
                if (project) {
                    project.isDeleted = false;

                    await project.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Restore the project succeeds!',
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'project not found!',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let handleDeleteProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.ids.length <= 0) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`,
                });
            } else {
                await db.Project.destroy({
                    where: { id: data.ids },
                });
                resolve({
                    errCode: 0,
                    message: `The project is deleted`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getDetailProjectById = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!projectId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                let res = await db.Project.findOne({
                    where: { id: projectId, isDeleted: false },
                    include: [{ model: db.Allcode, as: 'statusProjectData', attributes: ['value', 'code'] }],
                    raw: true,
                    nest: true,
                });
                let userproject = await db.Userproject.findAll({
                    where: { projectId: projectId },
                });
                let dataUser = await Promise.all(
                    userproject.map(async (item) => {
                        let data = await db.User.findOne({
                            where: { id: item.userId },
                            attributes: {
                                exclude: ['password', 'image'],
                            },
                        });
                        return data;
                    }),
                );

                res.userproject = userproject;
                res.userData = dataUser;
                resolve({
                    errCode: 0,
                    data: res,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let handleUpdateProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters`,
                });
            } else {
                let project = await db.Project.findOne({
                    where: { id: data.id },
                    raw: false,
                });
                if (project) {
                    project.name = data.name;
                    project.statusId = data.statusId;
                    project.startDate = data.startDate;
                    project.endDate = data.endDate;
                    project.contentHTML = data.contentHTML;
                    project.contentMarkdown = data.contentMarkdown;
                    await project.save();
                    await db.Userproject.destroy({
                        where: { projectId: data.id },
                    });
                    data.arrUserId = data.arrUserId.map((item) => {
                        return { ...item, projectId: data.id };
                    });
                    await db.Userproject.bulkCreate(data.arrUserId);

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the project succeeds!',
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Project not found!',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getCountStatusProject = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let statusProject = await db.Allcode.findAll({
                where: { type: 'STATUSPROJECT' },
            });
            let objectCount = {};
            let arrayLable = [];
            let arrayValue = [];
            if (statusProject) {
                let project = await db.Project.findAll();
                for (let i = 0; i < statusProject.length; i++) {
                    arrayLable.push(statusProject[i].value);
                    arrayValue.push(
                        project.filter((item) => {
                            return item.statusId == statusProject[i].code;
                        }).length,
                    );
                }
                objectCount = {
                    arrayLable,
                    arrayValue,
                };
                resolve({
                    errCode: 0,
                    data: objectCount,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleCreateNewProject: handleCreateNewProject,
    getAllProject: getAllProject,
    handleRestoreProject: handleRestoreProject,
    handleSoftDeleteProject: handleSoftDeleteProject,
    handleDeleteProject: handleDeleteProject,
    getDetailProjectById: getDetailProjectById,
    handleUpdateProject: handleUpdateProject,
    getCountStatusProject: getCountStatusProject,
};
