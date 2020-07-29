//const { session } = require("passport");

$(document).ready(async function () {
  await $.get("api/user_data").then(data => {
    //console.log(data)
    if (data.Student && !data.Tutor){
      $("#student").val(data.Student.id)
      $("#studentProfile").val(data.Student.studentProfile)
      $(".display-4").text(data.firstName + " " + data.lastName)
      $(".descpt").empty();
      $("#upSession").empty();
      $(".descpt").append($("<button>").addClass("btn btn-primary").text("Become a Tutor.").click(function(){signUpTutor(data.firstName)}));
    }
    
    //console.log(data.User.Tutor.id)
    else if (data.Tutor && !data.Student){
        
      $("#tutor").val(data.Tutor.id)
      
      $("#tutorProfile").val(data.Tutor.tutorProfile)
      $(".display-3").text(data.firstName + " " + data.lastName)
      $(".stuDescpt").empty();
      $("#upStuSession").empty();
      $(".stuDescpt").append($("<button>").addClass("btn btn-primary").text("Become a Student.").click(function(){signUpStudent(data.firstName)}));
      
    }

    else if (data.Student && data.Tutor){
        $("#student").val(data.Student.id)
        $("#studentProfile").val(data.Student.studentProfile)
        $(".display-4").text(data.firstName + " " + data.lastName)
        $("#tutor").val(data.Tutor.id)
      
        $("#tutorProfile").val(data.Tutor.tutorProfile)
        $(".display-3").text(data.firstName + " " + data.lastName)
        console.log("this happened")
    }
    
    
  })

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  //console.log($("#tutor").val())
  $.get("/api/getTutorSessions/" + $("#tutor").val()).then(data => {
    //console.log(data)

    for (session of data){
      //Start time
      var time = sqlToJsDate(session.startTime);
      //if (!student) available
      var text;
      if (!session.Student){
        text = "available"
      }else {
        text = `Student: ${session.Student.User.firstName} ${session.Student.User.lastName}
        
        Session description
        ${session.sessionDetails}`
      }
      //else display student name and session description. 
      var car = $("<div>").addClass("card col-sm-3 col-md-3");
      var stime = $("<p>").text("session time: "+time);
      var details = $("<p>").text(text);
      var body = $("<div>").addClass("card-body").append(stime);
      body.append(details)
      car.append(body)
      $("#contentPanel").append(car)

    }
    
  })

  $.get("/api/getStudentSessions/" + $("#student").val()).then(data => {
    for (session of data){
      //Start time
      var time = sqlToJsDate(session.startTime).toLocaleString();
      //if (!student) available
      var text;
      
      text = `Tutor: ${session.Tutor.User.firstName} ${session.Tutor.User.lastName}
        
        Session description:
        ${session.sessionDetails}`
      
      //else display student name and session description. 
      var car = $("<div>").addClass("card col-sm-3 col-md-3");
      var stime = $("<p>").text("session time:"+time);
      var details = $("<p>").text(text);
      var body = $("<div>").addClass("card-body").append(stime);
      body.append(details)
      car.append(body)
      $("#StudentContent").append(car)

    }
  })

  //Get available tutors. 
  $.get("/api/Tutors").then( data => {
     
    console.log(data)

    for (tutor of data){
      var tutorData = $("<div>").addClass("col-sm-3 col-md-3").html(`<p>Tutor: ${tutor.User.firstName} ${tutor.User.lastName}</p>
    <p>${tutor.tutorProfile}</p>`);
    const sessions = $("<div>").addClass("card col-sm-3 col-md-3");
    const body = $("<div>").addClass("row card-body").append(tutorData)
    body.append(sessions)
    $("#availableTutors").append(body)
    console.log(tutor.id)
    const tutorid = tutor.id
      //var sessionData = listAvailableSession(tutor.id) //$("<div>").text("List of available Sessions");
       $.get("/api/getTutorSessions/" + tutorid).then(data => {
        var available = data.filter(s=> {return s.Student === null})
        //console.log(available)
        //sessions = $("<div>").addClass("card col-sm-3 col-md-3");
        available.forEach(e => {
          sessions.append($("<button>").addClass("btn btn-primary").text(sqlToJsDate(e.startTime).toLocaleString())
          
          .click(()=> {$('#signUp').val(e.id).modal()
            console.log(e.id)
            }))
            
        })
        console.log(sessions)
        //var body = $("<div>").addClass("row card-body").append(tutorData)
        //body.append(sessions);
        //$("#availableTutors").append(body)
      })
      
    }
    

  })
  
  
});

