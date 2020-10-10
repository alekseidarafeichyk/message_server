
const express = require('express');
const app = express();

const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3010;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let smpt_login = process.env.SMTP_LOGIN;
let smpt_password = process.env.SMTP_PASSWORD;


let transporter = nodemailer.createTransport({
    service: 'gmail',//smtp.gmail.com  //in place of service use host...
    auth: {
        user: smpt_login,
        pass: smpt_password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.post('/sendMessage', async (req, res) => {

    let {name,email,number,message} = req.body

    let info = await transporter.sendMail({
        from: 'Alex', // sender address
        to: 'alekseidarafeichyk@gmail.com', // list of receivers
        subject: "Portfolio message", // Subject line
        html: `<b>Portfolio page </b>
    <div>Name : ${name}</div>
    <div>Email : ${email}</div>
    <div>Number : ${number}</div>
    <div>Message : ${message}</div>
`, // html body
    });
    res.send('ok!')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
