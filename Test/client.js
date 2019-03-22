var net = require ('net')
var HOST = '127.0.0.1'
var PORT = 5000
var client = new net.Socket()

client.connect( PORT, HOST, () => {
    console.log('Connect to: ' + HOST + ':' + PORT)
    client.write('Kuy Jook')
})

client.on('data', (data) => {
    console.log(''+data)
    if (data == 'OK') {
        var stdin = process.openStdin()
        stdin.addListener('data', (word)=> {
            client.write(''+ word.toString().trim())
        })
    }
})

client.on('close', () => {
    console.log('Close Cilent')
})