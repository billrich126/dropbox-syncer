/**
 * main function of the upload task
 *
 * perform 3 things:
 *  1. dropbox token authentication
 *  2. filename generation
 *  3. files upload
 */

import generateFilename from './generateFilename'
import authenticate from './authenticate'

const upload = function(team, level, apparatus, firstName, lastName, file) {
  var dbx;

  // TODO: CHANGE THE TOKEN TO YOUR DROPBOX FOLDER's TOKEN, then all set!
  var token = "kwsKcLtrRVEAAAAAAADAfjsrHeWj7RJJZl_qTHI273jjaoQNMFUxW2b2m7KEGYw4"

  dbx = authenticate(token)
  if (!dbx) {
    throw "Your dropbox token *is not* valid!"
  }

  var filename;
  filename = generateFilename(team, level, apparatus, firstName, lastName, file)
  if (!filename) {
    throw  "Your file name doesn't meet requirement"
  }

  // console.log("Valid Filename is:", filename)

  var public_path = "/folkUploads"
  var target_path = [public_path, 'level'+level, filename].join('/')
  return dbx.filesUpload({
    contents: file,
    path: target_path,
    mode: {
      '.tag': 'add'
    }
  })
  .then(fulfill => Promise.resolve(fulfill))
  .catch(err => Promise.reject(err))
}

export default upload
