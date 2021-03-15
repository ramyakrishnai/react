const app = require("express")();
var http = require('http');
console.log("hi Ramya")
var http = require('http');
const mySql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var connec = mySql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"nodedb"
})
connec.connect((err)=>{
  if (err) throw err;
  console.log("connected!")
  // connec.query("insert into customers(name , address) values ('ramya','kkd')",(err,res)=>{
  //   if(err) throw err;
  //   console.log("data inserted")
  // })
})
var cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.get("/",(req,res)=>{
  connec.query("select * from customers",(err,response)=>{
    if(err) throw err;
    
    res.send(response);
    res.end();
  })
  
 
})
app.post("/postData",(req,res)=>{
  let response1 = ""
  connec.query(`insert into customers (name,address) values ('${req.body.name}','${req.body.city}')`,(err,response)=>{
    if(err) {
      response1 = "UNABLE TO LOAD THE DATA"
    }else{
      response1 = "Data inserted successfully";
    }
    
  })
  res.send(req.body);
  res.end()
})
app.get("/details/:id",(req,res)=>{
  connec.query(`select * from customers where SNo='${req.params.id}'`,(err,response)=>{
    if(err) {
      console.log(err);
      
    }
      res.send(response);
      res.end();
    
  })
 
  
})
app.listen(8080)