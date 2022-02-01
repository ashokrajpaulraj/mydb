const express = require("express")
var app = express()
const {Client} = require("pg") //module - postgres
var port = process.env.PORT || 3000

app.listen(port, function(err)
{
    if(err)
    {
        console.log("err in server start")
        return
    }
    console.log("Server started at ", port)
})

const client = new Client({
    host: "ec2-52-2-245-64.compute-1.amazonaws.com",
    database : "d9ro2tuu7timli",
    port : 5432,
    user : "wddylzwfzvcovw",
    password : "8c75eecbd61c19ca9e498d79a52c2a4c317f065f9de04a8bc085353cbf6dd9bb",
    ssl:{
        rejectUnauthorized: false
    }
})

//connect
client.connect()

app.get("/", function(req, res){
    res.send("Welcome to database application")
})

app.get("/createdb", function(req, res){
    var sql = "create table subject( name varchar(200), maxmark int, color varchar(100) ) ";
    client.query( sql, function(err, result){
        if(err)
        {
            res.send("err in table creation")
            return
        }
        res.send("Table created successfully")
    } ) 
})

app.get("/adddata", function(req, res){
    var query = "insert into subject (name, maxmark, color) values ('Social', '200', 'Yellow') "
    client.query(query, function(err, result){
        if(err)
        {
            res.send("err in inserting")
            return
        }
        res.send("Row inserted successfully")
    })
})

app.get("/getdata", function(req, res){
    //selecting the data from the table subject
    var selectQuery = "select * from subject"
    client.query(selectQuery, function(err, result){
        if(err)
        {
            res.send("Err in select query")
            return
        }
        var htmlContent = ""
        if( result.rowCount > 0 )
        {
            //console.log("Result : ", result.rows)
            for( var tempRow of result.rows )
            {
                htmlContent = htmlContent + tempRow.name + "</br>";
            }
            res.send(htmlContent)
        }
        else{
            res.send("err in sleect")
            return
        }
    })
})
