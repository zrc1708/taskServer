const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js')// 导入数据库登录信息

const userrouter = new Router()

//查询所有用户信息接口(测试)
userrouter.get('/test', async ctx => {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = "SELECT * FROM user";
    const [rs] = await connection.query(sql);
    connection.end(function(err){})
    ctx.body = {
        rs
    }
});

module.exports = userrouter
