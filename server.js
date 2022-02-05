const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000; // either specified port on config.env or port 5000 (both the same)
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const dbo = require("./db/conn") // db driver connection, file in db folder

app.listen(port, () => {
    // connect to db when server starts
    dbo.connectToServer(err => { if (err) console.error(err); });
    console.log(`Server is running on port: ${port}`);
});