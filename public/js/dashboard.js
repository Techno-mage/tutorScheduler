$(document).ready(function () {
  $.get("api/user_data").then(data => {
    console.log(data)
    $("#student").val(data.Student.id)
    $("#studentProfile").val(data.Student.studentProfile)
  })




  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/getSessions").then(function (data) {

    for (var i = 0; i <= data.length; i++) {
      var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
      var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"><div class="card-title"><span><b>Tutor:</b> ' + data[i].Tutor.User.firstName + ' ' + data[i].Tutor.User.lastName + '</span></div><p><b>Start Time:</b> ' + sqlToJsDate(data[i].startTime) + ' </p><p><b>Session Details:</b> ' + data[i].sessionDetails + '</p></div></div>');
      myPanel.appendTo(myCol);
      myCol.appendTo('#tutor');
    }



  });
});

function saveProfile() {
  event.preventDefault()
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

  return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond);
}

