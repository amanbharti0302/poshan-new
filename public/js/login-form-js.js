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
          $("#pas").text("Submit");
          $("#pas").attr("type","submit");
          $("#pasw").text("!");
          $("#for_back").show();
          $("#for_back").text("Go back");
          $("#for_back").attr("href","/login");
          $("#create_acc").hide();
        }
        else
          alert("Phone Number not Registered");});
        e.preventDefault();
      }
      else
        alert("Enter a valid Phone Number");
      });
    $("#pas").click(function(e){
      var num=$("#num").val();
      console.log("password clicked");
      if($("#pasw").text()==="@"){
      if(num!="" && num.length==10)
      {
        var flag=0;
        $.post("/checkPhoneLogin",{number:num},function(data,status){
          console.log(data);
          if(data==="Registered")
            flag=1;
          else
            flag=0;
        if(flag==1){
        $("#temporary").css("display","inline");
        $("#temporary").attr("type","password");
        $("#temporary").attr("placeholder","Enter Password");
        $("#otp").hide();
        $(".form").attr("action","/loginUsingPassword");
        $("#pas").text("Submit");
        $("#pas").attr("type","submit");
        $("#for_back").show();
        $("#for_back").text("Go back");
        $("#for_back").attr("href","/login");
        $("#create_acc").text("Forgot Password");
        $("#create_acc").attr("href","/forgotpass");
        $("#pasw").text("#");}
        else
          alert("Phone Number not Registered");});
        e.preventDefault();
      }
      else
        alert("Enter a valid Phone Number");
    }
    });
});