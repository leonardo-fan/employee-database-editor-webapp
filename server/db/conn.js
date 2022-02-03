const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

// methods that can be used by other files that require(conn)
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