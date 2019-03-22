var net = require('net')
var HOST = '127.0.0.1'
var PORT = 6969

var client = new net.Socket ()
    client.connect(PORT, HOST, () => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT)
    client.write('I am Theerayut Charoensuksomboon')
});

    client.on('data', (data) => {
    console.log('DATA: ' + data)
    
    if (data == 'Bingo')
    {
        client.destroy()
    }
    
    else if (data == 'END') 
    {
        client.destroy()
    }
        
    else if (data == 'OK')
    {
            let stdin = process.openStdin()
            stdin.addListener('data', (num) => {
            client.write(' '+ num)
        })
    }
});

    client.on('close', () => {
    console.log('Connection closed')
});
