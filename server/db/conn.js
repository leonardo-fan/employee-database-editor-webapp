const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _db;

module.exports = {
    connectToServer: callback => {
        client.connect((err, db) => {
            // verify db object
            if (db) {
                _db = db.db("myFirstDatabase");
                console.log("Successfully connected to MongoDB");
            }
            return callback(err);
        });
    },
    
    getDb: () => {
        return _db;
    }
};

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });