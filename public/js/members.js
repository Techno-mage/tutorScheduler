$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $("#tab1Id").append(data.email);
    $("#tab5Id").append(data.firstName);
    
    console.log(data.email);
  });
});
