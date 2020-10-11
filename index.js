const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.POST || 5000


app.listen(port, () => console.log('Server has been started on port', port))