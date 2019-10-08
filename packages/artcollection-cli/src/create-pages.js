const fs = require('fs');
const fetch = require('node-fetch');

const readFile = (fileName) => {
  const content = fs.readFileSync(fileName)
  return JSON.parse(content)
}

async function download(url, fileName) {
  const res = await fetch(url);
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(`./catalog/entries/${fileName}`);
    res.body.pipe(fileStream);
    res.body.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve();
    });
  });
}

const writeFile = (fileName, content) => {
	fs.writeFile(fileName, content, 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`content written to ${fileName}`);
	});
}

const sanitize = (input) => {
  if (input) {
    return input.replace(/\n/g, '\\n')
  } else {
    return ''
  }
}

module.exports = () => {
  const CA_HOSTNAME = process.env.CA_HOSTNAME
  const path = 'ca_docs.json'
  try {
    if (fs.existsSync(path)) {
      const docs = readFile(path)
      for (let i = 0; i < docs.length; i++) {
        const doc = docs[i]
        if ('idno' in doc && (doc['status'] === "new" || doc['status'] === "completed")) {
          const originalUrl = doc['ca_object_representations.media.original'].replace(/<img src='(.+)' width='\d+' height='\d+'.*/g,"$1")
          const original = doc['ca_object_representations.media.original'].replace(/<img src='https:\/\/collectiveaccess.lib.calpoly.edu\/media\/collectiveaccess\/images\/\d\/(.+)' width='\d+' height='\d+'.*/g,"$1")
          download(originalUrl, original)
          let page = {
            path: `/catalog/${doc['idno']}/`,
            id: doc['idno'],
            title: doc['preferred_labels'],
            collection: doc['ca_collections'],
            artist: doc['ca_entities.related'],
            type: doc['type_id'],
            medium: doc['ca_objects.work_medium'],
            credit: doc['ca_object_representations.credit_line'],
            figure: [
              {
                id: original.replace(/\.\w+$/, ''),
                file: `./${original}`,
                caption: doc['ca_objects.work_description'].substring(0, 32)
              }
            ]
          }
          const frontmatter = 
`path: ${page.path}
id: ${page.id}
title: ${sanitize(page.title)}
collection: ${sanitize(page.collection)}
artist: ${sanitize(page.artist)}
type: ${page.type}
medium: ${page.medium}
credit: "${page.credit}"
figure:
  - id: ${page.figure[0].id}
    file: "${page.figure[0].file}"
    caption: ${sanitize(page.figure[0].caption)}
`
          let content = `---\n${frontmatter}---\n${doc['ca_objects.work_description']}\n`
          const fileName = `./catalog/entries/${doc['idno']}.md`
          console.log(`${i}: ${fileName}`)
          writeFile(fileName, content)
        }
      }
    } else {
			console.log('No input file. CollectiveAccess is not running.');
    }
	} catch(err) {
		console.log('err', err)
	}
}
