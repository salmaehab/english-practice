const express= require('express')
const PORT =5000
const app = express()
const cors= require('cors')
const bodyParser = require('body-parser')
const file = require('./words.json')
const words=file.wordList
const scores=file.scoresList

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 })
app.get('/api/words',(req, res) => {
    res.json(words)
})
app.post('/api/rank', (req, res) => {
    let count=0
    for(let i=0;i<scores.length;i++)
{
    if(scores[i]<req.body.score)
    {
      count++  
    }
    
}
rank=Number((count/30)*100).toFixed(2)
    res.json({rank:rank})
})
 
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})