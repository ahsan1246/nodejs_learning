const express = require("express");
const path = require("path");

const app = express(); // create an object of express

const publicPath = path.join(__dirname, 'public'); // to get public folder path and store in publicPath variable

app.use(express.static(publicPath)); // this statement load the files available in public folder

app.listen(5000); // define port to access server

// ---------------------------------------------------------------------------------------------------------------------------------------
// // way to get directory path of project, any main folder, sub level folder or any file but in project,
// const path = require('path');

// const dirPath = path.join(__dirname, 'files', 'images');
// console.log(dirPath);
