module.exports = {
    merQueryConst(params,username){
        let query = {};
        let options = {
            lean:true,
            leanWithId:true,
            select:'user creatTime categoryPath merchanName skuNumber exportsCount country categoryTypeId lastEditTime lastTransTime lastExportsTime',
            sort:{
                creatTime:-1
            }
        }
        const {merchanName,platForm,pubTime,origin,exportsCount,country,lastTransTimeStart,lastTransTimeEnd,lastExportsTimeStart,lastExportsTimeEnd,creatTimeStart,creatTimeEnd,currentPage=1,pageSize=30} = params;
        if(merchanName) query.merchanName = merchanName;
        if(platForm) query.platForm = platForm;
        if(pubTime) query.platForm = pubTime;
        if(origin) query.origin = origin;
        if(exportsCount !== undefined) query.exportsCount = exportsCount;
        if(lastTransTimeStart && lastTransTimeEnd){
            query.lastTransTime = {
                $gte:lastTransTimeStart,
                $lte:lastTransTimeEnd
            }
        }
        if(lastExportsTimeStart && lastExportsTimeEnd){
            query.lastExportsTime = {
                $gte:lastExportsTimeStart,
                $lte:lastExportsTimeEnd
            }
        }
        if(country) query.country = country
        if(creatTimeStart && creatTimeEnd){
            query.creatTime = {
                $gte:creatTimeStart,
                $lte:creatTimeEnd
            }
        }
        if(username){
            query.user = username
        }
        options.limit = pageSize;
        options.page = currentPage;
        return {query,options}
    },
    userQuery(params){
        let query = {}
        let options = {
            lean:true,
            leanWithId:true,
            select:{},
            sort:{
                creatTime:-1
            }
        }
        const {creatTimeStart,creatTimeEnd,role ,pageSize=30,currentPage=1} = params;
        if(creatTimeStart && creatTimeEnd){
            query.creatTime = {
                $gte:creatTimeStart,
                $lte:creatTimeEnd
            }
        }
        if(role !== undefined){
            query.role = role
        }
        options.limit = pageSize
        options.currentPage = currentPage
        return {
            query,
            options
        }
    },
    translateExRate(country){
        let obj = {
            'EUR':['de','fr','it','es'],
            'USD':['us','ca','mx'],
            'GBP':['uk']
        }
        return Object.keys(obj).find(el => obj[el].indexOf(country) > -1)
    }
}