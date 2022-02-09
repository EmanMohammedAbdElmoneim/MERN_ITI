const { urlencoded } = require("body-parser");
const express=require("express");
const fs=require("fs");
const total=require('./total.js');

const obj=new total();
obj.add(10);
obj.add(3);
console.log(obj.total)
const obj1=new total();
obj1.add(16);
obj1.add(11);
console.log(obj1.total)

fs.readFile("products.json",(err,data)=>
{
    if(err)
    {
        console.log(err.toString())
    }
    prData=JSON.parse(data);
})

const app=express();

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));

app.get('/login',function (req,res){
    console.log("Get ==> "+req.query.name);
    console.log("Get ==> "+req.query.passward);
    res.send("Welcome "+req.query.name);
})
app.post('/login',function (req,res){
    console.log("Post ==> "+req.body.name);
    console.log("Post ==> "+req.body.passward);
    res.send("Welcome "+req.body.name);
})
app.get('/home',function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get('/products/:id',function(req,res){
    if(req.params.id==undefined)
    {
        res.send("Enter Id as parameter");
    }
    else
    {
        if(isFinite(req.params.id))
        {
            var index=parseInt(req.params.id)-1;
            if(prData.length==0)
            {
                res.send("Wait...");
            }else if(prData.length<(req.params.id))
            {
                res.send("product not found");
            }
            else
            {
                res.send(prData[index]);
            }
            
        }else{
            res.send("Invalid ID");
        }
    }
})
app.listen(4000);