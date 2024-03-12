/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'isAuthorized',
  'AuthController': { 
    'register': true,
    'login': true, 
    'logout':true,
  },
  'SinhVienController': {
    'index': true,
    'find': true,
    'findStudentsByDepartment':true,
    'create': 'isAuthorized',
    'update': 'isAuthorized',
    'destroy': 'isAuthorized',
  },
  'KhoaController': {
    'index': true,
    'find': true,
    'create': 'isAuthorized',
    'update': 'isAuthorized',
    'destroy': 'isAuthorized',
  },
  'MonHocController': {
    'index': true,
    'find': true,
    'create': 'isAuthorized',
    'update': 'isAuthorized',
    'destroy': 'isAuthorized',
  },
  'DkyTinController': {
    'register': 'isAuthorized',
  },
  'LopController': {
    'index': true,
    'find': true,
    'create': 'isAuthorized',
    'update': 'isAuthorized',
    'destroy': 'isAuthorized',
  },
  'DiemController': {
    'index': true,
    'find': true,
    'create': 'isAuthorized',
    'update': 'isAuthorized',
    'destroy': 'isAuthorized',
  },
};
