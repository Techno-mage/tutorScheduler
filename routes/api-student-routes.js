var db = require("../models");

module.exports = function(app) {

    app.post("/api/createStudent", function(req, res) {
        db.Student.create(req.body).then(function(dbStudent) {
          res.json(dbStudent);
        });
    })

    app.put("/api/updateStudentProfile", function(req, res) {
        // Update takes in an object describing the properties we want to update, and
        // we use where to describe which objects we want to update
        db.Student.update({
          profile: req.body.profile
        }, {
          where: {
            id: req.body.id
          }
        }).then(function(dbStudent) {
          res.json(dbStudent);
        });
    });



}