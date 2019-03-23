const getInfo = require('../database/query/getInfo');
const { getTokenData } = require('./authentication/authinticate');
exports.get = (req, res) => {

   getTokenData(req.cookies.data, (err, result) => {
       console.log('resultttt', result.name)
       getInfo(result.id, (errGetInfo, resGetInfo) => {
           if(errGetInfo){
              console.log('errGetInfo',errGetInfo)
           }else {
               console.log('resGetInfo', resGetInfo)
               res.render('info', {resGetInfo, authenticated:true, result,                     css1: 'style/info.css',
            })
           }
       })
    })
}