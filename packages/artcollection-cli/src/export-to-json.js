const fetch = require('node-fetch');
const fs = require('fs');

const sanitize = (type, input) => {
	if (type == "url") {
		return input
	}
	else if (type == "date") {
		if (input == "created") {
			return "n.d."
		} else {
			return input.replace(";created", "")
		}
	}
	else if (type == "lcsh") {
		if (JSON.stringify(input) == '{}' || input.length == 0) {
			return ["No Subject Heading"]
		} else {
			return input
		}
	} else if (type == "artist") {
		if (input === undefined) {
			return "No artist listed";
		} else {
			return input;
		}
	} else if (type == "medium") {
		if (input === undefined) {
			return "No medium specified";
		} else {
			return input;
		}
	} else if (type == "type") {
		if (input === undefined) {
			return "No type specified";
		} else {
			return input;
		}
	}
}

const getCollectiveAccessToken = async (CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME) => {
	try {
		const url = `https://${CA_SERVICE_API_USER}:${CA_SERVICE_API_KEY}@${CA_HOSTNAME}/service.php/auth/login`
		// console.log('url', url)
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'GET'
		};
		return fetch(url, options)
			.then(response => {
				if (!response.ok) {
					return Promise.reject({
						error: {
							message: `${response.status} - ${response.statusText}`,
							name: 'NOTOK'
						}
					})
				}
				return response;
			})
			.then(response => {
				return response.json()
			})
			.then(data => {
				return new Promise((resolve, reject) => {
					if (data && data.ok && data.ok == true) {
						resolve(data.authToken)
					}
				})
			})
	} catch(err) {
		console.log('err', err)
		return Promise.reject(err);
	}
}

const getCollectiveAccessObject = async (CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME, id) => {
	try {
		const url = `https://${CA_SERVICE_API_USER}:${CA_SERVICE_API_KEY}@${CA_HOSTNAME}/service.php/item/ca_objects/id/${id}`
		// console.log('url', url)
		console.log('id', id)
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				"bundles": {
					"object_id": {},
					"idno": {},
					"preferred_labels": { },
					"type_id": { "convertCodesToDisplayText": true },
					"ca_objects.work_description": { },
					"access": { "convertCodesToDisplayText": true },
					"status": { "convertCodesToDisplayText": true },
					"ca_collections": { },
					"ca_object_representations.media.thumbnail": { },
					"ca_object_representations.media.preview170": { },
					"ca_object_representations.media.original": { },
					"ca_objects.work_medium": {},
					"ca_objects.lcsh_terms": { "returnAsArray": true },
					"ca_objects.date": { "convertCodesToDisplayText": true },
					"ca_object_representations.credit_line": { },
					"ca_entities.related": { }
				}
			})
		};
		return fetch(url, options)
			.then(response => {
				if (!response.ok) {
					return Promise.reject({
						error: {
							message: `${response.status} - ${response.statusText}`,
							name: 'NOTOK'
						}
					})
				}
				return response;
			})
			.then(response => {
				return response.json()
			})
			.then(data => {
				// console.log('data', data)
				return new Promise((resolve, reject) => {
					if (data && data.ok && data.ok == true) {
						resolve(data)
					}
					else {
						reject(data)
					}
				})
			})
	} catch(err) {
		console.log('err', err)
		return Promise.reject(err);
	}
}

const getCollectiveAccessObjects = async (CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME) => {
	try {
		const url = `https://${CA_SERVICE_API_USER}:${CA_SERVICE_API_KEY}@${CA_HOSTNAME}/service.php/find/ca_objects?q=*`
		// console.log('url', url)
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'GET'
		};
		return fetch(url, options)
			.then(response => {
				if (!response.ok) {
					return Promise.reject({
						error: {
							message: `${response.status} - ${response.statusText}`,
							name: 'NOTOK'
						}
					})
				}
				return response;
			})
			.then(response => {
				return response.json()
			})
			.then(data => {
				return new Promise((resolve, reject) => {
					if (data && data.ok && data.ok == true) {
						resolve(data.results)
					}
				})
			})
	} catch(err) {
		console.log('err', err)
		return Promise.reject(err);
	}
}

const writeFile = (fileName, content) => {
	fs.writeFile(fileName, content, 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`content written to ${fileName}`);
	});
}

module.exports = async () => {
  const CA_SERVICE_API_USER = process.env.CA_SERVICE_API_USER
	const CA_SERVICE_API_KEY = process.env.CA_SERVICE_API_KEY
	const CA_HOSTNAME = process.env.CA_HOSTNAME

  try {
		let items = []
    const token = await getCollectiveAccessToken(CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME)
		// Don't actually need to add the token to the calls but other calls may redirect to login if not requested.
		const objects = await getCollectiveAccessObjects(CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME)
		for (let index = 0; index < objects.length; index++) {
		// for (let index = 0; index < 5; index++) {
		// for (let index = objects.length - 2; index < objects.length; index++) {
			const object = objects[index]
			let data = await getCollectiveAccessObject(CA_SERVICE_API_USER, CA_SERVICE_API_KEY, CA_HOSTNAME, object.id)
			if (data.access == "accessible to public") {
				data['ca_objects.date'] = sanitize("date", data['ca_objects.date'])
				data['ca_objects.lcsh_terms'] = sanitize("lcsh", data['ca_objects.lcsh_terms'])
				data['ca_object_representations.media.thumbnail'] = sanitize("url", data['ca_object_representations.media.thumbnail'])
				data['ca_object_representations.media.preview170'] = sanitize("url", data['ca_object_representations.media.preview170'])
				data['ca_object_representations.media.original'] = sanitize("url", data['ca_object_representations.media.original'])
				data['ca_entities.related'] = sanitize("artist", data['ca_entities.related']);
				data['ca_objects.work_medium'] = sanitize("medium", data['ca_objects.work_medium']);
				data['type_id'] = sanitize("type", data['type_id']);
				delete data.ok
				delete data.access
				items.push(data)
			}
    }  
    writeFile('ca_docs.json', JSON.stringify(items))
	} catch(error) {
		if (error.code === 'ETIMEDOUT') {
			console.log('CollectiveAccess is not running.');
		} else {
			console.error('final error', error);
		}
  }
}
