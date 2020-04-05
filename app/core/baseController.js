const {Controller} = require('egg');

class BassController extends Controller {
    get user(){
        return this.ctx.session.userInfo
    }
    success(data){
        this.ctx.status = 200;
        this.ctx.body = {
            code: 0,
            data:data
        }
    }
    fail(data){
        this.ctx.status = 200;
        this.ctx.body = {
            err:1,
            msg:data || '请求错误'
        }
    }
    notFound(){
        this.ctx.status = 404;
    }
    accessFail(){
        this.ctx.status = 200;
        this.ctx.body = {
            code:-2,
            data:'无权操作'
        }
    }
    authFail(data){
        this.ctx.status = 200;
        this.ctx.body = {
            code:-1,
            data:data ||'登录失败'
        }
    }

}

module.exports = BassController