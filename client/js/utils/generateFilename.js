/**
 * final filename generator(all lowercase by default)
 *
 * filename format:
 *  <prefix> + <original filename> + <file extension>
 */

const generateFilename = function(level, apparatus, firstName, lastName, origName) {
  const CLUB_NAME = 'rhd'

  apparatus = apparatus.toLowerCase()
  firstName = firstName.toLowerCase()
  lastName = lastName.toLowerCase()

  return 'level'+level+'_'+apparatus+'_'+CLUB_NAME+'_'+firstName+'_'+lastName+'.'+origName
}

export default generateFilename
