module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const exRateSchema = new Schema({
        name:String,
        rate:{
            type:Number,
            required:true
        },
        timeStap:{
            type:Number
        }
    })

    return mongoose.model('exRate',exRateSchema)
}