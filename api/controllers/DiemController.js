/**
 * DiemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    let allScore = await Diem.find();
    return res.json(allScore);
  },

  find: async (req, res) => {
    let id = req.params.id;
    let Score = await Diem.findOne({ id: id });
    return res.json(Score);
  },

  create: async (req, res) => {
    let {MaSV, TenSV} = req.body;
    let checkMaSV = await SinhVien.findOne({MaSV: MaSV});
    let checkTenSV = await SinhVien.findOne({TenSV: TenSV});
    if (!checkMaSV) {
      return res.status(400).json({error: 'Mã sinh viên không tồn tại', errorCode: 'NOTFOUND_MaSV'});
    }else if(!checkTenSV){
      return res.status(405).json({error: 'Tên sinh viên không tồn tại', errorCode: 'NOTFOUND_TenSV'});
    }
    let newScore = await Diem.create(req.body).fetch();
    return res.json(newScore);
  },

  update: async (req, res) => {
    let id = req.params.id;
    let updateScore = await Diem.updateOne({ id: id }).set(req.body);
    return res.json(updateScore);
  },

  destroy: async (req, res) => {
    let id = req.params.id
    await Diem.destroyOne({ id: id });
    return res.ok();
  }
};

