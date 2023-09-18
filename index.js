console.log("hello");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


app.post('/refreshAccounts', (req, res) => {
    console.log('refreshAccounts');  
    const { customerId, token, appKey } = req.body;
    console.log("customerId", customerId);
    console.log("token", token);
    console.log("appKey", appKey);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Finicity-App-Token", token);
    myHeaders.append("Finicity-App-Key", appKey);

    var raw = JSON.stringify({});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };



    fetch(`https://api.finicity.com/aggregation/v1/customers/${customerId}/accounts`, requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json({
            data: result
        }))
        .catch(error => {
            console.log('error', error);
            return res.status(400).json({
                error: error
            });
        });
})


app.get('/', (req, resp) => {
    let token, customerId;
    const partnerId = "2445584268593";
    const partnerSecret = "TzXYj9bovRytqzgJ7beC";
    const appKey = "4aea3531faad7238d5e2192d4cf33486";
    fetch("https://api.finicity.com/aggregation/v2/partners/authentication", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Finicity-App-Key": appKey,
            "Accept": "application/json",
        },
        body: JSON.stringify({
            "partnerId": partnerId,
            "partnerSecret": partnerSecret
        })
    }).then(res => {
        return res.json();
    }).then(async res2 => {
        console.log("res2", res2);
        token = res2.token;
        return fetch("https://api.finicity.com/aggregation/v2/customers/active", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Finicity-App-Key": appKey,
                "Finicity-App-Token": res2.token,
            },
            body: JSON.stringify({
                "username": `customer_${Date.now() + Math.floor(Math.random() * 1000)}`,
                "firstName": "John",
                "lastName": "Smith",
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
                    "Finicity-App-Key": appKey,
                    "Finicity-App-Token": res2.token
                },
                body: JSON.stringify({
                    "partnerId": partnerId,
                    "customerId": res4.id,
                })
            }).then(res5 => {
                return res5.json();
            }).then(async res6 => {
                console.log(res6);
                return resp.status(200).json({
                    link: res6.link,
                    customerId: customerId,
                    token: token,
                    appKey: appKey
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
