const express = require("express");
const recordRoutes = express.Router(); // router used to define routes, middleware to control requests starting with path/record
const dbo = require("../db/conn"); // connect to db
const ObjectId = require("mongodb").ObjectId; // helps convert id from string to ObjectId for the _id mongodb queries

// read list of all records
recordRoutes.route("/record").get((request, response) => {
    let db_connect = dbo.getDb("employees"); 
    db_connect
        .collection("records")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// read single record by id
recordRoutes.route("/record/:id").get((request, response) => {
    let db_connect = dbo.getDb("employees"); 
    let myQuery = { _id: ObjectId( request.params.id ) };
    db_connect
        .collection("records")
        .findOne(myQuery, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// create new record
recordRoutes.route("/record/add").post((request, response) => {
    let db_connect = dbo.getDb("employees");
    let myObj = {
        name: request.body.name,
        position: request.body.position,
        level: request.body.level
    };
    db_connect
        .collection("records")
        .insertOne(myObj, (err, result) => {
            if (err) throw err;
            console.log("1 document added");
            response.json(result);
        });
});

// update a record by id
recordRoutes.route("/update/:id").post((request, response) => {
    let db_connect = dbo.getDb("employees");
    let myQuery = { _id: ObjectId( request.params.id ) };
    let newValues = {
        $set: {
            name: request.body.name,
            position: request.body.position,
            level: request.body.level
        }
    };
    db_connect
        .collection("records")
        .updateOne(myQuery, newValues, (err, result) => {
            if (err) throw err;
            console.log("1 document updated");
            response.json(result);
        });
    });
    
// delete a record by id
recordRoutes.route("/:id").delete((request, response) => {
    let db_connect = dbo.getDb("employees");
    let myQuery = { _id: ObjectId( request.params.id ) };
    db_connect
    .collection("records")
    .deleteOne(myQuery, (err, obj) => {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

module.exports = recordRoutes;