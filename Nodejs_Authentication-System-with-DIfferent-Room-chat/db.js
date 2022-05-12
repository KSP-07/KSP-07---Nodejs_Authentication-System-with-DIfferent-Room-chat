const mysql=require('mysql');

const db=mysql.createConnection({
    host:process.env.DBhost,
    user:process.env.DBuser,
    password: process.env.DBpassword,
    database:process.env.DBdb
})
db.connect((error) => {
    if(error) {
        console.log('Db connect error')
    }else{
        console.log('Db connected...')
    }
})

module.exports=db;