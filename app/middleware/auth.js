module.exports = app => {
    return async function auth(ctx,next){
        const {userInfo} = ctx.session;
        const accessToken = ctx.cookies.get('access_token');
        if(!accessToken || !userInfo){
            ctx.body = {
                code:-1,
                msg:'登录过期或未登录'
            }
            ctx.status = 200;
        }else{
            const redisToken = await ctx.app.redis.get(userInfo.username);
            if(!redisToken || redisToken !== accessToken){
                ctx.body = {
                    code : -1,
                    msg:'登录过期'
                }
                ctx.status = 200;
                return
            }
            if(userInfo.expireTime && (+new Date() - userInfo.expireTime) > 0){
                ctx.status = 200;
                ctx.body = {
                    code:-1,
                    msg:'账号已到期'
                };
                return
            }
            const sessionKey = ctx.cookies.get('fkMeBaby',ctx.sessionOptions);
            const value = await ctx.app.redis.get(sessionKey)
            if(!value){
                ctx.status = 200;
                ctx.body = {
                    code:-1,
                    msg:'需要登录'
                }
            }else{
                await next()
            }
        }
        
    }
}