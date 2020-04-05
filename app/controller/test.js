const Controller = require('../core/baseController');

function a(){
    return '1'
}

class Test extends Controller {
    async index(){
        let c =  a();
        this.success(c)
    }
}

module.exports = Test;