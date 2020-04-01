const express = require('express');
const jwt = require('jsonwebtoken');
const cookieparser= require('cookie-parser');
const Vaccine= require('./schema/vaccinelist.js');
const childmdm = require('./schema/childmdmschema.js');
const mdm_given_no = require('./schema/mdmschema.js');
const adminlist = require('./schema/adminlistSchema.js');
const User =require('./schema/userlist');
const Worker= require('./schema/signup');
const router = express.Router();
router.use(express.static("public"));
router.use(express.json({limit:'10kb'}));
router.use(cookieparser());


const verify = function(req,res,next)
{
    if(!req.cookies.jwt)
  {res.redirect("/login");}
  const decoded = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai');
    next();
}
  
 const dashboard = function (req,res){
   const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
   Worker.findOne({adharno:id},function(err,result){
    if(err) throw err;
    else
    {
      res.render("dashboard",{result:result});
    }
   })
    
}

const createuser = function (req,res){
    res.render("add_user.ejs");
 }
 

const adduser = function (req,res){
    res.render("add_user");
}

const newUser=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  console.log(id);
  const obj=req.body;
  const date=new Date();
  adminlist.findOne({adharno:id},function(err,result){
    if(err)
      throw err;
    else
    {
    const newUser=new User({
      name:obj.name,
      adharno:obj.adharno,
      uuid:obj.uuid,
      gname:obj.gname,
      mname:obj.mname,
      gender:obj.gender,
      phoneno:obj.phoneno,
      acode:result.acode,
      dob:obj.dob,
      age:obj.age,
      address:obj.address,
      category:obj.category,
      caste:obj.caste,
      religion:obj.religion,
      mstatus:obj.mstatus,
      fstatus:obj.fstatus,
      phystatus:obj.phystatus,
      pstatus:obj.pstatus,
      lat:obj.lat,
      long:obj.long,
      uvac:[{vname:"String",date:date,vcode:"String",dose:"String",route:"String",site:"String"}],
      pvac:[{vname:"String",date:date,vcode:"String",dose:"String",route:"String",site:"String"}],
      record:[{problem:"String",date:"String",supplement:"String",duration:"String",dose:"String"}]
    });
    newUser.save();
    Worker.findOneAndUpdate({adharno:id},{$inc:{usernum:1}},function(err2,result2){
      if(err2) throw err2;
      else
      res.redirect("/dashboard");
    });
    }
  });
  };


const vaccinelist =function(req,res){
  Vaccine.find({},function(err,result){
   if(err) throw err;
   else
   {
      res.render("vaccinelist.ejs",{result:result});
  }
  });
}

const manage_user =function(req,res){
  res.render("manage_user.ejs");
}

const mdmgiven=function(req,res){
  const obj = req.body;
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  const today=new Date();
  const d=(today.getDate()).toString();
  const m=(today.getMonth()+1).toString();
  const y=(today.getFullYear()).toString();
  const date=d+"/"+m+"/"+y;
  adminlist.find({adharno:id},function(err,result){
    if(err)
    throw err;
  else
  {
      const mdm_update = new mdm_given_no({
      number:obj.number,
      date:date,
      acode:result[0].acode  
      })
      mdm_update.save();
      res.redirect("/dashboard/nutrition");
  }
  })
}

const addmdmchild = function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;

  const uuid=req.body.uuid;
  
  User.findOne({uuid:uuid},function(err,result){
    if(err)
    throw err;
  else
  {   
      const newchildmdm = new childmdm({
      name:result.name,
      uuid:uuid,
      acode:result.acode  
      })
      newchildmdm.save();
      res.redirect("/dashboard/nutrition");
  }
  })
}

const checkup =function(req,res){
  res.render("checkup.ejs");
}

const nutrition =function(req,res){
  res.render("nutrition.ejs");
}

