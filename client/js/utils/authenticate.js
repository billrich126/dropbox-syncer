/**
 * autheticator of Dropbox
 */

import Dropbox from 'dropbox'

const authenticate = function(token) {
  var dbx = new Dropbox({ accessToken: token })

  return dbx
}

export default authenticate
