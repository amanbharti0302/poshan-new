
$(document).ready(function(){
	$("#head").click(function(){
		$("#form").slideToggle("slow");
	});
	$('.oof').click(function(e){
		var k="."+String(e.currentTarget.id);
    	$(k).slideToggle();
	});
	$('#vaccineListbtn').click(function(){
		const list=$('#list').css('display');
		console.log(list);
		if(list=='none')
			$('#list').css('display','inline-block');
		else
			$('#list').css('display','none');
	});
	$('#addNewVaccinebtn').click(function(){
		const vac=$("#addNewVaccine").css('display');
		if(vac=='none')
			$('#addNewVaccine').css('display','inline-block');
		else
			$('#addNewVaccine').css('display','none');
	});
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
});
