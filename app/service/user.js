const {Service} = require('egg');

class UserService extends Service {
    async initializeUserInfo(username){
        const user = await this.getUserInfo(username)
        if(!user){
            return null
        }
        const userRole = await this.getUserRole(username)
        let userInfo = Object.assign({},user,userRole)
        return userInfo
    }
    async checkPass(username,password){
        const {app} = this;
        return await app.model.User.findOne({
            username:username,
            password:password
        })
    }
    async addUser(user){
        const {app} = this;
        await app.model.User(user).save()
    }
    async addUserRole({username,role=0,creatBy='admin'} = {}){
        const {app} = this;
        let user = {
            username,
            role,
            creatBy
        }
        if(role == 1){
            user.creatLimit = 10
        }
        if(role == 2){
            user.creatLimit = 20
        }
        await app.model.UserRole(user).save()
    }
    async getAllUserInfo(parmas){

        const {app,ctx} = this;
        let {query,options} = ctx.helper.userQuery(parmas)
        if(parmas.username){
            query.username = parmas.username
        }else{
            query.username = {
                $ne:'admin'
            }
        }
        let data = await app.model.User.paginate(query,options)
        return data
    }
    async getUserInfo(username){
        const {app} = this;
        return await app.model.User.findOne({
            username:username
        }).lean(true)
    }
    async getUserRole(username){
        const {app} = this;
        return await app.model.UserRole.findOne({
            username:username
        }).lean(true)
    }
   
    async getCreatFormUser(username){
        const {app} = this;
        return await app.model.User.find({
            creatBy:username
        }).lean(true)
    }
    
    async getUserSubs(params,userList){
        const {app,ctx} = this;
        let {query,options} = ctx.helper.userQuery(params)
        if(params.username){
            query.username = params.username
        }else{
            query.username = {
                $in:userList
            }
        }
        let data = await app.model.User.paginate(query,options)
        return data
    }
    async updateUser(username,form){
        const {app} = this;
        if(Object.keys(form).length > 0){
            await app.model.User.updateOne({
                username:username                  
            },form)
        }
    }
    async creatUserFormAuth(creatUsername,form){
        const {app} = this;
        const {username,password,role,expireTime} = form;
        const exsits = await app.model.User.findOne({
            username:username
        })
        if(exsits){
            return false
        }
        await new app.model.User({
            username,
            password,
            role,
            expireTime:expireTime
        }).save()
        let creatUser = await app.model.UserRole.findOneAndUpdate({
            username:creatUsername
        },{
            $push:{
                creatList:username,
                accessList:username
            }
        })
        if(creatUser.creatBy !== 'admin'){
            await app.model.UserRole.updateOne({
                username:creatUser.creatBy
            },{
                $push:{
                    accessList:username
                }
            })
        }
        
        return true
    }
    async updateExpireTime(id,expireTime){
        const {app} = this;
        await app.model.User.updateOne({
            _id:app.mongoose.Types.ObjectId(id)
        },{
            expireTime:expireTime
        })
    }
    async addUserConfig(username,userBrand,manufacturer){
        const {app} = this;
        let data;
        if(userBrand){
            data = await app.model.User.updateOne({
                username:username
            },{
                $addToSet:{
                    userBrand:userBrand
                }
            }).lean(true)
        }
        if(manufacturer){
            data = await app.model.User.updateOne({
                username:username
            },{
                $addToSet:{
                    manufacturer:manufacturer
                }
            }).lean(true)
        }
        return data
    }
    async delUserConfig(type,name,username){
        const {app} = this;
        let data;
        if(type == 'userBrand'){
            data = await app.model.User.updateOne({
                username:username
            },{
                $pull:{
                    userBrand:name
                }
            })
        }else{
            data = await app.model.User.updateOne({
                username:username
            },{
                $pull:{
                    manufacturer:name
                }
            })
        }
        return data
    }
}
module.exports = UserService