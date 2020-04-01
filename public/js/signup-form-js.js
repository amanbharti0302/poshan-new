$(document).ready(function(){
$("#submit").click(function(e){	
if($("#password").val()!=$("#Cpassword").val())
          {  alert("Password did not match");e.preventDefault();}
    });
});