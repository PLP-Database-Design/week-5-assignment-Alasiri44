// Declare dependencies/variables

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv'); 
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//  Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_password,
        database: process.env.DB_NAME
    }
);

// Check if db connection works
db.connect((err) => {
    //  Check if there is an error
    if (err) { return console.log("Error connecting to the mysql db");}

    // Yes, if  there is no error, then we are connected to the database
    console.log("Conected to mysql successfully as id:", db.threadId)

    // Your code goes here
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    // Data is the name of the file inside views folder
    app.get('/data', (req,res) => {
        // Retrieve data from the database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error fetching data');
            }
            else{
                res.render('data', {results: results});
            }
        });

        db.query('SELECT * FROM providers', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error fetching data');
            }
            else{
                res.render('data', {results: results});
            }
        });

        db.query('SELECT first_name FROM patients', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error fetching data');
            }
            else{
                res.render('data', {results: results});
            }
        });

    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);

        // Send a  message to the browser
        console.log('Sending message to browser...');
        app.get(`/`, (req, res)  => {
            res.send('Server started successfully')
        })

    });
});