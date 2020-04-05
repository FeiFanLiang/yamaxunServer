module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const categoryTypeSchema = new Schema({
        id:String,
        site:{
            type:String,
            index:true
        },
        categoryTemplateId:String,
        categoryTemplateName:{
            type:String,
            index:true
        },
        autoaccessory:String,
        groupName:String,
        attributeId:String,
        feed_product_type:{
            type:String,
            index:true
        },
        Produkttyp:String,
        attributeDescription:String,
        attributeType:String,
        values:String,
        acceptedValues:String,
        example:String
    })

    return mongoose.model('categoryType',categoryTypeSchema,'categoryType')
}