$(document).ready(function(){
	$("#referalbtn").click(function(){
		const prob=$("#referal").val();
		if(prob!=""){
			const today=new Date();
	  		const d=(today.getDate()).toString();
	  		const m=(today.getMonth()+1).toString();
	  		const y=(today.getFullYear()).toString();
	  		const date=d+"/"+m+"/"+y;
			$("#id01").css("display","block");
			$("#referalDate").html("<strong>Problem :&emsp;</strong>"+date);
			$("#referalProblem").html("<strong>Problem :&emsp;</strong>"+prob);
		}
		else
			alert("Enter the problem to refer");
	});
})