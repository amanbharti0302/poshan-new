// $(document).ready(function(){
// 	$("#edithead").click(function(){
// 		$("#editform").slideToggle("slow");
// 	});
// 	$("#removeheader").click(function(){
// 		$("#removeform").slideToggle("slow");
// 	});
// })
$(document).ready(function(){
	$("#removeheader").click(function(){
		$("#removeform").slideToggle("slow");
	});

	$("#removeuser").click(function(e){
		
		var uuid= $('#uuid').val();
		if(uuid!="")
		{
		$.post("/dashboard/manage-user/remove-user/",{uuid:uuid},function(data,status){
		if(data==='notregistered'){alert('SORRY the user '+uuid+' is not registered under you');}
		if(data==='notfound'){alert('USER '+uuid+' NOT FOUND');}
		if(data==='deleted'){alert('user '+uuid+' deleted successfully');}
		e.preventDefault();
		})
	}
	e.preventDefault();
    });



$("#getheader").click(function(){
	$("#getform").slideToggle("slow");
});

$("#getuser").click(function(e){
	var uuid2= $('#uuid2').val();
	if(uuid2!="")
	{
	$.post("/dashboard/manage-user/get-user/",{uuid2:uuid2},function(data,status){
	if(data==='notregistered'){alert('SORRY the user '+uuid2+' is not registered under you');}
	else if(data==='notfound'){alert('USER '+uuid2+' NOT FOUND');}
	else
	    {   
			$('#uid').text(data.uuid);
			$('#name').text(data.name);
			$('#fname').text(data.gname);
			$('#mname').text(data.mname);
			$('#aadharcard').text(data.adharno);
			$('#dob').text(data.dob);
			$('#phno').text(data.phoneno);
			$('#acode').text(data.acode);
			$('#addr').text(data.address);
			$('#gender').text(data.gender);
			$('#category').text(data.category);
			$('#caste').text(data.caste);
			$('#religion').text(data.religion);
			$('#maritalstatus').text(data.mstatus);
			$('#finacialstatus').text(data.fstatus);
			$('#abnormality').text(data.phystatus);
			
		    const form1 = document.querySelector('#form1');
			const form2 = document.querySelector('#form2');
			const form3 = document.querySelector('#form3');
			form3.classList.add('animated','slideInUp');
			form2.classList.add('animated','fadeOut','faster');
			form1.classList.add('animated','fadeOut','faster');
			form3.style.display='block';
			form2.addEventListener('animationend',function(e){
				form2.style.display='none';
			});
			form1.addEventListener('animationend',function(e){
				form1.style.display='none';
			});
		}
	e.preventDefault();
	})
}
e.preventDefault();
});

$('#back').click(function(e){
	const form1 = document.querySelector('#form1');
	const form2 = document.querySelector('#form2');
	const form3 = document.querySelector('#form3');
	form1.classList.remove('fadeOut','faster');
	form2.classList.remove('fadeOut','faster');
	form3.classList.remove('slideInUp',);
	form1.style.display='block';
	form2.style.display='block';
	form3.style.display='none';
});


});