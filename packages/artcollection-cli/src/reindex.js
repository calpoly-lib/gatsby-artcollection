const Appbase = require("appbase-js")
const fs = require('fs');

const readFile = (fileName) => {
  const content = fs.readFileSync(fileName)
  return JSON.parse(content)
}


module.exports = () => {
  
  const abUrl = process.env.AB_URL
  const abApp = process.env.AB_APP
  const abCredentials = process.env.AB_CREDENTIALS
	const abType = 'item'

  const appbaseRef = new Appbase({
    url: abUrl,
    app: abApp,
    credentials: abCredentials
  })

  const docs = readFile('ca_docs.json')
  docs.map(doc => {
    appbaseRef.index({
      type: abType,
      id: doc.idno,
      body: doc
    }).on('data', function(response) {
      console.log(response);
    }).on('error', function(error) {
      console.log(error);
    })
  })
}
