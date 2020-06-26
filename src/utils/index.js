export const getRandomColor = () => {
    var r = function() {
      return Math.floor(Math.random() * 256)
    }
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')'
}
  
export const AUTH_AUTHENTICATED = 'AUTH_AUTHENTICATED'
export const AUTH_UNAUTHENTICATED = 'AUTH_UNAUTHENTICATED'

export const exportPDF = data => {
  let report = []
  console.log(data)
  // pdfMake.createPdf(documentDefination).download();
}