const addVaccine =function(req,res){
  const obj=req.body;
  Vaccine.find({for:obj.for},function(err,result){
    if(err)
      throw err;
    else
    {
      const newVaccine=new Vaccine({
        vcode:obj.vcode,
        name:obj.name,
        for:obj.for,
        when:obj.when,
        dose:obj.dose,
        site:obj.site,
        route:obj.route
        });
      newVaccine.save();
      res.redirect("/dashboard/vaccinelist");
    }
  })
}
const checkAddUser=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err1,result1){
    if(err1) throw err1;
    else
    {
      if(result1)
        childmdm.findOne({uuid:uuid},function(err,result){
          if(err) throw err;
          else
          {
            if(result)
              res.send("already");
            else 
            {
              if(result1.category==="child")
              {
                if(result1.acode)
                res.send("not already");
              }
              else
                res.send("cant register");
            }
          }
        });
      else
        res.send("no such user");
    }
});
}
const removechild =function(req,res){
  const uuid=req.body.uuid;
  childmdm.deleteOne({uuid:uuid},function(err,result){
    if(err)
    throw err;
  else
  {   //console.log(result)
      res.redirect("/dashboard/nutrition");
  }
  })

}
const checkRemoveUser=function(req,res){
  const uuid=req.body.uuid;
  childmdm.findOne({uuid:uuid},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
        {
          res.send(result.name);
        }
      else
        res.send("not already");
    }
  });
}

