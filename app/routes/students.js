var express = require('express');
var router = express.Router();
let fs = require('fs');
let mysql = require('mysql');
let md5 = require("md5-node");
let db = require("./user")
let zstu = null;

router.get('/api/xrget', (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let ss = '';
    let s = '';
    let ssc = [];
    connection.query("select * from chamber", (err, resultc) => {
        if (resultc == undefined || resultc.length == 0) {
            ss = `<option  disabled=disabled>暂无宿舍</option>`
        } else {
            for (let item of resultc) {
                ss += `<option value=${item.id} class="qss">${item.name}</option>`
            }
        }
    })
    connection.query("select * from class", (err, result) => {
        if (result == undefined || result.length == 0) {
            s = `<option  disabled=disabled>暂无班级</option>`
            resp.send(s)
            let se = {
                s: s,
                ss: ss,
            }
            resp.send(se)
            return
        } else {
            for (let item of result) {
                s += `<option value=${item.id} >${item.name}</option>`
            }
            let c = [];
            connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
                for (let item of result) {
                    if (item.sl >= 8) {
                        c.push(item)
                    }
                }
                let se = {
                    s: s,
                    ss: ss,
                    ssc: c
                }
                resp.send(se)
                return
            })

        }
    })
})
router.get('/api/xbtn', (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })

    let s = '';
    let s2 = ''
    connection.query("select * from chamber where sex=?", ["男寝室"], (err, resultc) => {
        if (resultc == undefined || resultc.length == 0) {
            s = `<option  disabled=disabled>暂无宿舍</option>`
            s2 = "暂无数据"
            let se = {
                s: s,
                s2: s2
            }
            resp.send(se)
            return
        } else {
            for (let item of resultc) {
                s += `<option value=${item.id} class="qss">${item.name}</option>`
            }
            let c = [];
            connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
                for (let item of result) {
                    if (item.sl >= 8) {
                        c.push(item)
                    }
                }
                let se = {
                    s: s,
                    s2: c
                }
                resp.send(se)
                return
            })
        }
    })
})
router.get('/api/xbtv', (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let s = '';
    let s2 = '';
    connection.query("select * from chamber where sex=?", ["女寝室"], (err, resultc) => {
        if (resultc == undefined || resultc.length == 0) {
            s = `<option  disabled=disabled>暂无宿舍</option>`
            s2 = "暂无数据"
            let se = {
                s: s,
                s2: s2
            }
            resp.send(se)
            return
        } else {
            for (let item of resultc) {
                s += `<option value=${item.id} class="qss">${item.name}</option>`
            }
            let c = []
            connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
                for (let item of result) {
                    if (item.sl >= 8) {
                        c.push(item)
                    }
                }
                let se = {
                    s: s,
                    s2: c
                }
                resp.send(se)
                return
            })
        }
    })
})
router.get('/api/xbxn', (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let s = '';
    let s2 = ''
    connection.query("select * from chamber where sex=?", ["男寝室"], (err, resultc) => {
        if (resultc == undefined || resultc.length == 0) {
            connection.query("select * from chamber where id=(select dormitoryNo from stus where id=?) sex='男寝室'", [zstu], (err, result) => {
                if (result == undefined || result.length == 0) {
                    s = `<option disabled=disabled>暂无宿舍</option>`
                    s2 = "只有当前数据"
                    let se = {
                        s: s,
                        s2: s2
                    };
                    resp.send(se)
                    return
                }
                s = `<option value="${result[0].id}">${result[0].name}</option>`
                s2 = "只有当前数据"
                let se = {
                    s: s,
                    s2: s2
                };
                resp.send(se)
                return
            })
        } else {
            for (let item of resultc) {
                s += `<option value=${item.id} class="qqs">${item.name}</option>`
            }
            let c = []
            connection.query("select dormitoryNo from stus where id=?", [zstu], (err, result3) => {
                connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
                    for (let item of result) {
                        if (item.dormitoryNo != result3[0].dormitoryNo) {
                            if (item.sl >= 8) {
                                c.push(item)
                            }
                        }
                    }
                    let se = {
                        s: s,
                        s2: c
                    }
                    resp.send(se)
                    return
                })
            })

        }
    })
})
router.get('/api/xbxv', (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let s = '';
    let s2 = ''
    connection.query("select * from chamber where sex=?", ["女寝室"], (err, resultc) => {
        if (resultc == undefined || resultc.length == 0) {
            connection.query("select * from chamber where id=(select dormitoryNo from stus where id=?) sex='女寝室'", [zstu], (err, result) => {
                if (result == undefined || result.length == 0) {
                    s = `<option disabled=disabled>暂无宿舍</option>`
                    s2 = "只有当前数据"
                    let se = {
                        s: s,
                        s2: s2
                    };
                    resp.send(se)
                    return
                }
                s = `<option value="${result[0].id}">${result[0].name}</option>`
                s2 = "只有当前数据"
                let se = {
                    s: s,
                    s2: s2
                };
                resp.send(se)
                return
            })
        } else {
            for (let item of resultc) {
                s += `<option value=${item.id} class="qqs">${item.name}</option>`
            }
            let c = []
            connection.query("select dormitoryNo from stus where id=?", [zstu], (err, result3) => {
                connection.query('select dormitoryNo,count(*) sl from stus group by dormitoryNo', (err, result) => {
                    for (let item of result) {
                        if (item.dormitoryNo != result3[0].dormitoryNo) {
                            if (item.sl >= 8) {
                                c.push(item)
                            }
                        }
                    }
                    let se = {
                        s: s,
                        s2: c
                    }
                    resp.send(se)
                    return
                })
            })

        }
    })
})
router.post("/api/stupost", (req, resp) => {
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
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
    let s = '';
    connection.query('select * from stus', (err1, result3) => {
        if (result3 == undefined || result3.length == 0) {
            s = `<tr><td colspan="11">暂无学生数据</td></tr>`
            let cs = "暂无数据"
            let cc = {
                s: s,
                ees: ees
            }
            resp.send(cc);
            return
        } else {
            for (let i = 0; i < result3.length; i++) {
                s += `<tr>
                      <td>${i + 1}</td>
                      <td>${result3[i].name}</td>
                      <td>${result3[i].age}</td>
                      <td>${result3[i].sex}</td>
                      <td>${result3[i].nation}</td>
                      <td class="qs">${ewq(result3[i].dormitoryNo)}</td>
                      <td>${result3[i].contact}</td>
                      <td>${result3[i].address}</td>
                      <td class="cls">${ewb(result3[i].classname)}</td>
                      ${eww(result3[i].status)}
                     <td><button onclick="shan(${result3[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result3[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
                    </tr > `
            }
        }
    })
    let c = '';
    connection.query('select * from chamber', (err1, result3) => {
        c = result3
    })
    connection.query('select * from class', (err1, result3) => {
        let cs = result3
        let cc = {
            s: s,
            c: c,
            cs: cs
        }
        return resp.send(cc)
    })
})
router.post("/api/stuposttj", (req, resp) => {
    let query = req.body;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    let sw = {
        name: query.name,
        password: md5(123123),
        quanxian: "学生"
    }
    connection.query('select * from stus', (err1, result3) => {
        if (result3 == undefined) {
            connection.query('create table stus(id int not null primary key auto_increment,name varchar(20) not null,age int not null,contact  varchar(255) not null,sex varchar(2) not null,address varchar(255) not null,nation varchar(255) not null,classname int,dormitoryNo int,status varchar(20) default "正常",foreign key(classname) references class(id) on DELETE set null,foreign key(dormitoryNo) references chamber(id) on DELETE set null);', (err1, result3) => {
            })
        }
    })
    connection.query("insert into register(name,password,quanxian) values(?,?,?)", [sw.name, sw.password, sw.quanxian], (err, result) => {
        connection.query("select * from register", (err, result) => {
            let c = result[result.length - 1].id
            connection.query("insert into stus(id,name,age,contact,sex,address,nation,classname,dormitoryNo,status) values(?,?,?,?,?,?,?,?,?,?)", [c, query.name, query.age, query.contact, query.sex, query.address, query.nation, query.classname, query.dormitoryNo, query.status], (err, result) => {
                connection.query("select * from register", (err, result3) => {
                    let ccs = result3[result3.length - 1]
                    resp.send("z")
                    return
                })
            })
        })
    })
})
router.delete("/api/studeleteshan", (req, resp) => {
    let query = req.body.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("delete from stus where id=?", [query], (eer, result3) => {
        connection.query("delete from register where id=?", [query], (eer, result3) => {
            return resp.send("z")
        })
    })
})
router.put("/api/stuputxiugai", (req, resp) => {
    let query = req.body.id;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query("select * from stus where id=?", [query], (err, result) => {
        zstu = query
        let s = result[0]
        return resp.send(s)
    })
})
router.put("/api/stuputxg", (req, resp) => {
    let query = req.body;
    function ew(ee) {
        if (ee == '') {
            return null;
        } else {
            return ee
        }
    }
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
    connection.query('update stus set name=?,age=?,sex=?,nation=?,classname=?,contact=?,address=?,dormitoryNo=?,status=? where id=?', [query.name, query.age, query.sex, query.nation, ew(query.classname), query.contact, query.address, ew(query.dormitoryNo), query.status, zstu], (err, result) => {
        connection.query('select * from stus where id=?', [zstu], (err, result3) => {
            resp.send("z")
            return
        })
    })
})
router.get("/api/stugetchazhao", (req, resp) => {
    let query = req.query.name;
    let connection = mysql.createConnection({
        post: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chuang1'
    })
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
    connection.query("select * from stus where name regexp ?", [query], (eer, result3) => {
        if (result3 == undefined || result3.length == 0) {
            s += `<tr><td colspan="11">暂无筛选数据</td></tr>`
            let ees = "暂无数据"
            let es = {
                s: s,
                ees: ees
            }
            resp.send(es)
            return
        } else {
            for (let i = 0; i < result3.length; i++) {
                s += `<tr>
                <td>${i + 1}</td>
                <td>${result3[i].name}</td>
                <td>${result3[i].age}</td>
                <td>${result3[i].sex}</td>
                <td>${result3[i].nation}</td>
                <td class="qs">${ewq(result3[i].dormitoryNo)}</td>
                <td>${result3[i].contact}</td>
                <td>${result3[i].address}</td>
                <td class="cls">${ewb(result3[i].classname)}</td>
                ${eww(result3[i].status)}
               <td><button onclick="shan(${result3[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result3[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
              </tr > `
            }
        }
    })
    let c = '';
    connection.query('select * from chamber', (err1, result3) => {
        c = result3
    })
    connection.query('select * from class', (err1, result3) => {
        let cs = result3
        let cc = {
            s: s,
            c: c,
            cs: cs
        }
        return resp.send(cc)
    })


})

module.exports = router;
