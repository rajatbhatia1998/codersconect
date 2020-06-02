const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {mongoURL} = require('./config/keys')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')
const app = express()
const path = require('path')


//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

//Connectinng mongo cloud
mongoose.connect(process.env.MONGODB_URI || mongoURL,
    { useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("MongoDB Connected")
})


app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

//"npm install --prefix client && npm run build --prefix client"

//"cd client && npm install --only=dev && npm install && npm run build"
if(process.env.NODE_ENV==='production'){
    
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

}





const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Server running at port "+port)
})