const Service = require('egg').Service;
const moment = require('moment');
class MerchanService extends Service {
    async getMerchanList(form, username) {
        const { ctx, app } = this;
        let { query, options } = ctx.helper.merQueryConst(form, username);
        let data = await app.model.Merchan.paginate(query, options)
        return data
    }
    async getBoxMerList(form, username) {
        const { ctx, app } = this;
        let { query, options } = ctx.helper.merQueryConst(form, username);
        let data = await app.model.SpiderMerchan.paginate(query, options)
        return data
    }
    async getMerchanFromId(id, username) {
        const { app } = this;
        let data = await app.model.Merchan.findOne({
            _id: app.mongoose.Types.ObjectId(id),
            user: username
        })
        return data
    }
    async getBoxMerFromId(id, username) {
        const { app } = this;
        let data = await app.model.SpiderMerchan.findOne({
            _id: app.mongoose.Types.ObjectId(id),
            user: username
        })
        return data
    }
    async createSpiderMerchan(form) {
        const { app } = this;
        await new app.model.SpiderMerchan(form).save()
    }
    async creatAmazonMer(form, username) {
        const { app,ctx} = this;
        const { _id,condition_type,originUrl, children, mainImgList, manufacturer, point2, point2_trans, point3, point3_trans, point4, point4_trans, point5, point5_trans, point1_trans, point1, brand, model, ean, skuNumber, merchanName, merchanName_trans, site, categoryTypeId, categoryPath, productType, variType, price, merchanNumber, keyword, description, description_trans } = form;
        await app.model.SpiderMerchan.updateOne({
            user:username,
            _id:app.mongoose.Types.ObjectId(_id)
        },{
            lastTransTime:moment().format('YYYY-MM-DD HH:mm:ss')
        },{
            upsert:true
        })
       
        let priceRule = await app.model.PriceRules.findOne({
            user:username,
            country:site
        }).lean(true)
        if(priceRule){
            let rateName = ctx.helper.translateExRate(site)
            let exRate = await app.model.ExRate.findOne({
                name:rateName
            }).lean(true)
            if(children.length){
                children.forEach(el => {
                    let newPrice = Math.ceil((el.childPrice * priceRule.times + priceRule.carriage) / exRate.rate * 1.5)
                    el.childPrice = newPrice
                })
            }else{
                price = Math.ceil((price * priceRule.times + priceRule.carriage) / exRate.rate * 1.5)
            }
        }
        let newForm = {
            originUrl,
            children,
            mainImgList,
            manufacturer,
            point2,
            point2_trans,
            point3,
            point3_trans,
            point4,
            point4_trans,
            point5,
            point5_trans,
            point1_trans,
            point1,
            brand,
            model,
            ean,
            skuNumber,
            merchanName,
            merchanName_trans,
            country:site,
            categoryTypeId,
            categoryPath,
            condition_type,
            productType,
            variType, price, merchanNumber, keyword, description, description_trans,
            user: username
        }
        await new app.model.Merchan(newForm).save()
    }
    async updateSpiderMerchan(id, form, username) {
        const { app } = this;
        const { merchanName, price, merchanNumber, keyword, description, skuNumber, model, brand, point1, point2, point3, point4, point5, manufacturer, mainImgList, children } = form;
        await app.model.SpiderMerchan.updateOne({
            user: username,
            _id: app.mongoose.Types.ObjectId(id)
        }, {
            merchanName,
            price,
            merchanNumber,
            keyword,
            description,
            skuNumber,
            model,
            brand,
            point1,
            point2,
            point3,
            point4,
            point5,
            manufacturer,
            mainImgList,
            children,
            lastEditTime:moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            omitUndefined: true
        })
    }
    async deleteSpiderMer(id, username) {
        const { app } = this;
        await app.model.SpiderMerchan.deleteOne({
            _id: app.mongoose.Types.ObjectId(id),
            user: username
        })
    }
    async deleteMer(id, username) {
        const { app } = this;
        await app.model.Merchan.deleteOne({
            _id: app.mongoose.Types.ObjectId(id),
            user: username
        })
    }
    async listFormAuth(form, userList, admin) {
        const { app, ctx } = this;
        let { query, options } = ctx.helper.merQueryConst(form);
        options.select = 'user creatTime categoryPath merchanName skuNumber exportsCount country categoryTypeId originUrl'
        if (admin) {
            if(form.username){
                query.user = form.username
            }else{
                query.user = {
                    $ne:'admin'
                }
            }
            
        } else {
            if(form.username){
                if(userList.indexOf(form.username) < 0){
                    return []
                }else {
                    query.user = form.username
                }
            }else{
                query.user = {
                    $in: userList
                }
            }
            
        }
        let data = await app.model.Merchan.paginate(query, options)
        return data
    }
    async getMerchanFromAuthId(id,accessList,auth){
        const {app} = this;
        let data;
        if(auth){
            data = await app.model.Merchan.findOne({
                _id:app.mongoose.Types.ObjectId(id)
            }).lean(true)
        }else{
            data = await app.model.Merchan.findOne({
                _id:app.mongoose.Types.ObjectId(id),
                user:{
                    $in:accessList
                }
            }).lean(true)
        }
        return data
    }
    async getTemplate(name){
        const {app} = this;
        let data = await app.model.Template.findOne({
            name:name
        }).select({'_id':0}).lean(true)
        return data
    }
    async getFormatMerchan(ids,auth){
        const {app} = this;
        let datas = [];
        for(let id of ids){
            if(auth){
                let data = await app.model.Merchan.findOne({
                    _id:app.mongoose.Types.ObjectId(id),
                    
                }).select({_id:0}).lean(true)
                datas.push(data)
            }else{
                let data = await app.model.Merchan.findOneAndUpdate({
                     _id:app.mongoose.Types.ObjectId(id)
                    
                },{
                    $inc:{
                        exportsCount:1
                    },
                    $set:{
                        lastExportsTime:moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                }).select({_id:0}).lean(true)
                datas.push(data)
            }
        }
        datas = datas.filter(el => el.point1 && el.point2 && el.point3 && el.point4 && el.point5 && el.keyword)
        return datas
    }
    async findOriginUrl(skuNumber,user){
        const {app} = this;
        let data;
        data = await app.model.Merchan.findOne({
            skuNumber:skuNumber
        }).select('merchanName categoryPath skuNumber originUrl user creatTime').lean(true)
        if(this.role < 10 && data.user !== user.username && user.accessList.indexOf(data.user) < 0){
            return []
        }else{
            return [data]
        }
    }
    async updatePoints({id,point1,point2,point3,point4,point5,keyword,user} = {}){
        const {app} = this;
        if(id.length){
            for(let _id of id){
                await app.model.SpiderMerchan.updateOne({
                    _id:app.mongoose.Types.ObjectId(_id),
                    user:user
                },{
                    point1,point2,point3,point4,point5,keyword
                })
            }
        }
    }

}

module.exports = MerchanService;