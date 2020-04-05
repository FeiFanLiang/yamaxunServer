const Controller = require('../core/baseController');

class User extends Controller {
    async index(){
        const {ctx,service} = this;
        const user = await service.user.getUserInfo(this.user.username);
        //const userRole = await service.user.getUserRole(this.user.username);
        this.success(user)
    }
    async show(){
        const {ctx,service} = this;
        ctx.validate({
            id:{
                type:'string',
                required:true
            }
        },ctx.params)
        const data = await service.user.getUserInfo(ctx.params.id)
        this.success(data)
    }
    async create(){
        const {ctx,service} = this;
        ctx.validate({
            username:{
                type:'string',
                required:true,
                min:6,
                max:14
            },
            password:{
                type:'string',
                required:true,
                min:8,
                max:14
            },
            userBand:{
                type:'string',
                required:true
            },
            eanPreNumber:{
                type:'string',
                required:true,
                min:7,
                max:7
            },
            email:{
                type:'string',
                required:true
            },
            phoneNumber:{
                type:'string',
                required:true,
                min:11,
                max:11
            }
        })
        const {username} =  ctx.request.body
        const user = await service.user.getUserInfo(username)
        if(user){
            this.fail('用户已存在')
        }else{
            await service.user.addUser(ctx.request.body)
            await service.user.addUserRole({username})
            this.success('注册成功')
        }
    }
    async update(){
        const {ctx,service} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        if(ctx.params.id !== this.user.username){
            this.notFound()
        }else{
            ctx.validate({
                password:{
                    type:'string',
                    required:false
                },
                userBand:{
                    type:'string',
                    required:false
                },
                eanPreNumber:{
                    type:'string',
                    required:false
                },
                email:{
                    type:'string',
                    required:false
                },
                userBand:{
                    type:'string',
                    required:false
                }
            })
            await service.user.updateUser(this.user.username,ctx.request.body)
            
             this.success('修改成功')
        }
        
        
    }
    async login(){
        const {ctx,service} = this;
        ctx.validate({  
            username:{
                type:'string',
                required:true
            },
            password:{
                type:'string',
                required:true
            }
        })
        const {username,password} = ctx.request.body
        const user = await service.user.checkPass(username,password)
        if(!user){
            this.fail('账号或密码错误')
        }else{
            if(+new Date() - user.expireTime > 0){
                this.fail('您的账号已到期')
                return
            }
            const data = await service.user.initializeUserInfo(username)
            const userInfo = await service.user.getUserInfo(username)
            ctx.session.userInfo = data
            this.success(userInfo)
        }
    }
    async logout(){
        const {ctx} = this;
        ctx.session = null;
        this.success('注销成功')
    }
    
    async checkPassword(){
        const {ctx,service} = this;
        ctx.validate({
            password:{
                type:'string'
            }
        });
        const user = await service.user.checkPass(this.user.username,password)
        if(!user){
            this.authFail('密码验证失败')
        }else{
            this.success('密码验证成功')
        }
    }
    async spiderLogin(){
        const {ctx,service} = this;
        ctx.validate({
            username:{
                type:'string'
            },
            password:{
                type:'string'
            }
        })
        const {username,password} = ctx.request.body;
        const user = await service.user.checkPass(username,password);
        if(!user){
            this.fail()
        }else{
            this.success('登录成功')
        }
    }
}
module.exports = User