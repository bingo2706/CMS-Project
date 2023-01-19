import jwt_decode from 'jwt-decode';
import db from '../models/index';
require('dotenv').config();
import { TYPE_ROLE } from '../utils/constant';
const middlewareControllers = {
    verifyTokenAdmin: async (req, res, next) => {
        const token = req.headers.authorization;

        if (token) {
            try {
                const access_token = token.split(' ')[1];

                const sub = jwt_decode(access_token).sub;
                const user = await db.User.findOne({ where: { email: sub } });
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        errMessage: 'User is not exist',
                        refresh: true,
                    });
                }
                if (user && user.roleId === TYPE_ROLE.ROLE_ADMIN) {
                    req.user = user;
                    next();
                } else {
                    return res.status(403).json({
                        status: false,
                        errMessage: "You don't have permission",
                        refresh: true,
                    });
                }
            } catch (error) {
                return res.status(403).json({
                    status: false,
                    errMessage: 'Token is not valid',
                    refresh: true,
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authenticated",
                refresh: true,
            });
        }
    },
    verifyTokenAllRole: async (req, res, next) => {
        const token = req.headers.authorization;

        if (token) {
            try {
                const access_token = token.split(' ')[1];

                const sub = jwt_decode(access_token).sub;
                const user = await db.User.findOne({ where: { email: sub } });
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        errMessage: 'User is not exist',
                        refresh: true,
                    });
                }
                if (user && (user.roleId === TYPE_ROLE.ROLE_ADMIN || user.roleId === TYPE_ROLE.ROLE_MEMBER)) {
                    req.user = user;
                    next();
                } else {
                    return res.status(403).json({
                        status: false,
                        errMessage: "You don't have permission",
                        refresh: true,
                    });
                }
            } catch (error) {
                return res.status(403).json({
                    status: false,
                    errMessage: 'Token is not valid',
                    refresh: true,
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authentication",
                refresh: true,
            });
        }
    },
};
module.exports = middlewareControllers;
