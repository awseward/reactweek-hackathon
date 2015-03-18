var _getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

var _getRandomMember = (array) => {
   if (array.length === 0) {
      return null;
    }

    var index = _getRandomInt(array.length);
    return array[index];
};

var _getRandomProperty = (obj) => {
  var keys = Object.keys(obj);
  if (keys.length == 0) {
    return null;
  }

  var key = this.getRandomMember(keys);
  return obj[key];
};

var _normalizeWhitespace = (sentence) => {
  return sentence.trim().split(/\s/).filter((item) => {
    return item.trim() !== '';
  }).join(' ');
};

var generalUtil = {
  getRandomInt: (max) => {
    return _getRandomInt(max);
  },

  getRandomMember: (array) => {
    return _getRandomMember(array);
  },

  getRandomProperty: (obj) => {
    return _getRandomProperty(obj);
  },

  normalizeWhitespace: (sentence) => {
    return _normalizeWhitespace(sentence);
  }
};

module.exports = generalUtil;
