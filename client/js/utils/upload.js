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

const upload = function(level, apparatus, firstName, lastName, fileContent) {
  var dbx;

  // TODO: CHANGE THE TOKEN TO YOUR DROPBOX FOLDER's TOKEN, then all set!
  var token = "iernAqGWD_kAAAAAAAAguD3OK2OkfkENN4UfPn00ZSCedpe7HUQbIITvaqI6In4g"

  dbx = authenticate(token)
  if (!dbx) {
    throw "Your dropbox token *is not* valid!"
  }

  var filename;
  filename = generateFilename(level, apparatus, firstName, lastName, fileContent.name)
  if (!filename) {
    throw  "Your file name doesn't meet requirement"
  }

  var public_path = "/folkUploads"
  var target_path = [public_path, 'level'+level, filename].join('/')
  return dbx.filesUpload({
    contents: fileContent,
    path: target_path,
    mode: {
      '.tag': 'add'
    }
  })
  .then(fulfill => Promise.resolve(fulfill))
  .catch(err => Promise.reject(err))
}

export default upload
