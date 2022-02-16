// @ts-check
// NETLIFY function to call a github repositry-dispatch Web hook
// when a form submission occurs

const https = require('https')
const { isArray } = require('util')
const { v1: uuidv1 } = require('uuid') // use v1, timebased so unique each call

// GitHub dispatch web hook handler used to triggerthe workflow
const GITHUB_DISPATCH_EVENT = 'form-submission'
const GITHUB_URI = '/repos/w3c/wai-interactive-lists/dispatches'

function callGitHubWebhook(formData) {
  const reqBody = `{
        "event_type": "${GITHUB_DISPATCH_EVENT}",
        "client_payload": {
          "form":
            ${JSON.stringify(formData)}
          }
    }`

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: GITHUB_URI,
    method: 'POST',
    headers: {
      'User-Agent': 'W3C WAI Website list',
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      'Content-Length': reqBody.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let respBody = ''
      res.on('data', (chunk) => (respBody += chunk.toString()))
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: respBody,
        })
      })
    })

    req.on('error', (error) => {
      console.error(error)
      reject({
        statusCode: 500,
        body: `Error calling GitHub action - ${error}`,
      })
    })

    req.write(reqBody)
    req.end()
  })
}

function formEncodedToPOJO(formEncoded) {
  const form = new URLSearchParams(formEncoded)
  return Array.from(form.keys()).reduce((result, key) => {
    const isArrayKey = key.endsWith('[]')
    const targetKey = isArrayKey ? key.slice(0, -2) : key
    result[targetKey] = ((result[targetKey] && !Array.isArray(result[targetKey]))) ? // 2nd checkbox with this key
      form.getAll(targetKey) :
      (isArrayKey) ? form.getAll(key) : form.get(key)
    return result
  }, {})
}

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    console.error(`Invalid http method: ${event.httpMethod}`)
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const contentType = event.headers['content-type']
  if (contentType !== 'application/x-www-form-urlencoded') {
    console.error(`Content incorrect type: ${event.headers['content-type']}`)
    return { statusCode: 415, body: 'Unsupported Media Type' }
  }

  const formData = formEncodedToPOJO(event.body)

  // new id if not in form - v1 date based to avoid dupications
  formData['submission_ref'] = formData['submission_ref'] || uuidv1()
  formData['submission_date'] = (new Date).toISOString()

  console.info(`Processing form ${formData['form_name']} ${formData['submission_ref']}`)

  // Invoke GitHub Action
  const res = await callGitHubWebhook(formData)
  const success = res.statusCode >= 200 && res.statusCode <= 299
  if (!success) {
    console.error(`GitHub returned failure: ${res.statusCode}, ${res.body}`)
    return { statusCode: res.statusCode, body: `GitHub Action failed with ${res.statusCode}, ${res.body}` }
  }

  return { statusCode: 200, body: JSON.stringify(formData, null, '  ') }
}
