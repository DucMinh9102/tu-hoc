/**
 * MonHocController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//validate data, log ra file, thêm đăng ký tín cho sinh viên 

const validator = require('validator');

module.exports = {
  index: async(req, res) => {
    try{
    let allSubject = await MonHoc.find();
    sails.log.info(`Get all subject success.`)
    return res.json(allSubject);
  }catch(error) {
    sails.log.error(`Error getting all subject: ${error.message}`);
    return res.serverError(error);
  }
  },

  find: async(req, res) =>{
    try{
    let id = req.params.id;
    let Subject = await MonHoc.findOne({id: id});
    if(!Subject) {
      sails.log.warn(`Subject with id ${id} not found`);
      return res.status(400).json({error: 'Not found id subject', errorCode:'Not_Found_idSubject'})
    }
    sails.log.info(`Get subject with ${id} success.`)
    return res.json(Subject);
    }catch(error) {
      sails.log.error(`Error getting all subject: ${error.message}`);
      return res.serverError(error);
    }
  },

  create: async(req, res) => {
    try{
    // let UserName = req.user.UserName;
    let {MaMH, TenMH, SoTinChi} = req.body;
    if (!validator.isInt(SoTinChi, { min: 1 })) {
      sails.log.warn(`SoTinChi ${SoTinChi} is invalid.`)
      return res.status(400).json({error: 'So tin chi must be a number and >=1.'});
    }
    let existSubject = await MonHoc.findOne({MaMH: MaMH});
    if (existSubject) {
      sails.log.warn(`Subject with MaMH ${MaMH} already exits.`);
      return res.status(400).json({error: 'Mã môn học đã tồn tại', errorCode: 'DUPLICATE_MH'});
    }
    let newSubject = await MonHoc.create(req.body).fetch();
    sails.log.info(`Subject with MaMH ${newSubject.MaMH} has created.`);
    return res.json(newSubject);
  }catch(error) {
    sails.log.error(`Error creating subject: ${error.message}`);
    return res.serverError(error);
  }
  },

  update: async(req, res) => {
    try{
    let {MaMH, TenMH, SoTinChi} = req.body;
    if (!validator.isInt(SoTinChi, { min: 1 })) {
      sails.log.warn(`SoTinChi ${SoTinChi} is invalid.`)
      return res.status(400).json({error: 'So tin chi must be a number and >=1.'});
    }
    let id = req.params.id;
    let updateSubject = await MonHoc.updateOne({id: id}).set(req.body);
    if(!updateSubject) {
      sails.log.warn(`Subject with id ${id} not found.`);
      return res.status(400).json({error: 'Not found id delete subject'});
    }
    sails.log.info(`Subject with MaMH ${updateSubject.MaMH} has update.`);
    return res.json(updateSubject);
    }catch(error) {
      sails.log.error(`Error udating subject: ${error.message}`);
      return res.serverError(error);
    }
  },

  destroy: async(req, res) => {
    try{
    let id = req.params.id;
    let deletedSubject = await MonHoc.destroyOne({id: id});
    if(!deletedSubject) {
      sails.log.warn(`Subject with id ${id} not found for delete.`);
      return res.status(400).json({error: 'Delete subject not found'});
    }
    sails.log.info(`Delete subject with MaMH ${deletedSubject.MaMH} success.`);
    return res.ok()
  }catch(error) {
    sails.log.error(`Error creating subject: ${error.message}`);
    return res.serverError(error);
  }
}
};

