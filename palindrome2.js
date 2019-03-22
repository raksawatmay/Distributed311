//non case sensitive 
let wordInput = process.openStdin()
wordInput.addListener('data',(d)=> {
    var str1 = d.toString().trim()
    var str2 = ''
    for(let i = 0; i<str1.length ; i++)
    {
        str2 += str1[str1.length-i-1]
    }
        console.log(str2)
    if(str1.toUpperCase() == str2.toUpperCase())
    {
        console.log('Yes Palindrome')
    }
    else
    {
        console.log('Not Palindrome')
    }
});