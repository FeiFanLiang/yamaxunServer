const Controller = require('../core/baseController');

class MerchanController extends Controller {
    async index(){
        const {ctx,service} = this;
        ctx.validate({
            isBox:{
                type:'number',
                convertType:'number'
            },
            merchanName:{
                type:'string',
                required:false
            },
            country:{
                type:'string',
                required:false
            },
            exportsCount:{
                type:'number',
                convertType:'number',
                required:false
            },
            lastTransTimeStart:{
                type:'string',
                required:false
            },
            lastTransTimeEnd:{
                type:'string',
                required:false
            },
            lastExportsTimeStart:{
                type:'string',
                required:false
            },
            lastExportsTimeEnd:{
                type:'string',
                required:false
            },
            creatTimeStart:{
                type:'string',
                required:false
            },
            creatTimeEnd:{
                type:'string',
                required:false
            },
            currentPage:{
                type:'number',
                convertType:'number',
                default:1,
                required:false
            },
            pageSize:{
                type:'number',
                convertType:'number',
                default:30,
                required:false
            }
        },ctx.query);
        let form = ctx.query;
        let username = this.user.username
        const {isBox} = ctx.query;
        let data;
        if(isBox){
            data = await service.merchan.getBoxMerList(form,username)
        }else {
            data = await service.merchan.getMerchanList(form,username);
        }
        this.success(data)
    }
    async show(){
        const {service,ctx} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        ctx.validate({
            isBox:{
                type:'number',
                convertType:'number'
            }
        },ctx.query)
        const username = this.user.username
        const {id} = ctx.params;
        let data;
        if(ctx.query.isBox){
            data = await service.merchan.getBoxMerFromId(id,username)
        }else{
            data = await service.merchan.getMerchanFromId(id,username)
        }
        this.success(data)
    }
    async merchanIdByAuth(){
        const {ctx,service} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        const {accessList} = this.user;
        const {id} = ctx.params;
        let data;
        if(this.user.role == 10){
            data = await service.merchan.getMerchanFromAuthId(id,accessList,true)
        }else{
            data = await service.merchan.getMerchanFromAuthId(id,accessList)
        }
        this.success(data)
    }
    async create(){
        const {service,ctx} = this;
        ctx.validate({
            merchanName:{
                type:'string'
            },
            price:{
                type:'number',
                convertType:'number'
            },
            merchanNumber:{
                type:'number',
                convertType:'number'
            },
            keyword:{
                type:'string',
                required:false
            },
            description:{
                type:'string'
            },
            skuNumber:{
                type:'string'
            },
            ean:{
                type:'string',
                required:false
            },
            model:{
                type:'string'
            },
            brand:{
                type:'string'
            },
            point1:{
                type:'string',
                required:false
            },
            point2:{
                type:'string',
                required:false
            },
            point3:{
                type:'string',
                required:false
            },
            point4:{
                type:'string',
                required:false
            },
            point5:{
                type:'string',
                required:false
            },
            manufacturer:{
                type:'string'
            },
            originUrl:{
                type:'string',
                required:false
            }
        })
        const form = ctx.request.body;
        form.user = this.user.username;
        await service.merchan.createSpiderMerchan(form)
        this.success('添加成功')
    }
    async spiderUpload() {
        const {service,ctx} = this;
        ctx.validate({
            merchanName:{
                type:'string'
            },
            price:{
                type:'number',
                convertType:'number'
            },
            originUrl:{
                type:'string'
            },
            description:{
                type:'string'
            },
            mainImgList:{
                type:'array'
            },
            username:{
                type:'string'
            },
            children:{
                type:'array'
            },
            platForm:{
                type:'string'
            }
        })
        const {
            username,
            mainImgList,
            description,
            originUrl,
            price,
            merchanName,
            children,
            platForm
        } = ctx.request.body;
        let form = {
            mainImgList,
            description,
            originUrl,
            price,
            merchanName,
            user:username,
            children,
            platForm
        }
        await service.merchan.createSpiderMerchan(form)
        this.success('添加成功')
    }
    async creatAmazonMer(){
        const {ctx,service} = this;
        const form = ctx.request.body;
        await service.merchan.creatAmazonMer(form,this.user.username)
        this.success('添加成功')
    }
    async update(){
        const {service,ctx} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        ctx.validate({
            merchanName:{
                type:'string'
            },
            merchanNumber:{
                type:'number',
                convertType:'number'
            },
            keyword:{
                type:'string',
                required:false
            },
            description:{
                type:'string'
            },
            skuNumber:{
                type:'string'
            },
            model:{
                type:'string'
            },
            brand:{
                type:'string'
            },
            point1:{
                type:'string',
                required:false
            },
            point2:{
                type:'string',
                required:false
            },
            point3:{
                type:'string',
                required:false
            },
            point4:{
                type:'string',
                required:false
            },
            point5:{
                type:'string',
                required:false
            },
            manufacturer:{
                type:'string'
            },
            mainImgList:{
                type:'array'
            },
            children:{
                type:'array',
                required:false
            }
        },ctx.request.body);
        const {id} = ctx.params;
        const form = ctx.request.body;
        const username = this.user.username
        await service.merchan.updateSpiderMerchan(id,form,username)
        this.success('提交成功')
    }
    async destroy(){
        const {service,ctx} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        ctx.validate({
            isBox:{
                type:'number',
                convertType:'number'
            }
        },ctx.request.body)
        const {id} = ctx.params;
        const {isBox} = ctx.request.body;
        const username = this.user.username;
        if(isBox){
            await service.merchan.deleteSpiderMer(id,username)
        }else{
            await service.merchan.deleteMer(id,username)
        }
        this.success('删除成功')
    }
    async listFromAuth(){
        const {ctx,service} = this;
        ctx.validate({
            merchanName:{
                type:'string',
                required:false
            },
            country:{
                type:'string',
                required:false
            },
            exportsCount:{
                type:'number',
                convertType:'number',
                required:false
            },
            lastTransTimeStart:{
                type:'string',
                required:false
            },
            lastTransTimeEnd:{
                type:'string',
                required:false
            },
            lastExportsTimeStart:{
                type:'string',
                required:false
            },
            lastExportsTimeEnd:{
                type:'string',
                required:false
            },
            creatTimeStart:{
                type:'string',
                required:false
            },
            creatTimeEnd:{
                type:'string',
                required:false
            },
            username:{
                type:"string",
                required:false
            },
            currentPage:{
                type:'number',
                convertType:'number',
                default:1,
                required:false
            },
            pageSize:{
                type:'number',
                convertType:'number',
                default:30,
                required:false
            }
        },ctx.query)
        const form = ctx.query;
        const {role,accessList} = this.user;
        let data;
        if(role < 1){
            this.notFound()
        }else if (accessList.length == 0){
            this.success([])
        }else if (role === 10){
            data = await service.merchan.listFormAuth(form,accessList,true)
            this.success(data)
        }else{
            data = await service.merchan.listFormAuth(form,accessList)
            this.success(data)
        }
    }
    async getTemplate(){
        const {ctx,service} = this;
        ctx.validate({
            ids:{
                type:'array'
            },
            template:{
                type:'string'
            }
        },ctx.request.body);
        const {ids,template} = ctx.request.body;
        let templateData = await service.merchan.getTemplate(template);
        if(!templateData){
            this.success([])
            return
        }
        let data = await service.merchan.getFormatMerchan(ids)
        this.success({
            template:templateData,
            data:data
        })
    }
    async getTemplateAuth(){
        const {ctx,service} = this;
        ctx.validate({
            ids:{
                type:'array'
            },
            template:{
                type:'string'
            }
        },ctx.request.body);
        if(this.user.role < 1){
            this.success([])
            return
        }
        const {ids,template} = ctx.request.body;
        let templateData = await service.merchan.getTemplate(template);
        if(!templateData){
            this.success([])
            return
        }
        let data = await service.merchan.getFormatMerchan(ids,true)
        this.success({
            template:templateData,
            data:data
        })
    }
    async getOrigin(){
        const {ctx,service} = this;
        ctx.validate({
            skuNumber:{
                type:'string'
            }
        },ctx.query)
        const {skuNumber} = ctx.query;
        let data = await service.merchan.findOriginUrl(skuNumber,this.user)
        this.success(data)
    }
    async updatePoints(){
        const {ctx,service} = this;
        ctx.validate({
            id:{
                type:'array'
            },
            keyword:{
                type:'string'
            },
            point1:{
                type:'string'
            },
            point2:{
                type:'string'
            },
            point3:{
                type:'string'
            },
            point4:{
                type:'string'
            },
            point5:{
                type:'string'
            }
        });
        const {id,point1,point2,point3,point4,point5,keyword} = ctx.request.body;
        const {username} = this.user
        await service.merchan.updatePoints({id,point1,point2,point3,point4,point5,keyword,user:username})
        this.success()
    }
}

module.exports = MerchanController;