const baseController = require('../core/baseController');

class Aggregate extends baseController {
    async index(){
        const {ctx,service} = this;
        ctx.validate({
            startDate:{
                type:'string'
            },
            endDate:{
                type:'string'
            }
        },ctx.query)
        const {startDate,endDate} = ctx.query;
        const {username} = this.user;
        let data = await service.aggregate.spiderMerchanAggre(startDate,endDate,username);
        this.success(data)
        
    }
    async aggregateFromAuth(){
        const {ctx,service} = this;
        ctx.validate({
            startDate:{
                type:'string'
            },
            endDate:{
                type:'string'
            },
            user:{
                type:'string'
            }
        },ctx.query)
        const {startDate,endDate,user} = ctx.query;
        if(this.user.role < 10 && this.user.accessList.indexOf(user) < 0){
            this.success([])
        }else{
            let data = await service.aggregate.spiderMerchanAggre(startDate,endDate,user);
            this.success(data)
        }
    }
}

module.exports = Aggregate;