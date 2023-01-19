import db from '../models/index';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
const { Op } = require('sequelize');
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);
let hashUserPasswordFromBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};
let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Account.findOne({
                where: { username: username },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let findAccountByUserName = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Account.findOne({
                where: { username: username },
            });
            if (user) {
                resolve({
                    errCode:0,
                    data:user
                });
            } else {
                resolve({
                    errCode:1,
                    errMessage:"Account not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.username || !data.password) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !',
                });
            } else {
                let check = await checkUsername(data.username);
                if (check === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Your username is already in used, Plz try another username!',
                    });
                } else {
                    let hashPassword = await hashUserPasswordFromBcrypt(data.password);
                    await db.Account.create({
                        email: data.email,
                        password: hashPassword,
                        username: data.username,
                     
                    });
                    resolve({
                        errCode: 0,
                        message: 'OK',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.username || !data.password) {
                resolve({
                    errCode: 4,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                let userData = {};

                let isExist = await checkUsername(data.username);

                if (isExist === true) {
                    let user = await db.Account.findOne({
                       
                        where: { username: data.username},
                        raw: true,
                    });
                    if (user) {
                        let check = await bcrypt.compareSync(data.password, user.password);
                        if (check) {
                            userData.errCode = 0;
                            userData.errMessage = 'Ok';
                            delete user.password;

                            userData.user = user;
                        } else {
                            userData.errCode = 3;

                            userData.errMessage = 'Wrong password';
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = 'User not found!';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Your's username isn't exist in your system. plz try other username`;
                }
                
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    handleLogin: handleLogin,
    findAccountByUserName:findAccountByUserName
};
