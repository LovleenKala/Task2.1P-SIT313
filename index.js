const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = '8ac90bddfb9baae9ed65ed6b700ebbf4-ee16bf1a-cfab9658'; 
const domain = 'sandbox8553bc26b60044b6a7ac6b552bf8e3f3.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: 'Lovleen <lovleen4808.be22@chitkara.edu.in>',
        to: email,
        subject: 'Hii, test',
        text: 'Testing',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});


app.listen(8000, () => {
    console.log("The Server is running at 8000");
});