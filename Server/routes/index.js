var express = require('express');
var router = express.Router();
require('dotenv').config();

// import fetchAll from './internal/fetchAll'
// import buildOptions from './internal/util'
// import request from 'request-promise'
// import linkparser from 'parse-link-header'


const canvasDomain = process.env.CANVAS_API_DOMAIN
ACCESS_TOKEN = process.env.ACCESS_TOKEN;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function buildOptions (options) {
  if (options) return options.join('&')
  else return ''
}

const requestObj = url => ({
  'method': 'GET',
  'uri': url,
  'json': true,
  'resolveWithFullResponse': true,
  'headers': {
    'Authorization': 'Bearer ' + ACCESS_TOKEN
  }
})

const fetchAll = (url, result = []) =>
  request(requestObj(url))
    .then(response => {
      result = [...result, ...response.body]
      const links = linkparser(response.headers.link)
      return links.next ? fetchAll(links.next.url, result) : result
    })

export default function getQuizQuestions (courseId, quizId, ...options) {
  return fetchAll(canvasDomain + `/courses/${courseId}/quizzes/${quizId}/questions?` + buildOptions(options))
}

module.exports = router;
