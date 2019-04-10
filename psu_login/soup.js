const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

const app = express()
const router = express.Router()
app.use(bodyParser.urlencoded({extended: false}), router)
app.use(bodyParser.json, router)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

const out = `
<html>
<body>
  <h2>PSU Passport Authentication (SOAP) </h2>
 <form action="/" method="post">
 Username: <input type="text" name="username" /> <br>
 Password: <input type="password" name="password" /> <br>
 <input type="submit" value="Submit">
</form>
</body>
</html> 
`

router.route('/')
   .get((req, res) => {
       res.send(out)
   })
   .post((req, res) => {
       soap.createClient(url, (err, client) => {
           if (err) console.error(err);
           else {
               let user = {}
               user.username = req.body.username
               user.password = req.body.password

               client.GetStaffDetails(user, function (err, response) {
                   if (err) console.error(err);
                   else {
                    //    console.log(response);
                       let code = response.GetStaffDetailsResult.string[0]
                       let name = response.GetStaffDetailsResult.string[1]
                       let sur = response.GetStaffDetailsResult.string[2]
                       let id = response.GetStaffDetailsResult.string[3]
                       console.log("Name: "+ name + sur +"\n"+ "Code: " + code +"\n"+ "ID: " + id);
                       res.render('page', {system: [{title:"Name: "+ name + " "+ sur },{code:"Code: " + code},{id:"ID: " + id}]})
                   }
               });
           }
       });
   })

app.listen(80, () => console.log('Server is ready! http://localhost:80'))