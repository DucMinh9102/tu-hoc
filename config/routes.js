/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  
  'POST  /auth/login': 'AuthController.login',
  'POST  /auth/logout': 'AuthController.logout',
  'POST  /auth/register': 'AuthController.register',

  //Sinh viên
  'GET /SinhVien': 'SinhVienController.index',
  'GET /SinhVien/:id': 'SinhVienController.find',
  'POST /SinhVien': 'SinhVienController.create',
  'PUT /SinhVien/:id': 'SinhVienController.update',
  'DELETE /SinhVien/:id': 'SinhVienController.destroy',

  //Khoa
  'GET /Khoa': 'KhoaController.index',
  'GET /Khoa/:id': 'KhoaController.find',
  'POST /Khoa': 'KhoaController.create',
  'PUT /Khoa/:id': 'KhoaController.update',
  'DELETE /Khoa/:id': 'KhoaController.destroy',

  //Môn học
  'GET /MonHoc': 'MonHocController.index',
  'GET /MonHoc/:id': 'MonHocController.find',
  'POST /MonHoc': 'MonHocController.create',
  'PUT /MonHoc/:id': 'MonHocController.update',
  'DELETE /MonHoc/:id': 'MonHocController.destroy',
  
  //Lớp
  'GET /Lop': 'LopController.index',
  'GET /Lop/:id': 'LopController.find',
  'POST /Lop': 'LopController.create',
  'PUT /Lop/:id': 'LopController.update',
  'DELETE /Lop/:id': 'LopController.destroy',

  //Điểm
  'GET /Diem': 'DiemController.index',
  'GET /Diem/:id': 'DiemController.find',
  'POST /Diem': 'DiemController.create',
  'PUT /Diem/:id': 'DiemController.update',
  'DELETE /Diem/:id': 'DiemController.destroy',
  //Đăng ký tín
  'POST /DkyTin': 'DkyTinController.register',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
