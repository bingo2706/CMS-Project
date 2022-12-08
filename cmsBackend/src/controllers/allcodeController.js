import allcodeService from '../services/allcodeService';

let getAllCodeService = async (req, res) => {
    try {
        let data = await allcodeService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
   
    getAllCodeService: getAllCodeService,
   
}