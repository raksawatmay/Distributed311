// Discount ticket if is member
require ('./Function/functions.js')

console.log('Answer : Yes or No only!!!!')
let word = process.openStdin()
word.addListener('data', (d) => {
    discount(d.toString().trim())
});
