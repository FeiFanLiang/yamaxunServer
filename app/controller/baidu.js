const Controller = require('../core/baseController');
const crypto = require('crypto');

class Baidu extends Controller {
    async getTransKey(){
        const {appKey,key} =  this.config.baiduConfig;
        const {ctx} = this;
        ctx.validate({
            query:{
                type:'string'
            }
        });
        const {query} = ctx.request.body
        const salt = Math.floor(Math.random() * new Date() * 1000000);
        let md5 = crypto.createHash('md5');
        const str1 = appKey + query + salt + key;
        let sign = md5.update(str1).digest('hex');
        this.success({
            salt:salt,
            sign:sign
        })
    }
}

module.exports = Baidu;