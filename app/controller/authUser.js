const baseController = require('../core/baseController');

class AuthUser extends baseController {
    async index() {
        const { service, ctx } = this;
        const { userInfo } = ctx.session;
        let data;
        const { currentPage, pageSize, username, creatTimeStart, creatTimeEnd,role } = ctx.request.query;
        let params = {
            currentPage,
            pageSize,
            username,
            creatTimeStart,
            creatTimeEnd,
            role
        }

        if (userInfo.role === 10) {

            data = await service.user.getAllUserInfo(params)
        } else {
            const { accessList } = this.user;
            if ((username && accessList.indexOf(username) < 0) || accessList.length == 0) {
                this.success({
                    docs: [],
                    totalDocs: 0,
                    page: 1,
                    totalPages: 1
                })
                return
            }
            data = await service.user.getUserSubs(params, accessList)
        }
        this.success(data)
    }
    async show() {
        const { service, ctx } = this;
        ctx.validate({
            id: {
                type: 'string'
            }
        }, ctx.params)
        if (this.user.username != ctx.params.id) {
            this.accessFail('?')
        } else {
            let userRole = await service.user.getUserRole(ctx.params.id)
            this.success(userRole)
        }
    }
    async create() {
        const { service, ctx } = this;
        ctx.validate({
            username: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            },
            role: {
                type: 'number',
                required: true,
                convertType: 'number'
            },
            expireTime:{
                type:'number',
                required:true,
                convertType:'number'
            }
        })
        const { role, username } = ctx.request.body
        if (this.user.role === 10 && role < 10) {
            let r = await service.user.creatUserFormAuth(this.user.username, ctx.request.body)
            if (!r) {
                this.fail('已存在用户')
                return
            }
            await service.user.addUserRole({ username, role })
            this.success('添加成功')
        } else {
            if (this.user.role > 0 && (this.user.creatLimit - this.user.creatList.length) > 0 && this.user.role > role) {
                let r = await service.user.creatUserFormAuth(this.user.username, ctx.request.body)
                if (!r) {
                    this.fail('已存在用户')
                    return
                }
                await service.user.addUserRole({ username, role, creatBy: this.user.username })
                let userInfo = await service.user.initializeUserInfo(this.user.username)
                ctx.session.userInfo = userInfo
                this.success('添加成功')
            } else {
                this.notFound()
            }
        }
    }
    async updateExpireTime(){
        const {service,ctx} = this;
        ctx.validate({
            id:{
                type:'string',
                required:true
            },
            expireTime:{
                type:'number',
                required:true,
                convertType:'number'
            }
        },ctx.query) 
        const {id,expireTime} = ctx.query;
        if(this.user.role === 10 || this.user.accessList.indexOf(id) > -1){
            await service.user.updateExpireTime(id,expireTime)
        }
        this.success()
    }
    async update() {
        const { service, ctx } = this;
        ctx.validate({
            id: {
                type: 'string',
                required: true
            }
        }, ctx.params)
        ctx.validate({
            password: {
                type: 'string'
            }
        })
        const { id } = ctx.params
        if (this.user.role === 10 || this.user.accessList.indexOf(id) > -1) {
            await service.user.updateUser(id, ctx.request.body)
            this.success('修改成功')
        } else {
            this.success('?')
        }
    }
}

module.exports = AuthUser