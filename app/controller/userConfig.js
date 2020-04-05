const Controller = require('../core/baseController');

class UserConfig extends Controller {
    
    async create(){
        const {service,ctx} = this;
        ctx.validate({
            userBrand:{
                type:'string',
                required:false
            },
            manufacturer:{
                type:'string',
                required:false
            }
        })
        const {userBrand,manufacturer} = ctx.request.body;
        const {username} = this.user;
        if(!userBrand && !manufacturer){
            this.success('添加成功')
        }else{
            await service.user.addUserConfig(username,userBrand,manufacturer)
            this.success()
        }
    }
    async destroy(){
        const {ctx,service} = this;
        ctx.validate({
            type:{
                type:'string'
            },
            name:{
                type:'string'
            }
        })
        const {type,name} = ctx.request.body;
        const {username} = this.user
        await service.user.delUserConfig(type,name,username)
        this.success()
    }
}

module.exports = UserConfig