const mdmGraph=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  console.log(id);
  adminlist.findOne({adharno:id},function(err,result){
    if(err)
      throw err;
    else
    {
      if(result)
      {
        const acode=result.acode;
        mdm_given_no.find({acode:acode},function(err1,result1){
          if(err1) throw err1;
          else
          {
            if(result1.length!=0)
            {
              const date=result1.map(function(item){
                return item.date;
              });
              const number=result1.map(function(item){
                return item.number;
              });
              const obj={date:date,number:number};
              res.send(JSON.stringify(obj));
            }
            else
              res.send("nodata");
          }
        });
      }
    }
  });
}
function todayDate(){
  const today=new Date();
  const d=(today.getDate()).toString();
  const m=(today.getMonth()+1).toString();
  const y=(today.getFullYear()).toString();
  const date=d+"/"+m+"/"+y;
  return date;
}
const mdmStatus=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  console.log(id);
  adminlist.findOne({adharno:id},function(err,result){
    if(err)
      throw err;
    else
    {
      if(result)
      {
        const acode=result.acode;
        const date=todayDate();
        mdm_given_no.find({acode:acode},function(err1,result1){
          if(err1) throw err1;
          else
          {
              if(result1)
              {
                var k=0;
                result1.forEach(function(item){
                  if(item.date==date)
                  {
                    const obj1={date:date,number:item.number};
                    res.send(JSON.stringify(obj1));
                    k=1;
                  }
                });
                if(k==0)
                  res.send("nodata");

              }
              else
                res.send("nodata");
          }
        });
      }
    }
  });
}
const userVaccines=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
      {
        const uvac=result.uvac;
        const pvac=result.pvac;
        res.render("vaccinelistUser.ejs",{result:result});
      }
    }
  });

}
const addUserVaccine=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  const obj=req.body;
  Vaccine.findOne({vcode:obj.vcode},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
      {
        const vac={vcode:obj.vcode,date:obj.date,vname:result.name,dose:result.dose,route:result.route,site:result.site};
        User.findOneAndUpdate({uuid:obj.uuid},{$push:{uvac:vac}},{new:true},function(err1,result1){
           if(err1) throw err1;
            else
            {
              if(result1)
              {
                console.log(result1);
                const f={date:obj.date,vcode:obj.vcode,name:result1.name,uuid:result1.uuid,phoneno:result1.phoneno};
                Worker.findOneAndUpdate({adharno:id},{$push:{feed:f}},{new:true},function(err2,result2){
                  if(err2) throw err2;
                  else
                  {
                    res.render("vaccinelistUser.ejs",{result:result1});
                  } 
                });
                 
              }
            }
         });
      }
      else
        {
          const uuid=req.body.uuid;
          User.findOne({uuid:uuid},function(err,result){
            if(err) throw err;
            else
            {
              if(result)
              {
                const uvac=result.uvac;
                const pvac=result.pvac;
                res.render("vaccinelistUser.ejs",{result:result});
              }
              else
                res.render("vaccinelist.ejs");
            }
          });
        }
      }
  });
}
const doneUpcomingUserVaccine=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  const obj=req.body;
  const today=new Date();
  const d=new Date(obj.date);
  console.log(d);
  Vaccine.findOne({vcode:obj.vcode},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
      {
         const vac={vcode:obj.vcode,date:d,vname:result.name,dose:result.dose,route:result.route,site:result.site};
         User.findOneAndUpdate({uuid:obj.uuid},{$pull:{uvac:vac}},{new:true},function(err1,result1){
           if(err1) throw err1;
            else
            {
              if(result1)
              {
                const vac1={vcode:obj.vcode,date:today,vname:result.name,dose:result.dose,route:result.route,site:result.site};
                User.findOneAndUpdate({uuid:obj.uuid},{$push:{pvac:vac1}},{new:true},function(err2,result2){
                if(err2) throw err2;
                else
                {
                  if(result2)
                  {

                      
                      Worker.findOneAndUpdate({adharno:id},{$inc:{vacnum:1}},{new:true},function(err4,result4){
                      if(err4) throw err4;
                      else{
                        const f={vcode:obj.vcode,date:d,uuid:result2.uuid,phoneno:result2.phoneno,name:result2.name};
                         Worker.findOneAndUpdate({adharno:id},{$pull:{feed:f}},{new:true},function(err6,result6){
                          if(err6) throw err6;
                          else
                          {
                            res.render("vaccinelistUser.ejs",{result:result2});
                          } 
                        });
                      }
                       
                    });
                  }
                  else console.log("nahi ho rha ");
                }
                
              });
                
              }
              else
                console.log("nahi ho rha 1");
            }
         });
      }
      else
        console.log("nahi ho rha 0");
    }
  });
}
const simplyCheckUser=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err,result){
    if(err) throw err;
    else
    {console.log(result);
      if(result)
        res.send("userexists");
      else
        res.send("nouser");
    }
  });
}
const userCheckUp=function(req,res){
  User.findOne({uuid:req.body.uuid},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
        res.render("userCheckup",{result:result});
    }
  })
  
}
const newRecord=function(req,res){
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  const obj=req.body;const date=todayDate();
  const record={problem:obj.problem,date:date,supplement:obj.supplement,dose:obj.dose,duration:obj.duration}
  User.findOneAndUpdate({uuid:req.body.uuid},{$push:{record:record}},{new:true},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
      {
        Worker.findOneAndUpdate({adharno:id},{$inc:{checknum:1}},function(err4,result4){
        if(err4) throw err4;
        else
        res.render("userCheckup",{result:result});
        });
      }
    }
  });
}
const addUserGrowth=function(req,res){
  const obj=req.body;
        const vac={height:obj.height,weight:obj.weight,date:todayDate()};
        User.findOneAndUpdate({uuid:obj.uuid},{$push:{growth:vac}},{new:true},function(err1,result1){
           if(err1) throw err1;
            else
            {
              if(result1)
              {
                console.log(result1);
                res.render("userChildMonitoring",{result:result1}); 
              }
            }
         });
}
const userChildMonitoring=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err,result){
    if(err) throw err;
    else
    {
      if(result)
      {
        res.render("userChildMonitoring",{result:result});
      }
      else
        res.redirect("/dashboard/childMonitoring");
    }
  });

}
const heightChildGraph=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err,result){
    if(err)
      throw err;
    else
    {
      if(result)
      {
        const growth=result.growth;
        const date=growth.map(function(item){
                return item.date;});
        const height=growth.map(function(item){
                return item.height;});
        const obj={date:date,height:height};
        res.send(JSON.stringify(obj));    
      }
      else
        res.send("nodata");
    }
  });
}
const weightChildGraph=function(req,res){
  const uuid=req.body.uuid;
  User.findOne({uuid:uuid},function(err,result){
    if(err)
      throw err;
    else
    {
      if(result)
      {
        const growth=result.growth;
        const date=growth.map(function(item){
                return item.date;});
        const weight=growth.map(function(item){
                return item.weight;});
        const obj={date:date,weight:weight};
        res.send(JSON.stringify(obj));    
      }
      else
        res.send("nodata");
    }
  });
}
const childMonitoring=function(req,res){
  res.render("childMonitoring");
}

