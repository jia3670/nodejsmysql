// let mysql = require('mysql');
// let pool = mysql.createPool({
//     connectionLimit: 20,
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'chuang1'
// });
// //封装
// function select(sql, ars) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) throw err;
//             connection.query(sql, ars, (error, result) => {
//                 if (error) throw error
//                 resolve(result)
//             })
//         })
//     })
// }
// // 导出
// module.exports = select()