function sessionSignup(){
  console.log($("#signUp").val())
  $.ajax({
    method:"PUT",
    url:"/api/sessionSignup",
    data: {id:parseInt($("#signUp").val()),
     StudentId:$("#student").val(),
     sessionDetails:$("#signUpDetails").val()}
  }).then(res =>{
    console.log(res)
  })

  //pop up the model
  //signup Sessions api call
}

function listAvailableSession(TutorId){
  $.get("/api/getTutorSessions/" + TutorId).then(data => {
    var available = data.filter(s=> {return s.Student === null})
    //console.log(available)
    var sessions = $("<div>").addClass("col-sm-9 col-md-9");
    available.forEach(e => {
      sessions.append($("<button>").addClass("btn btn-primary").text(sqlToJsDate(e.startTime)))
    });
    //console.log(sessions)
    return sessions;

  })
  
}

function saveProfile() {
  event.preventDefault()
  console.log("happening")
  console.log($("#student").val() +$("#studentProfile").val())
  $.ajax({
    method:"PUT",
    url:"/api/updateStudentProfile",
    data: {id:parseInt($("#student").val()), profile:$("#studentProfile").val()}
  })
  //$.put("/api/updateStudentProfile", {id:$("#student").val(), profile:$("#studentProfile").text()})
  .then(data => {
    //console.log(data)
  })

}
function saveTutorProfile() {
  event.preventDefault()
  console.log($("#tutor").val() +$("#tutorProfile").val())
  $.ajax({
    method:"PUT",
    url:"/api/updateTutorProfile",
    data: {id:parseInt($("#tutor").val()), profile:$("#tutorProfile").val()}
  })
  //$.put("/api/updateStudentProfile", {id:$("#student").val(), profile:$("#studentProfile").text()})
  .then(data => {
    //console.log(data)
  })

}



  function saveSession(){
      $.get("/api/user_data").then(function(data){
        $.get("/api/tutorByUId/"+data.id).then(function(datas){
            
            $.post("/api/createSession", {
                
                TutorId: datas.id,
                startTime: $("#start").val().trim()+" "+$("#time").val().trim()+":00"
            }).then(function(data){
                console.log(data);
            })
            //.catch(err)
      })
    })
    console.log($("#start").val())
    console.log($("#time").val())
   
}
  
  

function openTab(tabName, other) {
  document.getElementById(other).style.display = "none";

  if (tabName == 'tutor') {
    $('#tutButton').addClass("active")
    $('#studButton').removeClass("active")
  }
  if (tabName == 'student') {
    $('#tutButton').removeClass("active")
    $('#studButton').addClass("active")
  }
  document.getElementById(tabName).style.display = "block";
}

function sqlToJsDate(sqlDate) {
  //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
  var sqlDateArr1 = sqlDate.split("-");
  //format of sqlDateArr1[] = ['yyyy','mm','ddThh:mm:msZ']
  var sYear = sqlDateArr1[0];
  var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
  var sqlDateArr2 = sqlDateArr1[2].split("T");
  //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.msZ']
  var sDay = (Number(sqlDateArr2[0]) - 1).toString();
  var sqlDateArr3 = sqlDateArr2[1].split(":");
  //format of sqlDateArr3[] = ['hh','mm','ss.msZ']
  var sHour = sqlDateArr3[0];
  var sMinute = sqlDateArr3[1];
  var sqlDateArr4 = sqlDateArr3[2].split(".");
  //format of sqlDateArr4[] = ['ss','msZ']
  var sSecond = sqlDateArr4[0];
  //var sMillisecond = sqlDateArr4[1];
  var ddate = new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond);
  //ddate.setTime(ddate.getTime() - (ddate.getTimezoneOffset()*60*1000))
  //console.log(ddate)

  return ddate;
}

function signUpTutor(first){
  console.log("the others")
  $.get("/api/users/"+first).then(function(data) {
    $.post("/api/createTutor", {
      UserId: data.id
    }).then(function(data) {
      window.location.replace("/dashboard");
      
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  })
  
} 
function signUpStudent(first){
  console.log("that")
  $.get("/api/users/"+first).then(function(data) {
    $.post("/api/createStudent", {
      UserId: data.id
    }).then(function(data) {
      window.location.replace("/dashboard");
      
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  })
}