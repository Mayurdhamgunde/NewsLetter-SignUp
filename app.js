const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    const FirstName = req.body.fname;
    const LastName = req.body.lname;
    const Email = req.body.ename;

    var data = {
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields: {
                    FNAME:FirstName,
                    LNAME:LastName
                }
            }
        ]
    }
        const jsonData = JSON.stringify(data);

        const url = "https://us11.api.mailchimp.com/3.0/lists/c6e6bd6a69"

        const options = {
            method:"POST",
            auth:"mayur:0c3f5e315c82e7544c47c720a219fa79-us11"
        }

       const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
        })

        request.write(jsonData);
        request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
});

//Api key
//0c3f5e315c82e7544c47c720a219fa79-us11

//List Id
//c6e6bd6a69         