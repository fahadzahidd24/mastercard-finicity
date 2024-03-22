console.log("hello");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());



app.post('/token', (req, res) => {
    const { partnerId, partnerSecret, appKey } = req.body;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Finicity-App-Key", appKey);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "incap_ses_1406_2596171=bsjpb1qmayK59OPwRySDE/5MFGUAAAAA78gNmgPe0wc7+mTLJxKWSw==; incap_ses_1460_2596171=N3WyKUUDM1d+4LQT9/ZCFA0/FGUAAAAA8gqymDmc1Mizu7wAYmgtTA==; incap_ses_959_2596171=l1PyCN7I0Qt50w0vdw5PDd9MFGUAAAAACKewQH+9ZqiQj8d/LzZVzg==; nlbi_2596171=g30eHiSoFFPeRVV6pbFNgwAAAADTZK3ss4Evpmsog+w59nI6; visid_incap_2596171=l0QFd/2ASxS+JHGbIBLkUhsj3mQAAAAAQUIPAAAAAADxP1sQ50e25gIe7z/5ZLbg");

    var raw = JSON.stringify({
        "partnerId": partnerId,
        "partnerSecret": partnerSecret
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.finicity.com/aggregation/v2/partners/authentication", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).json({ error: error }));

});




app.post('/customer', (req, res) => {
    const { appKey, token, firstName, lastName } = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Finicity-App-Token", token);
    myHeaders.append("Finicity-App-Key", appKey);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "incap_ses_1321_2596171=uLs8JdFslG0tbwTgoyhVEhp5HWUAAAAAUhp877fqTt/tN0hEaRPT7Q==; incap_ses_1559_2596171=vRLWQ1lj2kf7GIjGtq6iFW54HWUAAAAASZsTZPKMwDP3To9c4M9ptA==; nlbi_2596171=bNgxY4WsLzexsiBzpbFNgwAAAACvW4hRdsvD9xo15dQy+Iwf; visid_incap_2596171=l0QFd/2ASxS+JHGbIBLkUhsj3mQAAAAAQUIPAAAAAADxP1sQ50e25gIe7z/5ZLbg");

    const currentDate = new Date();
    const seed = currentDate.getDate(); // Use the day of the month as a seed
    const random = Math.floor(Math.random() * seed * 100); // Adjust as needed
    const username = 'customer_' + random + 'c';


    var raw = JSON.stringify({
        "username": username,
        "firstName": firstName,
        "lastName": lastName
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.finicity.com/aggregation/v2/customers/active", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).json({ error: error }));

})


app.post('/generate', (req, res) => {
    const { appKey, token, partnerId, customerId } = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Finicity-App-Token", token);
    myHeaders.append("Finicity-App-Key", appKey);
    myHeaders.append("Cookie", "incap_ses_1406_2596171=bsjpb1qmayK59OPwRySDE/5MFGUAAAAA78gNmgPe0wc7+mTLJxKWSw==; incap_ses_1460_2596171=N3WyKUUDM1d+4LQT9/ZCFA0/FGUAAAAA8gqymDmc1Mizu7wAYmgtTA==; incap_ses_959_2596171=TH/EDpo1GUWq9Ccvdw5PDV5gFGUAAAAAG5VEjRPv56bFjQnnMkQDHA==; nlbi_2596171=g30eHiSoFFPeRVV6pbFNgwAAAADTZK3ss4Evpmsog+w59nI6; visid_incap_2596171=l0QFd/2ASxS+JHGbIBLkUhsj3mQAAAAAQUIPAAAAAADxP1sQ50e25gIe7z/5ZLbg");

    var raw = JSON.stringify({
        "partnerId": partnerId,
        "customerId": customerId,
        "language": "en",
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.finicity.com/connect/v2/generate", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).json({ error: error }));
})


app.post('/refresh', (req, res) => {
    const { appKey, token, customerId } = req.body;
    // res.status(200).send({appKey, token, customerId});
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Finicity-App-Token", token);
    myHeaders.append("Finicity-App-Key", appKey);
    myHeaders.append("Cookie", "visid_incap_2596171=l0QFd/2ASxS+JHGbIBLkUhsj3mQAAAAAQUIPAAAAAADxP1sQ50e25gIe7z/5ZLbg");

    var raw = JSON.stringify({});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://api.finicity.com/aggregation/v2/customers/${customerId}/accounts`, requestOptions)
        // .then(response => res.send("refreshed >>>"))
        .then(result => res.send({ message: "refreshed >>>" }))
        .catch(error => res.status(400).json({ error: error }));
})



app.post('/accounts', (req, res) => {
    const { appKey, token, customerId } = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Finicity-App-Key", appKey);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Finicity-App-Token", token);
    myHeaders.append("Cookie", "visid_incap_2596171=l0QFd/2ASxS+JHGbIBLkUhsj3mQAAAAAQUIPAAAAAADxP1sQ50e25gIe7z/5ZLbg");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.finicity.com/aggregation/v1/customers/${customerId}/accounts`, requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).json({ error: error }));;
})







// app.post('/refreshAccounts', (req, res) => {
//     console.log('refreshAccounts');  
//     const { customerId, token, appKey } = req.body;
//     console.log("customerId", customerId);
//     console.log("token", token);
//     console.log("appKey", appKey);
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Finicity-App-Token", token);
//     myHeaders.append("Finicity-App-Key", appKey);

//     var raw = JSON.stringify({});

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };



//     fetch(`https://api.finicity.com/aggregation/v1/customers/${customerId}/accounts`, requestOptions)
//         .then(response => response.json())
//         .then(result => res.status(200).json({
//             data: result
//         }))
//         .catch(error => {
//             console.log('error', error);
//             return res.status(400).json({
//                 error: error
//             });
//         });
// })


// app.get('/', (req, resp) => {
//     let token, customerId;
//     const {partnerId,partnerSecret,appKey} = req.body;

//     // const partnerId = "2445584268593";
//     // const partnerSecret = "TzXYj9bovRytqzgJ7beC";
//     // const appKey = "4aea3531faad7238d5e2192d4cf33486";
//     fetch("https://api.finicity.com/aggregation/v2/partners/authentication", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Finicity-App-Key": appKey,
//             "Accept": "application/json",
//         },
//         body: JSON.stringify({
//             "partnerId": partnerId,
//             "partnerSecret": partnerSecret
//         })
//     }).then(res => {
//         return res.json();
//     }).then(async res2 => {
//         console.log("res2", res2);
//         token = res2.token;
//         return fetch("https://api.finicity.com/aggregation/v2/customers/testing", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "Finicity-App-Key": appKey,
//                 "Finicity-App-Token": res2.token,
//             },
//             body: JSON.stringify({
//                 "username": `customer_${Date.now() + Math.floor(Math.random() * 1000)}`,
//                 "firstName": "John",
//                 "lastName": "Smith",
//             })
//         }).then(res3 => {
//             console.log(res3);
//             return res3.json();
//         }).then(async res4 => {
//             console.log("res4 ==>", res4);
//             customerId = res4.id;
//             return fetch("https://api.finicity.com/connect/v2/generate", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                     "Finicity-App-Key": appKey,
//                     "Finicity-App-Token": res2.token
//                 },
//                 body: JSON.stringify({
//                     "partnerId": partnerId,
//                     "customerId": res4.id,
//                 })
//             }).then(res5 => {
//                 return res5.json();
//             }).then(async res6 => {
//                 console.log(res6);
//                 return resp.status(200).json({
//                     link: res6.link,
//                     customerId: customerId,
//                     token: token,
//                     appKey: appKey
//                 })

//             }).catch(err => {
//                 console.log("error:", err)
//             })
//         }).catch(err => {
//             console.log("error:", err)
//         })
//     }).catch(err => {
//         console.log("error:", err)
//     })

// });



app.listen(3000, () => console.log('Server listening at http://localhost:3000'));
