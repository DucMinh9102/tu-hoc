/**
 * DkyTinController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    register: async(req, res) => {
        try{ 
            let userId = User.Username;
            let {MaMH, TenMH} = req.body;
            // let checkUser = await DkyTin.findOne({UserId: userId});
            let checkSubject = await DkyTin.findOne({UserId: userId, MaMH: MaMH});
            if(checkSubject) {
                sails.log.warn(`Subject ${MaMH} had registed`);
                return res.status(400).json({error: 'Môn học đã được đăng ký', error: 'Subject_Registed'});
            }
            let existSubject = await MonHoc.findOne({MaMH: MaMH});
            let existName = await MonHoc.findOne({TenMH: TenMH});
            if (!existSubject) {
              sails.log.warn(`Subject with MaMH ${MaMH} not exits.`);
              return res.status(400).json({error: 'Mã môn học không tồn tại', errorCode: 'DUPLICATE_MH'});
            }else if(!existName) {
                sails.log.warn(`Subject with TenMH ${TenMH} is not exits.`);
                return res.status(400).json({error: 'TenMH is not exits', errorCode: 'Not_Found_TMH'});
            }
        let registSub = await DkyTin.create({UserId: userId, MaMH, TenMH}).fetch();
            sails.log.info(`RegistSub ${MaMH} success`);
            return res.json(registSub);
        }catch(error) {
            sails.log.error(`Error regesting subject: ${error.message}`)
            return res.serverError(error);
        }
    },
};

