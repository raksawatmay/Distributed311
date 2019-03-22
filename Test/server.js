// var net = require ('net')
var express = require ('express')
// var HOST = '127.0.0.1'
var PORT = 8000
var app = express()

app.set('client','js')
app.get('/test', (req,res) => {
    res.send('<html><h1 style="align:center;">${greetText}</h1></body></html>')
})

// net.createServer( (sock) => {
//     console.log(''+ sock.remoteAddress + ':' + sock.remotePort)
//     sock.write('OK')

//     sock.on ('data', (data) => {
//         console.log(''+data)
//         if ( data == 'Hello') {
//             sock.write('Hello Client')
//         }
//         else {
//             sock.write('Input Under')
//         }
//     })
    
//     sock.on ('close', (data) => {
//         console.log('Closed Server');
//     })

// }).listen (PORT,HOST);
app.listen(8000);
console.log('Connected: http://localhost'+':' + PORT+'/test');