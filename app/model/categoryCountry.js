module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const categoryCountrySchema = new Schema({
        id:Number,
        site:{
            type:String,
            index:true
        },
        categoryId:String,
        categoryParentId:{
            type:String,
            index:true
        },
        parentId:Number,
        categoryName:String,
        chineseName:String,
        nodePath:String,
        nodePathId:String,
        categoryType:String,
        itemType:Schema.Types.Mixed,
        leafCategory:Number,
        isDel:Number,
        label:String,
        createTime:Number,
        updateTime:Number
    })

    return mongoose.model('categoryCountry',categoryCountrySchema,'categoryCountry')
}