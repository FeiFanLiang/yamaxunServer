module.exports = app => {
    return async function auth(ctx,next){
        const {userInfo} = ctx.session
        if(!userInfo){
            ctx.body = {
                code: -1,
                msg:'需要登录'
            }
            ctx.status = 200;
        }else{
            if(userInfo.expireTime && (+new Date() - userInfo.expireTime) > 0){
                ctx.status = 200;
                ctx.body = {
                    code:-1,
                    msg:'账号已到期'
                }
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