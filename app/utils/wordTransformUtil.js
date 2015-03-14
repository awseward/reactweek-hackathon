var $ = require('jquery');
var bigHugeThesaurusApiKey = 'be9a99053a1edb73d99f541e941f5b6c';

var getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

var getRandomProperty = (obj) => {
  var keys = Object.keys(obj);
  if (keys.length != 0) {
    var index = getRandomInt(keys.length - 1);
    var key = keys[index];
    return obj[key];
  }
};

var handleSynonym = (data, callback) => {
  var partOfSpeech = getRandomProperty(data);
  var synonyms = partOfSpeech.syn;
  var result = (synonyms && synonyms[0]) || 'N/A';
  callback && callback(result);
}

var handleAntonym = (data, callback) => {
  var partOfSpeech = getRandomProperty(data);
  var antonyms = partOfSpeech.ant;
  var result = (antonyms && antonyms[0]) || 'N/A';
  callback && callback(result);
}

var doBigHugeThesaurus = (word, onSuccess, callback) => {
  var url = `http://words.bighugelabs.com/api/2/${bigHugeThesaurusApiKey}/${word}/json`;

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

var wordTransformationUtil = {
  synonym: (word, callback) => {
    doBigHugeThesaurus(word, handleSynonym, callback);
  },

  antonym: (word, callback) => {
    doBigHugeThesaurus(word, handleAntonym, callback);
  },
};

module.exports = wordTransformationUtil;
