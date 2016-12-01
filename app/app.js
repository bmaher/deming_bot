const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const request = require('request')
const jsdom = require('jsdom')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('DemingBot.')
})

let result

app.post('/', function (req, res) {
  result = res
  const token = fs.readFileSync('token').toString().trim()
  if (req.body.token === token) {
    const searchTerm = req.body.text
    console.log('Request body: text='.concat(searchTerm))
    search(searchTerm)
  } else {
    res.sendStatus(403)
  }
})

app.listen(3000, function () {
  console.log('Listening on port 3000.')
})

const errorMessage = '"A good system will beat a bad query every time." - DemingBot'

function sendReply (str) {
  console.log(`Sending reply: ${str}`)
  result.send(str)
}

function search (text) {
  const uri = 'http://quotes.deming.org/search/'.concat(text)
  request(uri, function (error, response, body) {
    console.log('Sending request to server.')
    if (!error && response.statusCode === 200) {
      console.log('Request succeeded; parsing response.')
      parseResponse(body)
    } else {
      console.log('Request failed; sending error message as reply.')
      sendReply(errorMessage)
    }
  })
}

function parseResponse (rawHtml) {
  jsdom.env(
    rawHtml,
    ['http://code.jquery.com/jquery.js'],
    function (err, doc) {
      const n = doc.$('div.quote').length
      if (n === 0) {
        console.log('No results found; sending error message as reply.')
        sendReply(errorMessage)
      } else {
        console.log('Results found; picking random quote.')
        pickRandomQuote(doc, n)
      }
    }
  )
}

function pickRandomQuote (doc, n) {
  console.log('Picking random quote; sending quote as reply.')
  const rand = getRandomInt(1, n).toString()
  const query = `div.quote:nth-child(${rand})`
  sendReply(`"${doc.$(query).find('p').text().trim()}" - W. Edwards Deming`)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
