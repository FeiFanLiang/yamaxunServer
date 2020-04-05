/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1575465346362_731';
    config.qiniuConfig = {
        accessKey:'0uEh2m5bU2z61I0Zw4eK6zRxil0dUCB9Wp3eEY0x',
        secretKey:'9pntPsun_6YtkY-4cZdBfdSBe-_2MO_hfZ4dFyqr'
    }
    config.baiduConfig = {
        appKey:'20190923000336529',
        key:'3p9DgCcLMRd_dfngPhd2'
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.security = {
        enable:false,
        domainWhiteList: ['http://127.0.0.1:8080','*'],
        csrf: {
            enable: false
        },
        methodnoallow: {
            enable: false
        },
    }
    config.cors = {
        allowMethods: 'GET,POST,OPTIONS,DELETE,PUT',
        credentials: true
    }
    config.mongoose = {
        client: {
            options:{
                autoReconnect: true,
                useNewUrlParser:true,
                useFindAndModify:false,
                useUnifiedTopology: true
                
            },
            url: 'mongodb://127.0.0.1/yamaxun',
            
        }
    };
    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            db: 0,
            password:''
        }
    };
    
    config.session = {
        genid: () => {
            return `AmazonSession${+new Date()}`
        },
        key:'fkMeBaby',
        maxAge: 1 * 24 * 60 * 60 *1000
    }
    config.bodyParser = {
        jsonLimit: '5mb',
        formLimit: '10mb',
    };
    config.middleware = ['auth']
    config.auth = {
        enable:true,
        ignore(ctx){
            if(ctx.path == '/api/logout' || ctx.path == '/api/login'){
                return true
            }
            if(ctx.path == '/api/user' && ctx.method == 'POST'){
                return true
            }
            if(ctx.path == '/api/spiderLogin'){
                return true
            }
            if(ctx.path == '/api/spiderUpload'){
                return true
            }
            return false
        }
    }
    return {
        ...config,
        ...userConfig,
    };
};