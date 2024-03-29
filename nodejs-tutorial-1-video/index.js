const express = require("express");
const reqAgeFilter = require("./middlewares/reqAgeFilter");
const path = require("path");

const app = express(); // create an instance of express

const publicPath = path.join(__dirname, "public"); // to get public folder path and store in publicPath variable

// ----- To load static file but we need to pass file name with file extension to access file content.
app.use(express.static(publicPath)); // this statement load the files available in public folder

// ----- To load file with base on custom name
// to access index on home page
app.get("/", (_, resp) => {
  resp.sendFile(`${publicPath}/index.html`);
});
// to show about page
app.get("/about", (_, resp) => {
  resp.sendFile(`${publicPath}/about.html`);
});

// ----- access dynamic pages using ejs
app.set("view engine", "ejs");
// profile page route
app.get("/profile", (_, resp) => {
  const user = {
    name: "ahsan",
    email: "ahsan@test.com",
    skills: ["Flutter", "Dart", "JS", "Java", "NodeJS"],
  };
  resp.render("profile", { user });
});

// login page route
app.get("/login", (_, resp) => {
  resp.render("login");
});

// ----- To apply middleware configuration on complete application
// app.use(reqAgeFilter);

// app.get('/check_age', reqAgeFilter);

// ----- start of apply middleware on single / multiple routes
const route = express.Router(); // store reference of router module for apply middleware on route group

route.use(reqAgeFilter); // To define the middleware for use in route

route.get("/user", (_, resp) => {
  resp.send("Welcome to user page!");
});
// ----- End of apply middleware on single / multiple routes

app.use("/", route); // this statement tells the app to use/consider method with route object is also a route but with middleware config

// to handle unavailable route
app.get("*", (_, resp) => {
  resp.sendFile(`${publicPath}/404.html`);
});

app.listen(5000); // define port to access server

// -----
// // way to get directory path of project, any main folder, sub level folder or any file but in project,
// const path = require('path');

// const dirPath = path.join(__dirname, 'files', 'images');
// console.log(dirPath);
