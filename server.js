const express = require("express");
const path = require("path"); // for azure connection
const cors = require("cors");
const app = express();
const dbo = require("./db/conn") // db driver connection, file in db folder
app.use('/api', require("./routes/record"));

app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')));

app.set('port', process.env.PORT || '5000'); // either specified port on config.env or port 5000, cannot hardcode port for azure

app.use(cors());
app.use(express.json());

// for azure connection: GET route points to static react build 
app.use(express.static("./client/build")); 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(app.get('port'), () => {
    // connect to db when server starts
    dbo.connectToServer(err => { if (err) console.error(err); });
    console.log(`Server is running on port: ${app.get('port')}`);
});