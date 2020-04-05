const Controller = require('../core/baseController');

class Qiniu extends Controller {
    async getUploadKey(){
        const {service} = this;
        let key = service.qiniu.getUploadKey()
        this.success(key)
    }
}


module.exports = Qiniu;