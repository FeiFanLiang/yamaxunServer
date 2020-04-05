'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    mongoose: {
        enable: true,
        package: 'egg-mongoose'
    },
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    sessionRedis: {
        enable: true,
        package: 'egg-session-redis',
    },
    cors: {
        enable:true,
        package:'egg-cors'
    },
    validate:{
        enable:true,
        package:'egg-validate'
    }
};