const Service = require('egg').Service;

class CategoryService extends Service {
    async getCategory(site,parentId,categoryType){
        const {app} = this;
        let data;
        if(!parentId && !categoryType){
            data = await app.model.CategoryCountry.find({
                site:site,
                parentId:0
            }).lean(true)
        }
        if(parentId){
            data = await app.model.CategoryCountry.find({
                site:site,
                parentId:parentId
            }).lean(true)
        }
        if(site && categoryType){
            data = await app.model.CategoryType.find({
                site:site,
                categoryTemplateName:categoryType,
                $or:[
                    {attributeId:'variation_theme'},
                    {attributeId:'feed_product_type'}
                ]
            }).lean(true)
        }
        return data;
    }
}

module.exports = CategoryService;