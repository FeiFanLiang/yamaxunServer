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
        merchanName_trans:{
            type:String,
            required:true
        },

        
        country:{
            type:String,
            required:true
        },
        categoryTypeId:{
            type:String,
            required:true
        },
        categoryPath:{
            type:String,
            required:true
        },
        productType:{
            type:String,
            required:true
        },
        variType:{
            type:String
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
            type:String
        },
        description:{
            type:String,
            required:true
        },
        description_trans:{
            type:String,
            required:true
        },
        skuNumber:{
            type:String,
            required:true,
            index:true
        },
        ean:{
            type:String,
            required:false
        },
        model:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        
        point1:{
            type:String,
            
        },
        point1_trans:{
            type:String,
            
        },
        point2:{
            type:String,
            
        },
        point2_trans:{
            type:String,
            
        },
        point3:{
            type:String,
            
        },
        point3_trans:{
            type:String,
            
        },
        point4:{
            type:String,
            
        },
        point4_trans:{
            type:String,
            
        },
        point5:{
            type:String,
            
        },
        point5_trans:{
            type:String
        },
        manufacturer:{
            type:String
        },
        mainImgList:{
            type:Array
        },
        country_of_origin:{
            type:String,
            default:'China',
            required:true
        },
        condition_type:{
            type:String,
            required:true
        },
        children:{
            type:Array
        },
        originUrl:{
            type:String,
            index:true
        },
        exportsCount:{
            type:Number,
            required:true,
            default:0
        },
        lastExportsTime:{
            type:String
        },
        user:{
            type:String,
            required:true,
            index:true
        },
        creatTime:{
            type:String,
            required:true,
            default:() => moment().format('YYYY-MM-DD HH:mm:ss'),
            index:true
        }
    })
    merchanSchema.plugin(mongoosePaginate)
    return mongoose.model('merchan',merchanSchema);
}