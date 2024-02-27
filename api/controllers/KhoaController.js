/**
 * KhoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const validator = require('validator');

module.exports = {
  index: async(req, res) => {
  try{
    let allDept = await Khoa.find();
    sails.log.info(`Get all dept success`);
    return res.json(allDept);
  } catch (error) {
    sails.log.error(`Error getting all dept: ${error.message}`);
    return res.serverError(error);
  }
  },

  find: async(req, res) => {
    try{
    let id = req.params.id;
    let Dept = await Khoa.findOne({id: id});
    if (!Dept) {
      sails.log.warn(`Dept with id ${id} not found`);
      return res.status(404).json({ error: 'Dept not found', errorCode: 'DEPT_NOT_FOUND' });
    }
    sails.log.info(`Get dept with id ${id} success`);
    return res.json(Dept);
    }catch (error) {
      sails.log.error(`Error getting dept: ${error.message}`);
      return res.serverError(error);
    }
  },

  create: async(req, res) => {
    try{
    let {MaKhoa, TenKhoa, SoLop} = req.body;
    if (!validator.isInt(SoLop, { min: 1 })) {
      sails.log.warn(`SoLop ${SoLop} is invalid.`)
      return res.status(400).json({error: 'So lop must be a number and >=1.'});
    }
    let existDept = await Khoa.findOne({MaKhoa: MaKhoa});
    if (existDept) {
      sails.log.warn(`Dept with MaKhoa ${MaKhoa} already exists.`);
      return res.status(400).json({error: 'Mã khoa đã tồn tại', errorCode: 'DUPLICATE_KHOA'});
    }
      let newDept = await Khoa.create(req.body).fetch();
      sails.log.info(`Create MaKhoa ${newDept.MaKhoa} success.`)
      return res.json(newDept);
  }catch (error) {
    sails.log.error(`Error creating dept: ${error.message}`);
    return res.serverError(error);
  }
  },

  update: async(req, res) => {
    try{
    let {SoLop} = req.body;
    if (!validator.isInt(SoLop, { min: 1 })) {
      sails.log.warn(`SoLop ${SoLop} is invalid.`)
      return res.status(400).json({error: 'SoLop must be a number and >=1.'});
    }
    let id = req.params.id;
    let updateDept = await Khoa.updateOne({id: id}).set(req.body);
    if (!updateDept) {
      sails.log.warn(`Dept with id ${id} not found.`);
      return res.status(400).json({error: 'Dept not found', errorCode:'Dept_Not_Found'});
    }
    sails.log.info(`Update dept with MaKhoa ${updateDept.MaKhoa} success`)
    return res.json(updateDept);
    }catch(error) {
      sails.log.error(`Error updating dept: ${error.message}`);
      return res.serverError(error);
    }
  },

  destroy: async(req,res) => {
    try{
    let id = req.params.id;
    let deletedKhoa = await Khoa.destroyOne({id: id})
    if(!deletedKhoa) {
      sails.log.warn(`Delete dept with id ${id} not found.`)
      return res.status(400).json({error:'Not found id dept', errorCode:'Not_Found_idDept'});
    }
    await Khoa.destroyOne({id: id})
    sails.log.info(`Delete dept with MaKhoa ${deletedKhoa.MaKhoa} success`);
    return res.ok();
    }catch(error) {
      sails.log.error(`Error deleting dept: ${error.message}`);
      return res.serverError(error);
    }
  }
};

