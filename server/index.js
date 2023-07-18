const express= require('express')
const PORT =5000
const app = express()
const cors= require('cors')
const file = require('./words.json')
const words=file.wordList
console.log(file.wordList)
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 })
app.get('/api/words',(req, res) => {
    res.json(words)
})
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})