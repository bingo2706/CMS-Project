import db from "../models/index";
const { Op } = require("sequelize");

let handleCreateNewProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.contentMarkdown || !data.contentHTML) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !'
                })
            } else {
              
                    let res = await db.Project.create({
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                        statusId: data.statusId,
                        name: data.name,
                        startDate: data.startDate,
                        endDate:data.endDate
                    })
                    if(res && data.arrUserId && data.arrUserId.length > 0){
                        data.arrUserId = data.arrUserId.map(item => {return {...item,projectId:res.id}})
                        await db.Userproject.bulkCreate(data.arrUserId )
                    }
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                

            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewProject:handleCreateNewProject
}