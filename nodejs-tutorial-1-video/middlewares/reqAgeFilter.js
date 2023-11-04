// ----- Access Age Filter Middleware
module.exports = reqAgeFilter = (req, resp, next) => {
    if (!req.query.age) {
            resp.send('Age information in not available!');
    } else if (req.query.age < 18) {
            resp.send('You are not allowed to access this page.');
    } else {
            next();
    }
}