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
    let { MaSV, TenSV } = req.body;
    let existScore = await Diem.findOne({ MaSV: MaSV });
    if (existScore) {
      if (existScore.TenSV !== TenSV) {
        return res.status(400).json({ error: 'Tên sinh viên không đúng', errorCode: 'WRONG_TENSV' })
      } else {
        let newScore = await Diem.create(req.body).fetch();
        return res.json(newScore);
      }
    }
    return res.status(400).json({ error: 'Mã sinh viên không tồn tại', errorCode: 'NOTFOUND_MASV' })
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

