//Tell the age follow christian era
require ('./Function/functions.js')

let age = process.openStdin()
    age.addListener('data', (d) => {
        yearA(d)
});