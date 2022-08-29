const { ObjectID } = require("bson");
const express = require("express");
const mongodb = require("mongodb").MongoClient;
const db = require("mongodb");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const url = 'mongodb+srv://harold:2364144@ecoverso.juoji3w.mongodb.net/?retryWrites=true&w=majority';

mongodb.connect(url, function(err, db){
    if(err) throw err;
    var dba = db.db("Ecoverso");
    app.get("/", (req, res)=>{
        dba.collection("ecoverso").find().toArray(function(err, result){
            if(err) throw err;
            res.send(result);
        })  
    }) 
    app.post("/", (req, res)=>{
        const {name, description, img} = req.body;
        dba.collection("ecoverso").insertOne({
            name, description, img
        });
        console.log("success");
    })  
    app.delete("/:id", (req, res)=>{
        const {id} = req.params;
        dba.collection("ecoverso").deleteOne({"_id": ObjectID(id)});
    })
})



app.listen(4000, ()=>{
    console.log("server on port 4000");
})