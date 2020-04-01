$("#checkUserbtn").click(function(event){
		event.preventDefault();
		const uuid=$("#uuid").val();
		if(uuid!='')
		$.post("/dashboard/simplyCheckUser",{uuid:uuid},function(data,status){
			if(data=="userexists")
			{
				alert("Click on Submit");
				$("#checkUserbtn").hide();
				$("#searchUserbtn").css("display","block");
			}
			else
				alert("No user with this UUID registered under you");
		});
		else
			alert("Firstly enter UUID");
	});