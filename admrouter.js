const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js')// 导入数据库登录信息

const admrouter = new Router()

//查询所有用户信息接口
admrouter.get('/getalluser', async ctx => {
    const pagenum = ctx.request.query.pagenum - 1
    const pagesize = ctx.request.query.pagesize

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM user LIMIT ${pagenum * pagesize},${pagesize}`
    const sql2 = `SELECT * FROM user`
    const [rs] = await connection.query(sql)
    const [rs2] = await connection.query(sql2)
    connection.end(function(err){})

    if(rs.length >= 0 && rs2.length > 0){
        ctx.body = {
            code:200,
            tips:'查询成功',
            rs,
            total:rs2.length
        }
    }else{
        ctx.body = {
            code:201,
            tips:'查询失败'
        }
    }
})

//查询所有已启用以及冻结的账户
admrouter.get('/getusedaccount', async ctx => {
    const pagenum = ctx.request.query.pagenum - 1
    const pagesize = ctx.request.query.pagesize
    const state = ctx.request.query.state
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM user WHERE state = '${state}' LIMIT ${pagenum * pagesize},${pagesize}`
    const sql2 = `SELECT * FROM user WHERE state = '${state}'`
    const [rs] = await connection.query(sql)
    const [rs2] = await connection.query(sql2)
    connection.end(function(err){})

    if(rs.length >= 0 && rs2.length >= 0){
        ctx.body = {
            code:200,
            tips:'查询成功',
            rs,
            total:rs2.length
        }
    }else{
        ctx.body = {
            code:201,
            tips:'查询失败'
        }
    }
})

//开户接口
admrouter.post('/adduser',async ctx => {
    const data = ctx.request.body
    const money = data.money * 1
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `INSERT INTO user (username,password,email,money,phone,state) VALUE
    ('${data.username}', '${data.password}', '${data.email}', ${money}, '${data.phone}', '${data.state}')`
    const [rs] = await connection.query(sql)
    connection.end(function(err){})

    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'开户成功'
        }
    } else {
        ctx.body = {
            code:201,
            tips:'开户失败'
        }
    }
})

//根据ID修改密码
admrouter.get('/modifypwd',async ctx => {
    const id = ctx.request.query.id
    const password = ctx.request.query.password
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE administrator SET password='${password}' WHERE id = ${id}`
    const [rs] = await connection.query(sql)
    connection.end(function(err){})

    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'修改密码成功'
        }
    } else {
        ctx.body = {
            code:201,
            tips:'修改密码失败'
        }
    }
})

//根据ID查询信息
admrouter.get('/medata',async ctx => {
    const id = ctx.request.query.id
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM administrator WHERE id = ${id}`
    const [rs] = await connection.query(sql)
    connection.end(function(err){})

    if (rs.length >= 0) {
        ctx.body = {
            code:200,
            tips:'个人信息获取成功',
            rs
        }
    } else {
        ctx.body = {
            code:201,
            tips:'个人信息获取失败'
        }
    }
})

//新闻列表
admrouter.get('/getallnews', async ctx => {
    const pagenum = ctx.request.query.pagenum - 1
    const pagesize = ctx.request.query.pagesize

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM news LIMIT ${pagenum * pagesize},${pagesize}`
    const sql2 = `SELECT * FROM news`
    const [rs] = await connection.query(sql)
    const [rs2] = await connection.query(sql2)
    connection.end(function(err){})

    rs.forEach(item => {
        var time = getDate(item.publishtime)
        item.publishtime = time
    })

    if(rs.length >= 0 && rs2.length >= 0){
        ctx.body = {
            code:200,
            tips:'查询成功',
            rs,
            total:rs2.length
        }
    }else{
        ctx.body = {
            code:201,
            tips:'查询失败'
        }
    }
})

//添加新闻
admrouter.post('/addnews', async ctx => {
    const data = ctx.request.body  
    var date = getDate(data.publishtime)
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `INSERT INTO news (title,content,publishtime,author) VALUE
    ('${data.title}', '${data.content}', '${date}', '${data.author}')`
    const [rs] = await connection.query(sql)
    connection.end(function (err) {}) //连接结束

    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'推送新闻成功'
        }
    } else {
        ctx.body = {
            code:201,
            tips:'推送新闻失败'
        }
    }
})

//根据ID修改用户启用或冻结
admrouter.post('/updateuser',async ctx => {
    const data = ctx.request.body
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE user SET state='${data.state}' WHERE id = ${data.id}`
    const [rs] = await connection.query(sql)
    connection.end(function(err){})

    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'修改成功'
        }
    } else {
        ctx.body = {
            code:201,
            tips:'修改失败'
        }
    }
})

//根据ID删除账户
admrouter.get('/deleteuser', async ctx => {
    const id = ctx.request.query.id  
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `DELETE FROM user WHERE ?? = ?`
    const [rs] = await connection.query(sql, ['id', id])
    connection.end(function (err) {}) //连接结束

    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'删除成功'
        }
    } else {
        ctx.body = {
            code:201,
            tips:'删除失败'
        }
    }
})

//格式化数据
function getDate(data) {
    var date = new Date(data)
    var h = date.getFullYear()
    var m = date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    var d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    var time = h + '-' + m + '-' + d
    return time
}
module.exports = admrouter
