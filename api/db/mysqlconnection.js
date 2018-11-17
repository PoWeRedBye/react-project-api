const mysql = require('mysql');

const config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "react_api",
});

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


config.beginTransaction();




const parts = 'CREATE TABLE IF NOT EXISTS parts (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255), parts_name VARCHAR(255), amount DOUBLE)';
config.query(parts, async (err) => {
    if (err) throw err;
    console.log("Table created");});

const coming_parts = 'CREATE TABLE IF NOT EXISTS coming_parts (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255), name VARCHAR(255), amount DOUBLE, client VARCHAR(255), paid_form VARCHAR(255), invoice_number VARCHAR(255))';
    config.query(coming_parts, async (err) => {
    if (err) throw err;
    console.log("Table created");});

const incoming_parts = 'CREATE TABLE IF NOT EXISTS incoming_parts (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255), name VARCHAR(255), amount DOUBLE, client VARCHAR(255), paid_form VARCHAR(255), invoice_number VARCHAR(255))';
    config.query(incoming_parts, async (err) => {
    if (err) throw err;
    console.log("Table created");});

const cartridges = 'CREATE TABLE IF NOT EXISTS cartridges (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), client VARCHAR(255), paid_form VARCHAR(255), invoice_number VARCHAR(255), executor VARCHAR(255))';
    config.query(cartridges, async (err) => {
    if (err) throw err;
    console.log("Table created");});

const printers = 'CREATE TABLE IF NOT EXISTS printers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), client VARCHAR(255), paid_form VARCHAR(255), invoice_number VARCHAR(255), executor VARCHAR(255))';
    config.query(printers, async (err) => {
    if (err) throw err;
    console.log("Table created");});



