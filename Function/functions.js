exports = square = (x) => {console.log ('Square Area: '+ x*x)}

exports = yearA = (y) => {
    if (y >= 2000) 
    {
        console.log('Children')
    }
    else if (y >= 1980) 
    {
        console.log('Young')
    }
    else if (y >= 0)
    {
        console.log('Old')
    }
    else
    {
        console.log('Input Number Only!!')
    }
}

var ticket = 500
var ans1 = 'Yes'
var ans2 = 'No'
exports = discount = (ans) => {
    if (ans.toUpperCase() == ans1.toUpperCase())
    {
        console.log('Result: '+ (ticket-(ticket*0.1)))
    }
    else if (ans.toUpperCase() == ans2.toUpperCase())
    {
        console.log('Result: '+ ticket)
    }
    else 
    {
        console.log('Error!! Input Yes or No Only!!!')
    }
}

