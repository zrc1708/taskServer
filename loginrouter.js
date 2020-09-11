const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js')// 导入数据库登录信息

const loginrouter = new Router()

//登录接口
loginrouter.get('/login', async ctx => {
    const username = ctx.request.query.username.trim()
    const password = ctx.request.query.password.trim()
    const identity = ctx.request.query.identity

    const connection = await Mysql.createConnection(mysql_nico)
    if(identity === '1'){
        const sql = `SELECT * FROM administrator WHERE username = '${username}' and password = '${password}'`;
        const [rs] = await connection.query(sql);
        connection.end(function(err){})
        if(rs.length>0){
            ctx.body = {
                code:200,
                tips:'登录成功',
                id:rs[0].id
            }
        }else{
            ctx.body = {
                code:201,
                tips:'登录失败'
            }
        }
    }else{
        const sql = `SELECT * FROM user WHERE username = '${username}' and password = '${password}'`;
        const [rs] = await connection.query(sql);
        connection.end(function(err){})

        if(rs.length>0){
            ctx.body = {
                code:200,
                tips:'登录成功',
                id:rs[0].id
            }
        }else{
            ctx.body = {
                code:201,
                tips:'登录失败'
            }
        }
    }

    
});

module.exports = loginrouter
