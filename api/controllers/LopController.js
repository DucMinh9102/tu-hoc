/**
 * LopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const e = require("cors");

module.exports = {
  index: async(req, res) => {
    let allClass = await Lop.find();
    return res.json(allClass);
  },

  find: async(req, res) => {
    let id = req.params.id;
    let Class = await Lop.findOne({id: id});
    return res.json(Class);
  },

  create: async(req, res) => {
    let {MaLop} = req.body;
    let existClass = await Lop.findOne({MaLop: MaLop});
    if (existClass) {
        return res.status(400).json({error: 'Mã lớp đã tồn tại', errorCode: 'DUPLICATE_LOP'});
    }
    let newClass = await Lop.create(req.body).fetch();
    return res.json(newClass);
  },

  update: async(req, res) => {
    let id = req.params.id;
    let updateClass = await Lop.updateOne({id: id}).set(req.body);
    return res.json(updateClass);
  },

  destroy: async(req, res) => {
    let id = req.params.id;
    await Lop.destroyOne({id: id})
    return res.ok();
  }
};

