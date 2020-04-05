const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '4h', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate:true
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const {ctx,app} = this;
        const url = 'http://www.chinamoney.com.cn/r/cms/www/chinamoney/data/fx/sdds-exch-rate.json?t='+new Date().getTime();
        let res = await ctx.curl(url,{
            method:'POST',
            headers:{
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Content-Length': 0,
                'Host': 'www.chinamoney.com.cn',
                'Origin': 'http://www.chinamoney.com.cn',
                'Referer': 'http://www.chinamoney.com.cn/chinese/sddshl/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36'
            },
            timeout:8000,
            dataType:'json',
            gzip:true
        });
        if(res.data && res.data.records && res.data.records.length){
            let records = res.data.records;
            let usd = records.find(el => el.vrtEName == 'USD');
            let eur = records.find(el => el.vrtEName == 'EUR');
            let gbp = records.find(el => el.vrtEName == 'GBP');
            let array = [usd,eur,gbp]
            for(let item of array){
                await app.model.ExRate.updateOne({
                    name:item.vrtEName
                },
                {
                    rate:Number(item.price),
                    timeStap:+new Date()
                },{
                    upsert:true
                })
            }
            ctx.logger.info('更新汇率成功',new Date().toLocaleString())
        }
  }
}

module.exports = UpdateCache;