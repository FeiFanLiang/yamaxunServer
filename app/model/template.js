module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const templateSchema = new Schema({
        name:{
            type:String,
            index:true
        },
        template:Object
    })

    return mongoose.model('template',templateSchema,'template')
}