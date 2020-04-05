const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate-v2');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:Number,
            default:0
        },
        userBrand:[String],
        manufacturer:[String],
        creatTime:{
            type:String,
            required:true,
            default:() => moment().format('YYYY-MM-DD HH:mm:ss')
        },
        expireTime:{
            type:Number,
            required:true
        }
        
    })
    userSchema.plugin(mongoosePaginate)
    return mongoose.model('user',userSchema)
}