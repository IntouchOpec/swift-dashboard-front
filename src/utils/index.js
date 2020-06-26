export const getRandomColor = () => {
    var r = function() {
      return Math.floor(Math.random() * 256)
    }
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')'
}
  
export const AUTH_AUTHENTICATED = 'AUTH_AUTHENTICATED'
export const AUTH_UNAUTHENTICATED = 'AUTH_UNAUTHENTICATED'

export const isEmpty = (obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}