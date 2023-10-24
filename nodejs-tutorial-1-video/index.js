const express = require("express");
const path = require("path");

const app = express(); // create an object of express

const publicPath = path.join(__dirname, 'public'); // to get public folder path and store in publicPath variable

// ----- To load static file but we need to pass file name with file extension to access file content.
app.use(express.static(publicPath)); // this statement load the files available in public folder

// ----- To load file with base on custom name
// to access index on home page
app.get('/', (_, resp) => {
        resp.sendFile(`${publicPath}/index.html`);
});
// to show about page
app.get('/about', (_, resp) => {
        resp.sendFile(`${publicPath}/about.html`);
});

// ----- access dynamic pages using ejs
app.set('view engine', 'ejs');
// profile page route
app.get('/profile', (_, resp) => {
        const user = {
                name: 'ahsan',
                email: 'ahsan@test.com',
                skills: ['Flutter', 'Dart', 'JS', 'Java', 'NodeJS'],
        };
        resp.render('profile', {user});
});

// login page route
app.get('/login', (_, resp) => {
        resp.render('login');
});

// ----- Middleware
const reqAgeFilter = (req, resp, next) => {
        if (!req.query.age) {
                resp.send('Age information in not available!');
        } else if (req.query.age < 18) {
                resp.send('You are not allowed to access this page.');
        } else {
                next();
        }
}

app.use(reqAgeFilter);

// app.get('/check_age', reqAgeFilter);

// to handle unavailable route
app.get('*', (_, resp) => {
        resp.sendFile(`${publicPath}/404.html`);
});

app.listen(5000); // define port to access server

// -----
// // way to get directory path of project, any main folder, sub level folder or any file but in project,
// const path = require('path');

// const dirPath = path.join(__dirname, 'files', 'images');
// console.log(dirPath);
