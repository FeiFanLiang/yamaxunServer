module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const priceRules = new Schema({
        name:{
            type:String,
            required:true,
            index:true
        },
        times:{
            type:Number,
            required:true
        },
        carriage:{
            type:Number,
            required:true
        },
        user:{
            type:String,
            required:true,
            index:true
        },
        country:{
            type:String,
            required:true,
            index:true
        }
    })

    return mongoose.model('priceRules',priceRules)
}