const remove_user = function(req,res){ 
   const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  
   adminlist.findOne({adharno:id},function(err,result){const areacode=result.acode;
    const uuid=req.body.uuid;
    User.findOne({uuid:uuid},function(err,result1){
    if(!result1){return res.send('notfound');}
     if(err) throw err;
     else if(areacode===result1.acode) {
      User.deleteOne({uuid:uuid},function(err,result2){
                   if(err)throw err;
                   else{
                    Worker.findOneAndUpdate({adharno:id},{$inc:{usernum:-1}},function(err2,result2){
                    if(err2) throw err2;
                    else
                      res.send('deleted');
                    });
                       

                   }
      })

     }
     else{res.send('notregistered')}
    });
  
  });
   
}

const get_user = function(req,res){ 
  const id = (jwt.verify)(req.cookies.jwt,'manpreet-bag-pack-karo-teen-ghante-baad-flight-hai').id;
  
  adminlist.findOne({adharno:id},function(err,result){const areacode=result.acode;
   const uuid=req.body.uuid2;
   User.findOne({uuid:uuid},function(err,result1){
   if(!result1){return res.send('notfound');}
    if(err) throw err;
    else if(areacode===result1.acode) {
     res.send(result1);
    }
    else{res.send('notregistered')}
   });
 });
  
}

// const sms1=function(req,res)
// {
//   const num="+91"+req.body.num;
//   console.log(num);
//   const accountSid = 'AC76fa0ddbbe6eb660cd27676a10a02a3b';
//   const authToken = '21e4829d71b6d3512b69b7e8884023e3';
//   const client = require('twilio')(accountSid, authToken);

//   client.messages
//     .create({
//        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//        from: '+12055510538',
//        to: '+918'
//      })
//     .then(message => console.log(message.sid));
//     res.send("done");
//   }
//   const sendSms=function(req,res)
// {
//   sms();
//   res.end("done");}

router
  .route('/')
  .get(verify,dashboard);


router
  .route('/adduser/newUser')
  .post(verify,newUser)

  router
  .route('/adduser')
  .get(verify,adduser)
  .post(verify,createuser);

router
  .route('/vaccinelist')
  .get(verify,vaccinelist)

router
  .route('/manageuser')
  .get(verify,manage_user)

router
  .route('/nutrition')
  .get(verify,nutrition)

router
    .route('/nutrition/mdm-given')
    .post(verify,mdmgiven)

router
  .route('/checkup')
  .get(verify,checkup)
router
  .route('/vaccinelist/addVaccine')
  .post(verify,addVaccine)

router
   .route('/nutrition/addChild')
   .post(verify,addmdmchild)
router
   .route('/nutrition/checkUser')
   .post(verify,checkAddUser)
router
   .route('/nutrition/removeChild')
   .post(verify,removechild)
router
  .route("/nutrition/removeCheckUser")
  .post(verify,checkRemoveUser)
router
  .route("/nutrition/mdmGraph")
  .get(verify,mdmGraph)
router
  .route("/nutrition/mdmStatus")
  .get(verify,mdmStatus)
router
  .route("/userVaccines")
  .post(verify,userVaccines)
router
  .route("/addUserVaccine")
  .post(verify,addUserVaccine)
router
  .route("/doneUpcomingUserVaccine")
  .post(verify,doneUpcomingUserVaccine)
router
  .route("/simplyCheckUser")
  .post(verify,simplyCheckUser) 
router
  .route("/userCheckUp")
  .post(verify,userCheckUp) 
router
  .route("/newRecord")
  .post(verify,newRecord)
router
  .route("/childMonitoring")
  .get(verify,childMonitoring)
router
  .route("/userChildMonitoring")
  .post(verify,userChildMonitoring)
router
  .route("/monitor/heightChildGraph")
  .post(verify,heightChildGraph)
router
  .route("/monitor/weightChildGraph")
  .post(verify,weightChildGraph)  
router
  .route("/addUserGrowth")
  .post(verify,addUserGrowth)
router
  .route("/manage-user/remove-user")
  .post(verify,remove_user)
router
  .route("/manage-user/get-user")
  .post(verify,get_user)
// router
//   .route("/sms")
//   .get(verify,sendSms);
 // router
 //  .route("/forSendingSms")
 //  .post(verify,sms1);

  module.exports= router;