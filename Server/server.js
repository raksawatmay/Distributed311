var net = require('net')
var HOST = '127.0.0.1'
var PORT = 6969

let answer = Math.floor(Math.random() * Math.floor(10))
var count = 0

net.createServer( (sock) => {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.write('OK')
    console.log('Random: ' , answer)
   
    sock.on('data', (data) => {
        
            ++count
        if (count == 1)
        {
            console.log('DATA ' + sock.remoteAddress + ': ' + data)
        }
    
        if (data == answer && count > 1 && count < 7 )
        {
            sock.write('Bingo')
            count = 0
        }  

        if (data != answer && count > 1 && count < 7 && data != 'OK')
        {
            console.log('count',count-1)
            sock.write('Wrong')
        }
        
        if (count == 6)
        {
            sock.write('END')
            count = 0
            sock.destroy()
        }
        
});
    
    sock.on('close', (data) => {
        console.log('CLOSEED: ' + sock.remoteAddress + ' ' + sock.remotePort)
    });
 
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT)




