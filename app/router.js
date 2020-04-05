'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('user','/api/user',controller.user)
  router.get('/api/authUser/updateExpireTime',controller.authUser.updateExpireTime)
  router.resources('authUser','/api/authUser',controller.authUser)
  router.resources('merchan','/api/merchan',controller.merchan)
  router.resources('priceRules','/api/priceRules',controller.priceRules)
  router.resources('userConfig','/api/userConfig',controller.userConfig)
  router.get('/api/getOrigin',controller.merchan.getOrigin)
  router.get('/api/aggregate',controller.aggregate.index)
   router.get('/api/aggregateFromAuth',controller.aggregate.aggregateFromAuth)
  router.post('/api/updatePoints',controller.merchan.updatePoints)
  router.get('/api/merchanIdByAuth/:id',controller.merchan.merchanIdByAuth)
  router.get('/api/listFromAuth',controller.merchan.listFromAuth)
  router.get('/api/cateAttr',controller.category.index)
  router.post('/api/creatAmazonMer',controller.merchan.creatAmazonMer)
  router.post('/api/template',controller.merchan.getTemplate)
  router.post('/api/templateAuth',controller.merchan.getTemplateAuth)
  router.post('/api/login',controller.user.login)
  router.get('/api/logout',controller.user.logout)
  router.get('/api/getUploadKey',controller.qiniu.getUploadKey)
  router.post('/api/getTransKey',controller.baidu.getTransKey)
  router.post('/api/spiderLogin',controller.user.spiderLogin)
  router.post('/api/spiderUpload',controller.merchan.spiderUpload)
  router.post('/api/upload',controller.ca.upload)
  router.post('/test',controller.test.index)
};
