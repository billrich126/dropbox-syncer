/**
 * final filename generator(all lowercase by default)
 *
 * filename format:
 *  <prefix> + <original filename> + <file extension>
 */

const generateFilename = function(team, level, apparatus, firstName, lastName, file) {
  var fileExt = file.name.split('.').pop()

  apparatus = apparatus.toLowerCase()

  var name = "all"
  if (firstName && lastName) {
    name = firstName+'_'+lastName
  }

  return team+'_'+level+'_'+apparatus+'_'+name+'.'+fileExt
}

export default generateFilename
