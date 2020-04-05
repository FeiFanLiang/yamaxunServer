const Controller = require('../core/baseController');

class CategoryController extends Controller {
    async index(){
        const {ctx,service} = this;
        ctx.validate({
            site:{
                type:'string'
            },
            parentId:{
                type:'number',
                convertType:'number',
                required:false
            },
            categoryType:{
                type:'string',
                required:false
            }
        },ctx.query);
        const {site,parentId,categoryType} = ctx.query;
        let data = await service.category.getCategory(site,parentId,categoryType);
        this.success(data)
    }
}

module.exports = CategoryController;