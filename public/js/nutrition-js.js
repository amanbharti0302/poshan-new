 function todayDate(){
  const today=new Date();
  const d=(today.getDate()).toString();
  const m=(today.getMonth()+1).toString();
  const y=(today.getFullYear()).toString();
  const date=d+"/"+m+"/"+y;
  return date;
}


$(document).ready(function(){
	$("#addhead").click(function(){
		$("#addform").slideToggle("slow");
	});
	$("#removeheader").click(function(){
		$("#removeform").slideToggle("slow");
	});
	$("#addcheckbtn").click(function(event){
		event.preventDefault();
		var addinput=$("#addinput").val();
		if(addinput=="")
			alert("Kindly enter the uid to add user");
		else
		{
			$.post("/dashboard/nutrition/checkUser",{uuid:addinput},function(data,status){
				if(data==="already")
					alert("User already there in mid-day meal list");
				else if(data==="no such user")
					alert("No user with this uuid");
				else if(data==="cant register")
					alert("The uid does not belong to a child");
				else
					{
						alert("Click on add button to add user to mid-day meal");
						$("#addcheckbtn").hide();
						$("#addsubmitbtn").css("display","block");
					}
			});
		}
	});
	$("#removecheckbtn").click(function(event){
		event.preventDefault();
		var removeinput=$("#removeinput").val();
		if(removeinput=="")
			alert("Kindly enter the uid to add user");
		else
		{
			$.post("/dashboard/nutrition/removeCheckUser",{uuid:removeinput},function(data,status){
				if(data!="not already")
				{
					alert("Click on remove button to remove "+ data +" from mid-day meal");
					$("#removecheckbtn").hide();
					$("#removesubmitbtn").css("display","block");
				}
				else
					alert("No such child with respective uid");
			});
		}
	});
	$("#fordate").text(todayDate());
	$.get("/dashboard/nutrition/mdmStatus",function(data,status){
		console.log(data);
		if(data=="nodata")
		{
			$("#midDayData").hide();
			$("#midDayEntry").css("display","block");
			$("#midDayEntrybtn").css("display","block");
		}
		else
		{
			const obj1=JSON.parse(data);
			$("#midDayEntry").hide();
			$("#midDayEntrybtn").hide();
			$("#midDayData").css("display","block");
			$("#midDayData").text(obj1.number);
		}
	});
})