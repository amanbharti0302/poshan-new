$(document).ready(function(){
	$(".oof").click(function(e){
		var k=String(e.currentTarget.id);
		console.log(k);
		
		console.log("hehe");
		$.post("/upsmsSend",{num:k,},function(data,status){
			console.log(data);
			alert("Message is sent");
		});
	});
	$(".kof").click(function(e){
		var k=String(e.currentTarget.id);
		console.log(k);
		console.log("ohho");
		$.post("/presmsSend",{num:k},function(data,status){
			console.log(data);
			alert("Message is sent");
		});
	});

})
