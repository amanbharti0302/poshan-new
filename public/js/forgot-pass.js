$(document).ready(function(){
  	$("#otp").click(function(e){
  		console.log("clicked");
  		
  		var num=$("#num").val();
  		if(num!="" && num.length==10)
  		{
        var flag=0;
  			$.post("generateOTP",{number:num},function(data,status){
  				console.log(data);
          if(data==="Registered")
            flag=1;
          else
            flag=0;
        if(flag===1)
        {
    			$("#otp").hide();
  	  		$("#temporary").css("display","inline");
  	  		$("#temporary").attr("placeholder","Enter OTP");
          $("#submit").prop("disabled",false);
          $("#password").prop("disabled",false);
          $("#Cpassword").prop("disabled",false);
          $(".disab").removeClass("disab");
          e.preventDefault();
	  		}
        else
          alert("Phone Number not Registered");});
        e.preventDefault();
	  	}
      else
        alert("Enter a valid Phone Number");
  		});
    $("#submit").click(function(e){ 
      console.log(e);
      if($("#password").val()!=$("#Cpassword").val())
          {
            alert("Password did not match");
            e.preventDefault();
      }
    });

});
 