const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const axios=require('axios');

const app=express();
app.set('view engine','ejs');
app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.json());

app.listen(3000, function(err)
{
    if(err)
    {
        console.log(err);
    }
    console.log('running on 3000');
})

app.get('/', function(request, response)
{
    console.log("here");
    response.render('compiler');
})

app.get('/getdata', function(request, response)
{
response.send("ok");
})

app.post('/runcode', function(request, response)
{
    var code=request.body.text;
    var language=request.body.language;
    console.log(language);
    var request = require('request');
    var program = {
        script : code,
        language: language,
        versionIndex: "0",
        clientId: "ead2eb2a4f04dba40e01e80b1ca7c394",
        clientSecret:"c9717166418f41c9afd29924d4265f0c64f81e3d4972a19794ef6caf3c410a96"
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, res, body) {
        console.log('error:', error);
        console.log('statusCode:', res && res.statusCode);
        console.log('body:', body);
        response.json({
            message:res.body.output
        })
    });
})

app.get('/function', function(request, response)
{
    response.send("file uploaded");
})