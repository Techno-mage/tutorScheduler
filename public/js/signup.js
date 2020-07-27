$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstInput = $("input#first-input");
  var lastInput = $("input#last-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var tutorCheck = $("input#tutorCheck");
  var studentCheck = $("input#studentCheck");
  var bothCheck = $("input#bothCheck");
  var check = $(".check");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstInput.val().trim(),
      lastName: lastInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()

    };

    if (!userData.firstName||!userData.lastName||!userData.email || !userData.password || check.prop(':checked')===false) {
      return;
    }
    //If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.email, userData.password);
    
    emailInput.val("");
    passwordInput.val("");
    //check.prop('checked', false);
  });

  //Does a post to the signup route. If successful, we are redirected to the members page
  //Otherwise we log any errors
  function signUpUser(first, last, email, password) {
    $.post("/api/signup", {
      
      email: email,
      password: password,
      firstName: first,
      lastName: last
    })
      .then(function(data) {
        console.log(tutorCheck);
        if (studentCheck.prop('checked')===true){
          
          signUpStudent(first);
          
        }
        else if (tutorCheck.prop('checked')===true){
          
          signUpTutor(first);
          
        }
        else{
          
          signUpBoth(first);
        }

        
        //If there's an error, handle it by throwing up a bootstrap alert
     })
      .catch(handleLoginErr);
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
  function signUpBoth(first){
    console.log("this")
    $.get("/api/users/"+first).then(function(data) {
      
      $.post("/api/createTutor", {
          
          UserId: data.id

      }).then(function(data) {

        $.get("/api/users/"+first).then(function(data){

          $.post("/api/createStudent", {
            
            UserId: data.id

          }).then(function(data) {
           
            window.location.replace("/dashboard");
            
            // If there's an error, handle it by throwing up a bootstrap alert
          })
        })

        
        .catch(handleLoginErr);
        
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
      

    })

  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
