module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const roleSchema = new Schema({
        username:{
            type:String,
            required:true
        },
        role:{
            type:Number,
            required:true,
            default:0
        },
        creatBy:{
            type:String,
            required:true,
            default:'admin'
        },
        role:{
            type:Number,
            required:true,
            default:0
        },
        creatLimit:{
            type:Number,
            required:true,
            default:0
        },
        creatList:{
            type:Array,
            required:true,
            default:[]
        },
        accessList:{
            type:Array,
            required:true,
            default:[]
        }
    })

    return mongoose.model('userRole',roleSchema)
}