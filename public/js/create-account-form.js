$(document).ready(function(){
	$("#otp").click(function(e){
		const adhaar=$("#adhaar").val();
		const num=$("#num").val();
		if($("#num").attr("placeholder")!=="Enter OTP"){

		if(num!=""&&num.length==10&&adhaar!=""&&adhaar.length==12)
		{
			var flag=0;
			$.post("/generateSignupOTP",{adhaar:adhaar,number:num},function(data,status){
	  			console.log(data);
          		if(data==="Registered")
            		flag=1;
          		else
            		flag=0;
            if(flag==1)
            {
				$("#num").val("");
				$("#num").attr("placeholder","Enter OTP");
				$("#otp").text("Submit");
		  		$("#otp").attr("value","submit");
	  		}
	  		else
	  		{
	  			if(data=="Not Registered")
          			alert("You are not registered as a Worker");
          		else
          			alert("You have already registered");
	  		}
        	e.preventDefault();
	  		});
		}
		else
			alert("Enter valid Adhaar and Number");
		e.preventDefault();
	}
	});
});