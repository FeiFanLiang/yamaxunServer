const Controller = require('../core/baseController');
/**
 * 价格规则
 */

 class PriceRules extends Controller {
     async index(){
        const {app} = this;
        const {username} = this.user;
        let data = await app.model.PriceRules.find({
            user:username
        }).lean(true)
        this.success(data)
     }
     async create(){
         const {ctx,app} = this;
         const {username} = this.user;
         ctx.validate({
             name:{
                 type:'string'
             },
             times:{
                 type:'number',
                 convertType:'number'
             },
             carriage:{
                 type:'number',
                 convertType:'number'
             },
             country:{
                 type:'string'
             }
         })
         const {name,times,carriage,country} = ctx.request.body;
         
         let exists = await app.model.PriceRules.exists({
             user:username,
             country:country
         })
         if(!exists){
             await new app.model.PriceRules({
                 name:name,
                 user:username,
                 times:times,
                 carriage:carriage,
                 country:country
             }).save()
             this.success()
         }else{
            this.fail('已存在相同国家价格规则')
         }
         
     }
     async update() {
        const {ctx,app} = this;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        ctx.validate({
            name:{
                type:'string'
            },
            times:{
                type:'number',
                convertType:'number'
            },
            carriage:{
                type:'number',
                convertType:'number'
            }
        });
        const {id} = ctx.params;
        const {name,times,carriage} = ctx.request.body;
        const {username} = this.user;
        await app.model.PriceRules.updateOne({
            _id:app.mongoose.Types.ObjectId(id),
            user:username
        },{
            times:times,
            carriage:carriage,
            name:name
        })
        this.success()
     }
     async destroy(){
        const {ctx,app} = this;
        const {username} = this.user;
        ctx.validate({
            id:{
                type:'string'
            }
        },ctx.params)
        const {id} = ctx.params;
        await app.model.PriceRules.deleteOne({
            _id:app.mongoose.Types.ObjectId(id),
            user:username
        })
        this.success()
     }
 }

 module.exports = PriceRules;