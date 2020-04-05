const Service = require('egg').Service;
const qiniu = require('qiniu');
const qiniuOptions = {
    scope:'yamaxun',
    expires: 60
};
let QiniuInstance,mac;
class Qiniu extends Service {
    get QiniuInstance(){
        if(!QiniuInstance){
            const config = this.config.qiniuConfig;
            mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
            QiniuInstance = new qiniu.rs.PutPolicy(qiniuOptions);
            return QiniuInstance
        }
        return QiniuInstance;
    }
    getUploadKey(){
        const putPolicy = this.QiniuInstance;
        let uploadToken = putPolicy.uploadToken(mac)
        return uploadToken
    }
}

module.exports = Qiniu;