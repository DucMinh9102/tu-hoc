/**
 * SinhVienController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  findStudentsByDepartment: async (req, res) => {
    try {
      let departmentName = req.params.departmentName;
  
      let students = await SinhVien.find({ TenKhoa: departmentName });
  
      if (!students || departmentName.length === 0) {
        sails.log.warn(`No students found in department ${departmentName}`);
        return res.status(404).json({ error: 'No students found in the department', errorCode: 'NO_STUDENTS_FOUND' });
      }
  
      sails.log.info(`Get students in department ${departmentName} success`);
      return res.json(students);
    } catch (error) {
      sails.log.error(`Error finding students by department: ${error.message}`);
      return res.serverError(error);
    }
  },

  index: async (req, res) => {
    try {
      let allStudents = await SinhVien.find();
      sails.log.info('Get all students success');
      return res.json(allStudents);
    } catch (error) {
      sails.log.error(`Error getting all students: ${error.message}`);
      return res.serverError(error);
    }
  },

  find: async (req, res) => {
    try {
      let id = req.params.id;
      let student = await SinhVien.findOne({ id: id });
      if (!student) {
        sails.log.warn(`Student with id ${id} not found`);
        return res.status(404).json({ error: 'Student not found', errorCode: 'STUDENT_NOT_FOUND' });
      }
      sails.log.info(`Get student with id ${id} success`);
      return res.json(student);
    } catch (error) {
      sails.log.error(`Error getting student: ${error.message}`);
      return res.serverError(error);
    }
  },

  create: async (req, res) => {
    try {
      let { MaSV, TenLop } = req.body;
      let existStudent = await SinhVien.findOne({ MaSV: MaSV });
      if (existStudent) {
        sails.log.warn(`Student with MaSV ${MaSV} already exists.`);
        return res.status(400).json({ error: 'Mã sinh viên đã tồn tại', errorCode: 'DUPLICATE_SV' });
      }
      let existClass = await Lop.findOne({TenLop: TenLop});
      if (!existClass) {
        sails.log.warn(`Class with name ${TenLop} not exist.`);
        return res.status(400).json({error: 'Tên lớp không tồn tại'});
      }
      let newStudent = await SinhVien.create(req.body).fetch();
      sails.log.info(`Add student with MaSV ${newStudent.MaSV} success.`);
      return res.json(newStudent);
    } catch (error) {
      sails.log.error(`Error creating student: ${error.message}`);
      return res.serverError(error);
    }
  },

  update: async (req, res) => {
    try {
      let id = req.params.id;
      let updatedStudent = await SinhVien.updateOne({ id: id }).set(req.body);
      if (!updatedStudent) {
        sails.log.warn(`Student with id ${id} not found for update.`);
        return res.status(404).json({ error: 'Student not found for update', errorCode: 'STUDENT_NOT_FOUND' });
      }
      sails.log.info(`Update student with MaSV ${updatedStudent.MaSV} success.`);
      return res.json(updatedStudent);
    } catch (error) {
      sails.log.error(`Error updating student: ${error.message}`);
      return res.serverError(error);
    }
  },

  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      let deletedStudent = await SinhVien.destroyOne({ id: id });
      if (!deletedStudent) {
        sails.log.warn(`Student with id ${id} not found for delete.`);
        return res.status(404).json({ error: 'Student not found for delete', errorCode: 'STUDENT_NOT_FOUND' });
      }
      sails.log.info(`Delete student with MaSV ${deletedStudent.MaSV} success.`);
      return res.ok();
    } catch (error) {
      sails.log.error(`Error deleting student: ${error.message}`);
      return res.serverError(error);
    }
  },
};


