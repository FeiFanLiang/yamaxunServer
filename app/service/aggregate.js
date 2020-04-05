const Service = require('egg').Service;
const moment  = require('moment');
class AggregateService extends Service {
    async spiderMerchanAggre(startDate,endDate,username){
        const {app} = this;
        
        let data = await app.model.SpiderMerchan.aggregate(
            [
                {
                    $match:{
                        time:{
                            $gte:new Date(moment(startDate).hour(0).minute(0)),
                            $lte:new Date(moment(endDate).hour(23).minute(59))
                        },
                        user:username
                    }
                },
                {
                    $group:{
                        _id:{
                            $dateToString:{
                                format:'%Y-%m-%d',
                                date:{
                                    $add:['$time',28800000]
                                }
                            }
                        },
                        count:{
                            $sum:1
                        }
                    },

                },
                {
                    $project:{
                        date:'$_id',
                        num:'$count',
                        _id:0
                    }
                },
                {
                    $sort:{
                        'date':-1
                    }
                }
            ]
        );
        return data
    }
}
module.exports = AggregateService;