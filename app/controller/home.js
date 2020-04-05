'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.session.userInfo = {
      name:'test',
      age:11
    }
    // let userInfo = ctx.session.userInfo
    // userInfo
    ctx.body = 'hi,egg';
  }
}

module.exports = HomeController;
