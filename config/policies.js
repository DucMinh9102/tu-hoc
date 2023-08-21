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

  '*': 'authenticated',
  'auth': {
    '*': true
  },
  'AuthController': { 
    'register': true,
    'login': true, 
  },
  'SinhVienController': {
    'index': true,
    'find': true,
    'create': 'authenticated',
    'update': 'authenticated',
    'destroy': 'authenticated',
  },
  'KhoaController': {
    'index': true,
    'find': true,
    'create': 'authenticated',
    'update': 'authenticated',
    'destroy': 'authenticated',
  },
  'MonHocController': {
    'index': true,
    'find': true,
    'create': 'authenticated',
    'update': 'authenticated',
    'destroy': 'authenticated',
  },
  'LopController': {
    'index': true,
    'find': true,
    'create': 'authenticated',
    'update': 'authenticated',
    'destroy': 'authenticated',
  },
  'DiemController': {
    'index': true,
    'find': true,
    'create': 'authenticated',
    'update': 'authenticated',
    'destroy': 'authenticated',
  },
};
