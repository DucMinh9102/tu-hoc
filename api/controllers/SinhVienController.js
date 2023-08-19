/**
 * SinhVienController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: async(req, res) => {
        let allStudents = await SinhVien.find();
        return res.json(allStudents);
      },
    
      find: async(req, res) => {
        let id = req.params.id;
        let student = await SinhVien.findOne({ id: id });
        return res.json(student);
      },
    
      create: async(req, res) => {
        let {MaSV} = req.body;
        let existStudent = await SinhVien.findOne({MaSV: MaSV});
        if (existStudent) {
          return res.status(400).json({error: 'Mã sinh viên đã tồn tại', errorCode: 'DUPLICATE_SV'});
        }
        let newStudent = await SinhVien.create(req.body).fetch();
        return res.json(newStudent);
      },
    
      update: async(req, res) => {
        let id = req.params.id;
        let updatedStudent = await SinhVien.updateOne({ id: id }).set(req.body);
        return res.json(updatedStudent);
      },
    
      destroy: async(req, res) => {
        let id = req.params.id;
        await SinhVien.destroyOne({ id: id });
        return res.ok();
      },

};

