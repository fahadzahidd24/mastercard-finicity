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
    fetch("https://api.finicity.com/aggregation/v2/partners/authentication", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Finicity-App-Key": "1eeb64fc1a278bc6568f48aae3ac7304",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            "partnerId": "2445584263170",
            "partnerSecret": "LkY04f7kDkLVXAWpuhIr"
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
                "Finicity-App-Key": "1eeb64fc1a278bc6568f48aae3ac7304",
                "Finicity-App-Token": res2.token,
            },
            body: JSON.stringify({
                "username": `johnnn${Math.random() * 100000}customer`,
                "firstName": "customer",
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
                    "Finicity-App-Key": "1eeb64fc1a278bc6568f48aae3ac7304",
                    "Finicity-App-Token": res2.token
                },
                body: JSON.stringify({
                    "partnerId": "2445584263170",
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
                    appKey: "1eeb64fc1a278bc6568f48aae3ac7304"
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
