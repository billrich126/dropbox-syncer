import express from 'express'
import Busboy from 'busboy'
import path from 'path'

import upload from './service/upload.js'

var app = express()
const PORT=8080

// serving STATIC files
app.use(express.static('client'))

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})

// serving DYNAMIC request
// app.post('/upload', (req, res) => {
//
//   var busboy = new Busboy({ headers: req.headers });
//   busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//     // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
//     req[fieldname] = val
//   });
//
//   busboy.on('finish', function() {
//     const {level, apparatus, firstName, lastName, fileContents} = req
//
//     return new Promise((resolve, reject) => {
//       const n = fileContents.length;
//       let count = 0
//       for (let x = 0; x < n; x++) {
//         upload(
//           level, apparatus, firstName, lastName, fileContents[x]
//         )
//         .then(fulfill => {
//           ++count
//           if (count === n) {
//             resolve(fulfill)
//           }
//         })
//         .catch(err => reject(err))
//       }
//     })
//     .then(resolve => res.json({ uploaded: true }))
//     .catch(rej => res.json({ uploaded: false }))
//   })
//
//     req.pipe(busboy)
//
// })
