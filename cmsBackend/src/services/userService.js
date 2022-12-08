import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
const { Op } = require("sequelize");
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);

let hashUserPasswordFromBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.lastName) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let check = await checkUserEmail(data.email);
                if (check === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Your email is already in used, Plz try another email!'
                    })
                } else {
                    let hashPassword = await hashUserPasswordFromBcrypt(data.password);
                    await db.User.create({
                        email: data.email,
                        password: hashPassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        roleId: data.roleId,
                        genderId: data.genderId,
                        phonenumber: data.phonenumber,
                        image: data.avatar,
                        dob: data.dob,
                        isDeleted: false
                    })
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                }

            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundUser = await db.User.findOne({
                    where: { id: userId }
                })
                if (!foundUser) {
                    resolve({
                        errCode: 2,
                        errMessage: `The user isn't exist`
                    })
                }
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: `The user is deleted`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.genderId) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters`
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {
                    user.firstName = data.firstName
                    user.lastName = data.lastName
                    user.roleId = data.roleId
                    user.genderId = data.genderId
                    user.phonenumber = data.phonenumber
                    user.dob = data.dob
                    if (data.image) {
                        user.image = data.image
                    }
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the user succeeds!'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'User not found!'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {
                where: { isDeleted: false },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.Allcode, as: 'roleData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['value', 'code'] },
                ],
                raw: true,
                nest: true
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }
            if (data.keyword !== '') objectFilter.where = { ...objectFilter.where, phonenumber: { [Op.substring]: data.keyword } }
            let res = await db.User.findAndCountAll(objectFilter)
            resolve({
                errCode: 0,
                data: res.rows,
                count: res.count
            })


        } catch (error) {
            reject(error)
        }
    })
}
let getDetailUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userid) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let res = await db.User.findOne({
                    where: { id: userid, statusId: 'S1' },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'roleData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
                })
                if (res.image) {
                    res.image = new Buffer(res.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllUser: getAllUser,
    getDetailUserById: getDetailUserById,
   
}