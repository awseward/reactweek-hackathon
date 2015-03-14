var $ = require('jquery');
var generalUtil = require('./generalUtil');
var apiKeys = {
  bigHugeThesaurus: 'be9a99053a1edb73d99f541e941f5b6c',
  mashape: 'rnoRviaiT4mshTqD9pWkAwOxFhVkp13IJtgjsnZcbxWarK9lIE'
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

var handleRandomWord = (data, callback) => {
  var word = data.Word.trim();
  callback && callback(word);
};

var doBigHugeThesaurus = (word, onSuccess, callback) => {
  var url = `http://words.bighugelabs.com/api/2/${apiKeys.bigHugeThesaurus}/${word}/json`;

  $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      error: (request, status, error) => {
        console.error('Error', status, error);
      },
      success: (data, status, request) => {
        onSuccess(data, callback);
      }
    });
};

var doWikiSynonym = (word, callback) => {
  var url = `https://wikisynonyms.p.mashape.com/${word}`;

  $.ajax({
    url: url,
    type: 'GET',
    beforeSend: (request, settings) => {
      request.setRequestHeader('X-Mashape-Key', apiKeys.mashape);
    },
    error: (request, status, error) => {
      console.error('Error', status, error);
    },
    success: (data, status, request) => {
      handleWikiSynonym(data, callback);
    }
  });
};

var doRandomWord = (callback) => {
  var url = 'http://randomword.setgetgo.com/get.php'; 

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    error: (request, status, error) => {
      console.error('Error', status, error);
    },
    success: (data, status, request) => {
      handleRandomWord(data, callback);
    }
  });
}

var wordTransformationUtil = {
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
    doRandomWord(callback);
  }
};

module.exports = wordTransformationUtil;
