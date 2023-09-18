console.log("hello");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());



app.get('/', (req, resp) => {
let token,customerId;
fetch("https://api.finicity.com/aggregation/v2/partners/authentication", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Finicity-App-Key": "64fbfd97b243ce354d5211e2283b340d",
        "Accept": "application/json",
    },
    body: JSON.stringify({
        "partnerId": "2445584284357",
        "partnerSecret": "wNB8rKJWoL7TkkbtUdqA"
    })
}).then(res => {
    return res.json();
}).then(async res2 => {
    console.log("res2", res2);
    token = res2.token;
    return fetch("https://api.finicity.com/aggregation/v2/customers/testing", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Finicity-App-Key": "64fbfd97b243ce354d5211e2283b340d",
            "Finicity-App-Token": res2.token,
        },
        body: JSON.stringify({
            "username": `johnnn${Math.random() * 100000}ssddaaqq`,
            "firstName": "John",
            "lastName": "Doe",
        })
    }).then(res3 => {
        console.log(res3);
        return res3.json();
    }).then(async res4 => {
        console.log("res4 ==>", res4);
        customerId = res4.id;
        return fetch("https://api.finicity.com/connect/v2/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Finicity-App-Key": "64fbfd97b243ce354d5211e2283b340d",
                "Finicity-App-Token": res2.token
            },
            body: JSON.stringify({
                "partnerId": "2445584284357",
                "customerId": res4.id,
            })
        }).then(res5 => {
            return res5.json();
        }).then(async res6 => {
            console.log(res6);
            return resp.status(200).json({
                link : res6.link,
                customerId : customerId,
                token : token,
                appKey: "64fbfd97b243ce354d5211e2283b340d"
            })
            
        }).catch(err => {
            console.log("error:", err)
        })
    }).catch(err => {
        console.log("error:", err)
    })
}).catch(err => {
    console.log("error:", err)
})

});


app.listen(3000, () => console.log('Server listening at http://localhost:3000'));
