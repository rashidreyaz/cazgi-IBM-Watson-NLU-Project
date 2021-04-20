const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

function getNLUInstance(){
    let api_key=process.env.API_KEY;
    let api_url=process.env.API_URL;

    const NaturalLanguangeUnderstandingV1=require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('inm-watson/auth');

    const NaturalLanguangeUnderstanding= new NaturalLanguangeUnderstandingV1({
        version:'2021-04-19',
        authenticator: new IamAuthenticator({
            apikey=api_key,
        }),
        serviceUrl= api_url,
    });
    return NaturalLanguangeUnderstanding;
}

