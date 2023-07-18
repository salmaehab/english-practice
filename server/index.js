const express= require('express')
const PORT =5000
const app = express()
const file = require('./words.json')
const words=file.wordList
console.log(file.wordList)
app.get('/api/words',(req, res) => {
    res.json(words)
})
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})