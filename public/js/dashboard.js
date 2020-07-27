$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $("#tutor").text(data.email);
      $("#student").text(data.firstName+" "+data.lastName)
    });
  });

  function openTab(tabName, other) {
    document.getElementById(other).style.display = "none";

    if (tabName == 'tutor'){
      $('.tutButton').css('background-color','#999995')
      $('.studButton').css('background-color','black') 
    } 
    if (tabName == 'student') {
      $('.tutButton').css('background-color','black')
      $('.studButton').css('background-color','#999999') 
    }
    document.getElementById(tabName).style.display = "block";  
  }