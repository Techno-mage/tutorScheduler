var db = require("../models");

module.exports = function(app) {
    
    app.post("/api/createSession", function(req, res) {
        db.Session.create(req.body).then(function(dbSession) {
          res.json(dbSession);
        });
    })

    app.get("/api/getSessions", function(req, res) {
        db.Session.findAll({
            attributes: ["startTime", "sessionDetails"],
            include: [
                {model:db.Tutor,  include: [{model:db.User, attributes: ["firstName", "lastName"]}]},
                {model:db.Student, include: [{model:db.User, attributes: ["firstName", "lastName"]}]}
            ]
        })
        .then(function(dbSession) {
            //console.log(dbSession)
            //let tutorName = dbSession.tutor.User.firstName + " " + dbSession.tutor.User.lastName;
            //let studentName = "";
            /*res.json({
                tutorName,
                studentName
            })*/
            res.json(dbSession);
        });
    })

    app.put("/api/sessionSignup", function(req, res) {
        db.Session.update({
            StudentId: req.body.StudentId,
            sessionDetails: req.body.sessionDetails
        }, {
          where: {
            id: req.body.id
          }
            
        })
        .then(function(dbSession) {
            res.json(dbSession);
        });
    })
    


}