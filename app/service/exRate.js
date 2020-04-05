const Service = require('egg').Service;

class ExRateService extends Service {
    async getExRate(name){
        const {app} = this;
        let data = await app.model.ExRate.findOne({
            name:name
        }).lean(true)
        return data
    }
}

module.exports = ExRateService;