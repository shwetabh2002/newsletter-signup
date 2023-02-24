const express= require("express");
const request= require("request");
const app= express();
const https= require("https");
const bodyparser= require("body-parser");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
     
    const firstname= req.body.fname;
    const lastname= req.body.lname;
    const email= req.body.email;
    const data= {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jsondata= JSON.stringify(data);
    const url= "https://us21.api.mailchimp.com/3.0/lists/code";
    const Option= {
        method: "POST",
        auth: "shwetabh1:auth"
    }
    const request= https.request(url,Option,function(response){
        
           if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
           }
           else{
            res.sendFile(__dirname+"/failure.html");
           }

           response.on("data",function(data){
            console.log(JSON.parse(data));
           })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port 3000");
});


// apikey- addff6190b6310984a325ef574662d67-us21
// audience id - 6fe8e8136b
