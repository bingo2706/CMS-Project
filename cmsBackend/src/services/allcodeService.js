import db from "../models/index";
const { Op } = require("sequelize");

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                resolve({
                    errCode: 0,
                    data: allcode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
 
    getAllCodeService: getAllCodeService,
   
}