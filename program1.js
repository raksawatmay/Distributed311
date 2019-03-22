// Calculate Area Square
require ('./Function/functions.js')

let area = process.openStdin()
    area.addListener('data', (d) => {
        square(d)
});