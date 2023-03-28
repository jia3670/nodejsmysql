var express = require('express');
var router = express.Router();
let fs = require('fs')
let mysql = require('mysql')
let zcl = null;
router.post("/api/clpost", (req, resp) => {
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  let s = '';
  connection.query('select * from class', (err1, result3) => {
    if (result3 == undefined || result3.length == 0) {
      s = `<tr><td colspan="3">暂无班级数据</td></tr>`
      resp.send(s)
      return
    }
    for (let i = 0; i < result3.length; i++) {
      s += `<tr>
      <td>${i + 1}</td>
      <td>${result3[i].name}</td>
      <td><button onclick="shan(${result3[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result3[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
    </tr>`
    }
    resp.end(s)
    return
  })
})
router.post("/api/clposttj", (req, resp) => {
  let query = req.body;
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  connection.query("select * from class", (eer, result) => {
    if (result == undefined) {
      connection.query("create table class(id int not null primary key auto_increment,name varchar(20) not null)", (err, result) => {
        connection.query("insert into class(name) values(?)", [query.name], (err, result2) => {
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
      connection.query("insert into class(name) values(?)", [query.name], (err, result2) => {
        resp.send("z")
        return
      })
    }
  })
})
router.delete("/api/cldeleteshan", (req, resp) => {
  let query = req.body.id;
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  connection.query("delete from class where id=?", [query], (eer, result) => {
    resp.send("z")
    return
  })
})
router.put("/api/clputxiugai", (req, resp) => {
  let query = req.body.id;
  zcl = query
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  connection.query("select * from class where id=?", [query], (eer, result) => {
    resp.send(result[0].name)
    return
  })
})
router.put("/api/clputxg", (req, resp) => {
  let query = req.body;
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  connection.query("select * from class", (err, result) => {
    for (let item of result) {
      if (item.name == query.name && item.id != zcl) {
        resp.send("c")
        return
      }
    }
    connection.query("update class set name=? where id=?", [query.name, zcl], (err, result) => {
      resp.send("z")
      return
    })
  })

})
router.get("/api/clgetchazhao", (req, resp) => {
  let query = req.query.name;
  let connection = mysql.createConnection({
    post: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chuang1'
  })
  let s = '';
  connection.query("select * from class where name regexp ?", [query], (eer, result) => {
    if (result == undefined || result.length == 0) {
      s += `<tr><td colspan="3">暂无筛选数据</td></tr> `
      resp.send(s)
      return
    }
    for (let i = 0; i < result.length; i++) {
      s += `<tr>
          <td>${i + 1}</td>
          <td>${result[i].name}</td>
          <td><button onclick="shan(${result[i].id})" class="btn btn-danger">删除</button><button onclick="xiugai(${result[i].id})" data-target="#myModal2" data-toggle="modal" class="btn btn-info">修改</button></td>
        </tr>`
    }
    resp.send(s)
  })
})

module.exports = router;
