/**
 * MonHocController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async(req, res) => {
    let allSubject = await MonHoc.find();
    return res.json(allSubject);
  },

  find: async(req, res) =>{
    let id = req.params.id;
    let Subject = await MonHoc.findOne({id: id});
    return res.json(Subject);
  },

  create: async(req, res) => {
    let {MaMH} = req.body;
    let existSubject = await MonHoc.findOne({MaMH: MaMH});
    if (existSubject) {
      return res.status(400).json({error: 'Mã môn học đã tồn tại', errorCode: 'DUPLICATE_MH'});
    }
    let newSubject = await MonHoc.create(req.body).fetch();
    return res.json(newSubject);
  },

  update: async(req, res) => {
    let id = req.params.id;
    let updateSubject = await MonHoc.updateOne({id: id}).set(req.body);
    return res.json(updateSubject);
  },

  destroy: async(req, res) => {
    let id = req.params.id;
    await MonHoc.destroyOne({id: id});
    return res.ok()
  }
};

