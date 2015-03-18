var $ = require('jquery');
var generalUtil = require('./generalUtil');
var apiKeys = {
  bigHugeThesaurus: 'be9a99053a1edb73d99f541e941f5b6c',
  mashape: 'rnoRviaiT4mshTqD9pWkAwOxFhVkp13IJtgjsnZcbxWarK9lIE',
  wordnik: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' // <= This is just stolen from the example page, we'll probably want to set our own up...
};

var getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

var handleSynonym = (data, callback) => {
  var partOfSpeech = generalUtil.getRandomProperty(data);
  var synonyms = partOfSpeech.syn;
  var result = (synonyms && generalUtil.getRandomMember(synonyms)) || 'N/A';
  callback && callback(result);
};

var handleAntonym = (data, callback) => {
  var partOfSpeech = generalUtil.getRandomProperty(data);
  var antonyms = partOfSpeech.ant;
  var result = (antonyms && generalUtil.getRandomMember(antonyms)) || 'N/A';
  callback && callback(result);
};

var handleWikiSynonym = (data, callback) => {
  var terms = data.terms;
  result = generalUtil.getRandomMember(terms).term;
  callback && callback(result);
};

var handleRandom = (data, callback) => {
  var word = data.Word.trim();
  callback && callback(word);
};

var handleBetterRandom = (data, callback) => {
  callback && callback(data.word);
};

var handleFailure = (method, status, error) => {
  console.warn(`Error[${method}]`, status, error);
};

var doBigHugeThesaurus = (word, onSuccess, callback) => {
  var url = `http://words.bighugelabs.com/api/2/${apiKeys.bigHugeThesaurus}/${word}/json`;

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp'
  }).fail((request, status, error) => {
    handleFailure('doBigHugeThesaurus', status, error);
  }).done((data, status, request) => {
    onSuccess(data, callback);
  });
};

var doWikiSynonym = (word, callback) => {
  var url = `https://wikisynonyms.p.mashape.com/${word}`;

  $.ajax({
    url: url,
    type: 'GET',
    beforeSend: (request, settings) => {
      request.setRequestHeader('X-Mashape-Key', apiKeys.mashape);
    }
  }).fail((request, status, error) => {
    handleFailure('doWikiSynonym', status, error);
  }).done((data, status, request) => {
    if (request.status === 204) { return; }

    handleWikiSynonym(data, callback);
  });
};

var doRandomWord = (callback) => {
  var url = 'http://randomword.setgetgo.com/get.php'; 

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
  }).fail((request, status, error) => {
    handleFailure('doRandom', status, error);
  }).done((data, status, request) => {
    handleRandom(data, callback);
  });
};

var doRandom = (callback) => {
  var url = 'http://randomword.setgetgo.com/get.php';

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
  }).fail((request, status, error) => {
    handleFailure('doBetterRandom', status, error);
  }).done((data, status, request) => {
    handleRandom(data, callback);
  });
};

var doBetterRandom = (callback) => {
  var corpus = 50000;
  var url = `http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&api_key=${apiKeys.wordnik}&minCorpusCount=${corpus}`;

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
  }).fail((request, status, error) => {
    handleFailure('doBetterRandom', status, error);
  }).done((data, status, request) => {
    handleBetterRandom(data, callback);
  });
};

var wordTransformUtil = {
  wikiSynonym: (word, callback) => {
    doWikiSynonym(word, callback);
  },

  synonym: (word, callback) => {
    doBigHugeThesaurus(word, handleSynonym, callback);
  },

  antonym: (word, callback) => {
    doBigHugeThesaurus(word, handleAntonym, callback);
  },

  random: (callback) => {
    doRandom(callback);
  },

  betterRandom: (callback) => {
    doBetterRandom(callback);
  }
};

module.exports = wordTransformUtil;
