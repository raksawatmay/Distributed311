var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },resave : false, saveUninitialized: false }))

app.get('/', (req,res) => {
    if (req.session.user == '5935512044' && req.session.password == '2044') { 
        res.render('logout', {system: [{title:'Hello ' + '"' + req.session.user + '"'}]})
    }
    else {   
        res.render('login', {systems:''})
    }
})

app.post('/admin', urlencodedParser, (req,res) => {
    req.session.user = req.body.user
    req.session.password = req.body.password

    if (req.session.user == '5935512044' && req.session.password == '2044') {
        res.render('logout', {system: [{title:'Hello ' + '"' + req.session.user + '"'}]})
    }
    else if (req.session.user == '5935512044' && req.session.password != '2044') {
        res.render('login', {systems:'รหัสผ่านไม่ถูกต้อง!!!'})
    }
    else if (req.session.user == '') {
        res.render('admin')
    }
    else {
        res.render('login', {systems:'ไม่พบข้อมูลบัญชีนี้ กรุณากรอกใหม่'})
    } 
})

app.get('/admin', urlencodedParser, (req,res) => {
    if (req.session.user == '5935512044' && req.session.password == '2044') {
        res.render('logout', {system: [{title:'Hello ' + '"' + req.session.user + '"'}]})
    }
    else {
        res.render('admin')
    } 
})

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('destroy session');
            res.redirect('/');
        }
    });
});

app.listen(8000,() => {
    console.log('localhost: http://localhost:8000')
})