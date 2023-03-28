var express = require('express');
var router = express.Router();
let fs = require('fs')
let mysql = require('mysql')
let zhi = null;
router.post("/api/qspost", (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let s = '';
    connection.query('select * from chamber', (err1, result3) => {
        if (result3 == undefined || result3.length == 0) {
            s = `<tr><td colspan="8">暂无宿舍数据</td></tr>`
            resp.send(s)
            return
        }
        for (let i = 0; i < result3.length; i++) {
            s += `<tr>
            <td>${i + 1}</td>
            <td onclick="xiangqing(${result3[i].id})"data-target="#myModal4" data-toggle="modal">${result3[i].name}</td>
            <td>${result3[i].sex}</td>
            <td class="kz"index="${result3[i].id}"></td>
            <td class="yz"index="${result3[i].id}"></td>
            <td>8</td>
            <td><button onclick="cha(${result3[i].id})"data-target="#myModal3" data-toggle="modal" class="btn btn-success">查寝</button></td>
            <td><button onclick="shan(${result3[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result3[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
          </tr > `
        }
    })
    let c = ''
    connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
        c = result
        let cc = {
            s: s,
            c: c
        }
        resp.send(cc)
    })
})

router.post("/api/qsposttj", (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let query = req.body;
    connection.query("select * from chamber", (err1, result) => {
        if (result == undefined) {
            connection.query("create table chamber(id int not null primary key auto_increment,name varchar(20) not null,sex varchar(20) not null)", (eer, result) => {
                connection.query("insert into chamber(name,sex) values(?,?)", [query.name, query.sex], (err, result2) => {
                    resp.send("z")
                    return
                })
            })
        } else {
            for (let item of result) {
                if (item.name == query.name) {
                    resp.send("c")
                    return
                }
            }
            connection.query("insert into chamber(name,sex) values(?,?)", [query.name, query.sex], (err, result2) => {
                resp.send("z")
                return
            })


        }
    })
})
router.put("/api/qsputxiugai", (req, resp) => {
    let query = req.body.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("select * from chamber where id=?", [query], (err, result) => {
        zhi = query;
        resp.send(result[0].name);
        return
    })
})
router.put("/api/qsputxg", (req, resp) => {
    let query = req.body.name;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("select * from chamber", (err, result) => {
        for (let item of result) {
            if (item.name == query && item.id != zhi) {
                resp.send("c")
                return
            }
        }
        connection.query("update chamber set name=? where id=?", [query, zhi], (err, result) => {
            resp.send("z")
            return
        })
    })

})
router.get("/api/qsgetchazhao", (req, resp) => {
    let query = req.query.name;
    let s = '';
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("select * from chamber where name regexp ?", [query], (eer, result3) => {
        if (result3 == undefined || result3.length == 0) {
            s = `<tr><td colspan="8">暂无此宿舍</td></tr>`
        } else {
            for (let i = 0; i < result3.length; i++) {
                s += `<tr>
                <td>${i + 1}</td>
                <td onclick="xiangqing(${result3[i].id})"data-target="#myModal4" data-toggle="modal">${result3[i].name}</td>
                <td>${result3[i].sex}</td>
                <td class="kz"index="${result3[i].id}"></td>
                <td class="yz"index="${result3[i].id}"></td>
                <td>8</td>
                <td><button onclick="cha(${result3[i].id})"data-target="#myModal3" data-toggle="modal" class="btn btn-success">查寝</button></td>
                <td><button onclick="shan(${result3[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result3[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
              </tr > `
            }
        }
    })
    let c = ''
    connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
        c = result
        let cc = {
            s: s,
            c: c
        }
        resp.send(cc)
    })
})
router.get("/api/qscha", (req, resp) => {
    let query = req.query.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("select * from stus where dormitoryNo=?", [query], (err, result) => {
        let c = false;
        for (let i = 0; i < result.length; i++) {
            if (result[i].status != "正常") {
                c = true;
                resp.send("不正常")

                return
            }
        }
        if (c == false) {
            resp.send("true");
            return
        }
    })
})
router.get("/api/xq", (req, resp) => {
    let query = req.query.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let ccs = ''
    connection.query("select * from chamber where id=?", [query], (err, result) => {
        ccs = result[0].name
    })
    connection.query("select * from stus where dormitoryNo=?", [query], (err, result) => {
        let c = {
            zc: [],
            qj: [],
            wc: [],
            ccs: ccs
        };
        for (let i = 0; i < result.length; i++) {
            if (result[i].status == "正常") {
                c.zc[c.zc.length] = result[i];
            }
            if (result[i].status == "请假") {
                c.qj[c.qj.length] = result[i];
            }
            if (result[i].status == "外出") {
                c.wc[c.wc.length] = result[i];
            }
        }
        resp.send(c)
    })
})
router.get("/api/xqxx", (req, resp) => {
    let query = req.query.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let ccs = ''
    connection.query("select * from chamber where id=?", [query], (err, result) => {
        ccs = result[0].name;
    })
    connection.query("select * from stus where dormitoryNo=?", [query], (err, result) => {
        if (result.length == 0 || result == undefined) {
            let s = '';
            s = `<tr><td colspan="11">暂无宿舍人员</td></tr>`
            let c = {
                ccs: ccs,
                s: s
            }
            resp.send(c)
            return
        } else {
            function ewq(ee) {
                if (ee == '' || ee == null) {
                    return "暂无宿舍"
                } else {
                    return ee
                }
            }
            function ewb(ee) {
                if (ee == '' || ee == null) {
                    return "暂无班级"
                } else {
                    return ee
                }
            }
            function eww(ee) {
                if (ee == "正常") {
                    return "<td style=color:green>" + ee + "</td>"
                }
                if (ee == "请假") {
                    return "<td style=color:red>" + ee + "</td>"
                }
                if (ee == "外出") {
                    return "<td style=color:blue>" + ee + "</td>"
                }
            }
            let s = ''
            for (let i = 0; i < result.length; i++) {
                s += `<tr>
                <td>${i + 1}</td>
                <td>${result[i].name}</td>
                <td>${result[i].age}</td>
                <td>${result[i].sex}</td>
                <td>${result[i].nation}</td>
                <td class="qs">${ewq(result[i].dormitoryNo)}</td>
                <td>${result[i].contact}</td>
                <td>${result[i].address}</td>
                <td class="cls">${ewb(result[i].classname)}</td>
                ${eww(result[i].status)}
              </tr > `
            }
            let c = '';
            connection.query('select * from chamber', (err1, result3) => {
                c = result3
            })
            connection.query('select * from class', (err1, result3) => {
                let cs = result3
                let cc = {
                    ccs: ccs,
                    s: s,
                    c: c,
                    cs: cs
                }
                return resp.send(cc)
            })
        }
    })
})
router.delete("/api/qsdeleteshan", (req, resp) => {
    let query = req.body.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("delete from chamber where id=?", [query], (eer, result) => {
        resp.send("z")
        return
    })
})
module.exports = router;
