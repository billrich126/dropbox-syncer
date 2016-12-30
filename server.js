import express from 'express'
import path from 'path'

var app = express()
const PORT=8080

// serving STATIC files
app.use(express.static('client'))

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})
