const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate-v2');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const merchanSchema = new Schema({
        merchanName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        merchanNumber:{
            type:Number,
            required:true,
            default:50
        },
        keyword:{
            type:String,
            
        },
        description:{
            type:String,
            
        },
        skuNumber:{
            type:String,
            
        },
        model:{
            type:String,
            
        },
        brand:{
            type:String,
            
        },
        point1:{
            type:String,
            
        },
        point2:{
            type:String,
            
        },
        point3:{
            type:String,
            
        },
        point4:{
            type:String,
           
        },
        point5:{
            type:String,
            
        },
        manufacturer:{
            type:String,
            
        },
        mainImgList:{
            type:Array
        },
        children:{
            type:Array
        },
        originUrl:{
            type:String,
            index:true
        },
        origin:{
            type:String,
            required:true,
            default:'creat'
        },
        user:{
            type:String,
            required:true,
            index:true
        },
        platForm:{
            type:String,
            required:true,
            default:'1688'
        },
        pubTime:{
            type:Number,
            required:true,
            default:0
        },
        lastEditTime:{
            type:String,
        },
        lastTransTime:{
            type:String,
        },
        creatTime:{
            type:String,
            required:true,
            default:() => moment().format('YYYY-MM-DD HH:mm:ss'),
            index:true
        },
        time:{
            type:Date,
            required:true,
            default:Date.now
        }
    })
    merchanSchema.plugin(mongoosePaginate)
    return mongoose.model('spiderMerchan',merchanSchema);
}