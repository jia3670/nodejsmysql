var express = require('express');
var router = express.Router();
let md5 = require("md5-node")
let jwt = require("jsonwebtoken")
let mysql = require("mysql");
let sssid = null;
let nnn = null;
//注册后台
router.post("/api/addById2", function (req, resp) {
    let query = req.body;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query('select * from register', (err1, result3) => {
        if (result3 == undefined) {
            connection.connect(() => {
                connection.query('create table register(id int not null primary key auto_increment,name varchar(20) not null,password varchar(255) not null,quanxian varchar(255) not null);', (err1, result3) => {
                    connection.connect(() => {
                        connection.query('insert into register(name,password,quanxian) values(?,?,?)', [query.name, md5(query.password), query.quanxian], (err1, result3) => {
                            resp.send("z")
                        })
                    })
                })
            })
        } if (result3.length == 0) {
            connection.query('insert into register(name,password,quanxian) values(?,?,?)', [query.name, md5(query.password), query.quanxian], (err1, result4) => {
                resp.send("z")
            })
        } else {
            connection.query('select * from register where name=?', [query.name], (err1, result3) => {
                if (result3.length == 0) {
                    connection.query('insert into register(name,password,quanxian) values(?,?,?)', [query.name, md5(query.password), query.quanxian], (err1, result4) => {
                        resp.send("z")
                    })
                } else {
                    resp.send("c")
                }
            })
        }
    })
})
//登录
router.post("/api/addById3", function (req, resp) {
    let query = req.body;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query('select * from register', (err1, result3) => {
        if (result3 == undefined || result3.length == 0) {
            resp.send("ccw")
        } else {
            connection.query('select * from register where name=? and password=? ', [query.name, md5(query.password)], (err1, result5) => {
                if (result5[0].quanxian == "学生") {
                    let dataName = query.name;
                    let token = jwt.sign({
                        data: dataName,
                    }, "tokenKey", {
                        expiresIn: "2h"
                    })
                    let names = {
                        token: token,
                        ccc: "yh"
                    }
                    sssid = result5[0].id;
                    resp.send(names)
                }
                if (result5[0].quanxian == "管理员") {
                    let dataName = query.name;
                    let token = jwt.sign({
                        data: dataName
                    }, "tokenKey", {
                        expiresIn: "2h"
                    })
                    let names = {
                        token: token,
                        ccc: "gl"
                    }
                    nnn = query.name;
                    resp.send(names)
                }
            })
        }
    })
})

router.get("/api/hhtt", function (req, res, next) {
    let token = req.headers.authorization
    jwt.verify(token, "tokenKey", (err, decoded) => {
        if (err == null) {
            data = { success: true, msg: "成功", name: nnn }
        } else {
            data = { success: false, msg: "loin" }
        }
    })
    res.send(data)
})
router.get("/api/hhttss", function (req, resp) {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query('select * from stus where id=?', [sssid], (err1, result3) => {
        if (result3 == undefined) {
            connection.query('create table stus(id int not null primary key auto_increment,name varchar(20) not null,age int not null,contact  varchar(255) not null,sex varchar(2) not null,address varchar(255) not null,nation varchar(255) not null,classname int,dormitoryNo int,status varchar(20) default "正常",foreign key(classname) references class(id) on DELETE set null,foreign key(dormitoryNo) references chamber(id) on DELETE set null);', (err1, result3) => {
                return resp.send("gc")
            })
        }
        if (result3.length == 0) {
            return resp.send("gc")
        }
        if (result3.length == 1) {
            return resp.send("cz")
        }
    })
})
router.post("/api/xuetian", function (req, resp) {
    let query = req.body;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query('select * from stus where id=?', [sssid], (err1, result3) => {
        if (result3.length == 0) {
            connection.query('insert into stus(id,name,sex,nation,age,contact,address) values(?,?,?,?,?,?,?)', [sssid, query.name, query.sex, query.nation, query.age, query.contact, query.address], function (err1) {
                return resp.send("cg")
            })
        } else {
            return resp.send("cc")
        }
    })
})
router.get("/api/chakan", function (req, resp) {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let c = ''
    connection.query('select * from chamber', (err1, result3) => {
        c = result3
    })
    let cs = ''
    connection.query('select * from class', (err1, result3) => {
        cs = result3
    })
    connection.query('select * from stus where id=?', [sssid], (err1, result3) => {
        if (result3.length == 1) {
            let es = result3[0]
            let ew = {
                c: c,
                cs: cs,
                es: es
            }
            resp.send(ew)
            return
        } else {
            return resp.send("cw")
        }
    })
})
module.exports = router;