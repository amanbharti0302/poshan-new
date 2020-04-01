$(document).ready(function(){
	$("#addvaccinebtn").click(function(event){
		event.preventDefault();
		const sno=$("#sno").val();
		const vaccine=$("#vaccine").val();
		const date=$("#date").val();
		const uuid=$("#uuid").val();
		$.post("/dashboard/vaccinelist/addUserVaccine",{uuid:uuid,sno:sno,name:vaccine,date:date},function(data,status){

		});
	})
});