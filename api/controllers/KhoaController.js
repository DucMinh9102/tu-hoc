/**
 * KhoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async(req, res) => {
    let allDept = await Khoa.find();
    return res.json(allDept);
  },

  find: async(req, res) => {
    let id = req.params.id;
    let Dept = await Khoa.findOne({id: id});
    return res.json(Dept);
  },

  create: async(req, res) => {
    let {MaKhoa} = req.body;
    let existDept = await Khoa.findOne({MaKhoa: MaKhoa});
    if (existDept) {
      return res.status(400).json({error: 'Mã khoa đã tồn tại', errorCode: 'DUPLICATE_KHOA'});
    }
      let newDept = await Khoa.create(req.body).fetch();
      return res.json(newDept);
  },

  update: async(req, res) => {
    let id = req.params.id;
    let updateDept = await Khoa.updateOne({id: id}).set(req.body);
    return res.json(updateDept);
  },

  destroy: async(req,res) => {
    let id = req.params.id;
    await Khoa.destroyOne({id: id})
    return res.ok();
  }
};

