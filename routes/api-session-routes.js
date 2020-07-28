var db = require("../models");

module.exports = function(app) {
    
    app.post("/api/createSession", function(req, res) {
        db.Session.create(req.body).then(function(dbSession) {
          res.json(dbSession);
        });
    })

    app.get("/api/getSessions", function(req, res) {
        db.Session.findAll({
            //attributes: ["startTime", "sessionDetails"],
            order: [["startTime", "ASC"]],
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

    app.get("/api/getTutorSessions/:Tutor?", function(req, res){
        console.log("triggered")
        db.Session.findAll({

        //attributes: ["startTime", "sessionDetails"],
        order: [["startTime", "ASC"]],
        include: [
                {model:db.Tutor,  include: [{model:db.User, attributes: ["firstName", "lastName"]}]},
                {model:db.Student, include: [{model:db.User, attributes: ["firstName", "lastName"]}]}
            ],
  
          where: {
            TutorId: req.params.Tutor
          }
          
        }).then(function(dbTutor){
          res.json(dbTutor)
        })
  
    })

    app.get("/api/getStudentSessions/:Student?", function(req, res){
        console.log("triggered")
        db.Session.findAll({
            attributes: ["startTime", "sessionDetails"],
            order: [["startTime", "ASC"]],
            include: [
                {model:db.Tutor,  include: [{model:db.User, attributes: ["firstName", "lastName"]}]},
                {model:db.Student, include: [{model:db.User, attributes: ["firstName", "lastName"]}]}
            ],
  
          where: {
            StudentId: req.params.Student
          }
          
        }).then(function(dbTutor){
          res.json(dbTutor)
        })
  
    })
  
    


}