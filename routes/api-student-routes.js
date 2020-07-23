var db = require("../models");

module.exports = function(app) {

    app.post("/api/createStudent", function(req, res) {
        db.Student.create(req.body).then(function(dbStudent) {
          res.json(dbStudent);
        });
    })



}