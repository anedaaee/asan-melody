require('dotenv').config();
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const pool = require('./db/mysql')
const loadMessages = require('./functions/loadMessage')
const responseMessage = require('./functions/readMessage')
const routerUse = require('./routerUse.js');
const { log } = require('console');
const fileUpload = require('express-fileupload')
const port = process.env.PORT

const app = express()

//app.use(fileUpload())
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
//Morgan setting
morgan.token('id', function getId (req) {
    if(req.user) { return req.user.id }
    else { return 'Guest' }
})
app.use(morgan(`":date[web]" | "User_:id" | ":method :url" | ":status" | ":response-time ms" | ":user-agent" | ":remote-addr"`,{
    stream: fs.createWriteStream('access.log', { flags: 'a' })
}))

routerUse.app_use(app)

// Error handeling
app.use((err, req, res, next) => {
    if (err) {
        let message = responseMessage(2)
        if (err.customError) { message = responseMessage(err.customError) }
        if (!err.statusCode) { err.statusCode = 500 }
        return res.status(err.statusCode).send({
           "metadata": message
        })
    }
  
    next()
})

// 404 handeling
app.use((req, res) => {
    let message = responseMessage(1)
    console.log(message);
    res.status(404).send(message)
})

//set db poll app
app.locals.db = pool

//create server
app.listen(port , () => {
    app.locals.db = pool
    loadMessages(pool)
    console.log(`Server is up on port ${port}`)
})