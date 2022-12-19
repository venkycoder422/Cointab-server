const mysql = require('mysql2');
const express = require('express');
var app = express();
const cors = require('cors');

app.use(cors());
const bodyparser = require('body-parser');

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dady@2899',
    connectionLimit: 10,
    database: "users"
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("DB connected");
    } else {
        console.log('DB not connect' + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3308, () => console.log('Express server is running at port number 3360'));

app.get('/users', (req, res) => {
    mysqlConnection.query("SELECT * FROM userdetails", (err, rows, fields) => {
        if (!err)
            return res.send(rows)
        else
            console.log(err);
    })
});

app.post('/user', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.image;
    const email = req.body.email;
    const cell = req.body.cell;
    const gender = req.body.gender;
    const age = req.body.age;

    // res.send(JSON.stringify(req));
    mysqlConnection.query(`INSERT INTO userdetails (id,name,email,cell,gender,age,image) VALUES (${+(id)},${name},${email},${cell},${gender},${+(age)},${image}))`,(err,rows,fields)=>{
        if(!err)
           res.send(rows);
        else
            res.send(err);
    })
});
// pool.query('select * from user',(err,result,fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })