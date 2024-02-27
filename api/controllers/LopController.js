/**
 * LopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const e = require("cors");
const validator = require('validator');

module.exports = {
  index: async(req, res) => {
    try{
    let allClass = await Lop.find();
    sails.log.info(`Get all class success`);
    return res.json(allClass);
    }catch(error) {
      sails.log.error(`Error getting all student: ${error.message}`);
      return res.serverError(error);
    }
  },

  find: async(req, res) => {
    try{
    let id = req.params.id;
    let Class = await Lop.findOne({id: id});
    if(!Class) {
      sails.log.warn(`Class with id ${id} not found`);
      return res.status(400).json({error: 'Not found id class', errorCode:'Not_Found_idClass'})
    }
    sails.log.info(`Get class with ${id} success.`)
    return res.json(Class);
    }catch(error) {
      sails.log.error(`Error getting class: ${error.message}`);
      return res.serverError(error);
    }
  },

  create: async(req, res) => {
    try{
    let {MaLop, SiSo} = req.body;
    if (!validator.isInt(SiSo, { min: 1 })) {
      sails.log.warn(`SiSo ${SiSo} is invalid.`)
      return res.status(400).json({error: 'SiSo must be a number and >=1.'});
    }
    let existClass = await Lop.findOne({MaLop: MaLop});
    if (existClass) {
      sails.log.warn(`Class with MaLop ${MaLop} already exits.`);  
      return res.status(400).json({error: 'Mã lớp đã tồn tại', errorCode: 'DUPLICATE_LOP'});
    }
    let newClass = await Lop.create(req.body).fetch();
    sails.log.info(`Class with MaLop ${newClass.MaLop} has created.`);
    return res.json(newClass);
  }catch(error) {
    sails.log.error(`Error crating class: ${error.message}`);
    return res.serverError(error);
  }
  },

  update: async(req, res) => {
    try{
    let {SiSo} = req.body;
    if (!validator.isInt(SiSo, { min: 1 })) {
      sails.log.warn(`SiSo ${SiSo} is invalid.`)
      return res.status(400).json({error: 'SiSo must be a number and >=1.'});
    }
    let id = req.params.id;
    let updateClass = await Lop.updateOne({id: id}).set(req.body);
    if(!updateClass) {
      sails.log.warn(`Class with id ${id} not updated`);
      return res.status(400).json({error: 'Not found id class'});
    }
    sails.log.info(`Class with MaLop ${updateClass.MaLop} had updated.`);
    return res.json(updateClass);
    }catch(error) {
      sails.log.error(`Error update class: ${error.message}.`);
      return res.serverError(error);
    }
  }, 

  destroy: async(req, res) => {
    try{
    let id = req.params.id;
    let deletedClass = await Lop.destroyOne({id: id})
    if (!deletedClass){
      sails.log.warn(`Not found class id ${id}`);
      return res.status(400).json({error: 'Class delete not found'})
    }
    sails.log.info(`Class with MaLop ${deletedClass.Malop} had deleted`);
    return res.ok();
  }catch(error){
    sails.log.error(`Error delete class: ${error.message}.`);
    return res.serverError(error);
  }
}
};

