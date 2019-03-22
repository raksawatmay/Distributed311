var express = require('express')
var app = express()

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/image'));
app.get('/test', function(req, res){
   res.render('test', {system: [{title:'Windows',img:'win.jpg'}, {title:'OSX', img:'osx.jpg'}, {title:'Andriod', img:'and.jpg'}, {title:'iOS', img:'ios.jpeg'}]})
})
app.listen(8000)
console.log('Connecting.... http://localhost:8000/test')