var db = require("../models");

module.exports = function(app) {

    app.post("/api/createTutor", function(req, res) {
        db.Tutor.create(req.body).then(function(dbTutor) {
          res.json(dbTutor);
        });
    })

    app.put("/api/updateTutorProfile", function(req, res) {
        // Update takes in an object describing the properties we want to update, and
        // we use where to describe which objects we want to update
        db.Tutor.update({
          tutorProfile: req.body.profile
        }, {
          where: {
            id: req.body.id
          }
        }).then(function(dbTutor) {
          res.json(dbTutor);
        });
    });

    app.get("/api/Tutors", function(req, res) {
        db.Tutor.findAll({
            attributes: [ "tutorProfile"],
            include: [{model:db.User, attributes: ["firstName","lastName","Email"]}]
        }).then(function(dbTutor) {
            res.json(dbTutor)
        })
    
    })
    app.get("/api/tutors/:Tutor?", function(req, res) {
        db.Tutor.findOne({

            where: {
                id: req.params.Tutor
            },
            include: [db.User]
        }).then(function(dbTutor) {
            res.json(dbTutor)
        })
    
    })
    



}