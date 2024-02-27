/**
 * DiemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const validator = require('validator');

module.exports = {
  index: async (req, res) => {
    try{
    let allScore = await Diem.find();
    sails.log.info(`Getting all score success`);
    return res.json(allScore);
    }catch(error) {
      sails.log.error(`Error getting all score: ${error.message}`);
      return res.serverError(error);
    }
  },

  find: async (req, res) => {
    try{
    let id = req.params.id;
    let Score = await Diem.findOne({ id: id });
    if(!Score) {
      sails.log.warn(`Score with id ${id} not found`);
      return res.status(400).json({error: 'Not found id score'});
    }
    sails.log.info(`Get class with ${id} success.`)
    return res.json(Score);
    }catch(error) {
      sails.log.error(`Error getting all score: ${error.message}`);
      return res.serverError(error);
    }
  },

  create: async (req, res) => {
    try{
    let {MaSV, TenSV, DiemCC, DiemKT, DiemThi} = req.body;
    // if (!validator.isFloat(DiemCC, { min: 0 })) {
    //   sails.log.warn(`Diem chuyen can ${DiemCC} is invalid.`)
    //   return res.status(400).json({error: 'Diem chuyen can must be a number and >=0.'});
    // }
    // if (!validator.isFloat(DiemKT, { min: 0 })) {
    //   sails.log.warn(`Diem kiem tra ${DiemKT} is invalid.`)
    //   return res.status(400).json({error: 'Diem kiem tra must be a number and >=0.'});
    // }
    // if (!validator.isFloat(DiemThi, { min: 0 })) {
    //   sails.log.warn(`Diem thi ${DiemThi} is invalid.`)
    //   return res.status(400).json({error: 'Diem thi must be a number and >=0.'});
    // }
    let checkMaSV = await SinhVien.findOne({MaSV: MaSV});
    let checkTenSV = await SinhVien.findOne({TenSV: TenSV});
    if (!checkMaSV) {
      sails.log.warn(`Student with MaSV ${MaSV} not exits`);
      return res.status(400).json({error: 'Mã sinh viên không tồn tại', errorCode: 'NOTFOUND_MaSV'});
    }else if(!checkTenSV){
      sails.log.warn(`Student with TenSV ${TenSV} not exits`);
      return res.status(405).json({error: 'Tên sinh viên không tồn tại', errorCode: 'NOTFOUND_TenSV'});
    }
    let newScore = await Diem.create(req.body).fetch();
    sails.log.info(`Score with MaSV ${MaSV} has created`);
    return res.json(newScore);
  }catch(error) {
    sails.log.error(`Error create score: ${error.message}`);
    return res.serverError(error);
  }
  },

  update: async (req, res) => {
    try{
    let {MaSV, TenSV, DiemCC, DiemKT, DiemThi} = req.body;
    if (!validator.isFloat(DiemCC, { min: 0 })) {
      sails.log.warn(`Diem chuyen can ${DiemCC} is invalid.`)
      return res.status(400).json({error: 'Diem chuyen can must be a number and >=0.'});
    }
    if (!validator.isFloat(DiemKT, { min: 0 })) {
      sails.log.warn(`Diem kiem tra ${DiemCC} is invalid.`)
      return res.status(400).json({error: 'Diem kiem tra must be a number and >=0.'});
    }
    if (!validator.isFloat(DiemThi, { min: 0 })) {
      sails.log.warn(`Diem thi ${DiemCC} is invalid.`)
      return res.status(400).json({error: 'Diem thi must be a number and >=0.'});
    }
    let id = req.params.id;
    let updateScore = await Diem.updateOne({ id: id }).set(req.body);
    if(!updateScore) {
      sails.log.warn(`Score with id ${id} not updated`);
      return res.status(400).json({error: 'Not found id score.'});
    }
    sails.log.info(`Score with MaSV ${updateScore.MaSV} had updated.`);
    return res.json(updateScore);
    }catch(error) {
      sails.log.error(`Error update score: ${error.message}`);
      return res.serverError(error);
    }
  },

  destroy: async (req, res) => {
    try{
    let id = req.params.id
    let deletedScore = await Diem.destroyOne({ id: id });
    if(!deletedScore) {
      sails.log.warn(`Not found score id ${id}`);
      return res.status(400).json({error: 'Score delete not found.'});
    }
    sails.log.info(`Score with ${deletedScore.MaSV} has deleted.`);
    return res.ok();
  }catch(error) {
    sails.log.error(`Error update score: ${error.message}`);
    return res.serverError(error);
  }
}
};

