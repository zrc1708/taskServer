const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js')// 导入数据库登录信息

const userrouter = new Router()

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

//查询所有用户信息接口(测试)
userrouter.get('/getalluser', async ctx => {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = "SELECT * FROM user";
    const [rs] = await connection.query(sql);
    connection.end(function(err){})
    ctx.body = {
        rs
    }
});

//根据id查询用户信息
userrouter.get('/getuserinformation/:id', async ctx => {
    let id = ctx.params.id  //一页多少条记录

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM user where id = ${id}`;
    const [rs] = await connection.query(sql);
    connection.end(function(err){})
    ctx.body = {
        rs
    }
});

// 修改个人信息
userrouter.post('/updateuserinformation', async ctx => {
    const form = ctx.request.body

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE user SET username = '${form.username}',
                email = '${form.email}' , phone = '${form.phone}'
                WHERE id = '${form.id}';`
    const [rs] = await connection.query(sql);
    connection.end(function(err){})

    ctx.body = {
        code:200,
        rs
    }
});

// 存款
userrouter.post('/save', async ctx => {
    const data = ctx.request.body

    const connection = await Mysql.createConnection(mysql_nico)

    const sql1 = `select money from user WHERE id = '${data.id}';`
    const [rs1] = await connection.query(sql1);
    let money = Number(rs1[0].money)+Number(data.money)

    const sql2 = `UPDATE user SET money = '${money}' WHERE id = '${data.id}';`
    const [rs2] = await connection.query(sql2);

    // 存入交易记录
    let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    const sql3 = `INSERT INTO transaction ( money , time , state , userid ,balance ) 
                    VALUES ( '${data.money}', '${time}','0','${data.id}','${money}');`
    await connection.query(sql3);

    connection.end(function(err){})

    ctx.body = {
        code:200,
        rs2
    }
});

// 取款
userrouter.post('/withdrawal', async ctx => {
    const data = ctx.request.body

    const connection = await Mysql.createConnection(mysql_nico)

    const sql1 = `select money from user WHERE id = '${data.id}';`
    const [rs1] = await connection.query(sql1);

    let money = Number(rs1[0].money)-Number(data.money)
    if(money<0){
        return ctx.body = {
            code:400,
            message:'账户余额不足'
        }
    }

    const sql2 = `UPDATE user SET money = '${money}' WHERE id = '${data.id}';`
    const [rs2] = await connection.query(sql2);

    // 存入交易记录
    let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    const sql3 = `INSERT INTO transaction ( money , time , state , userid ,balance ) 
                    VALUES ( '${data.money}', '${time}','1','${data.id}','${money}');`
    await connection.query(sql3);

    connection.end(function(err){})

    ctx.body = {
        code:200,
        rs2
    }
});

// 根据id获取交易记录
userrouter.get('/getusertransaction/:id', async ctx => {
    let id = ctx.params.id

    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `SELECT * FROM transaction where userid = ${id}`;
    const [rs] = await connection.query(sql);
    connection.end(function(err){})
    ctx.body = {
        code:200,
        rs
    }
});

module.exports = userrouter
