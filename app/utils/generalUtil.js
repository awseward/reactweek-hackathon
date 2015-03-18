var generalUtil = {
  getRandomMember: (array) => {
    if (array.length === 0) {
      return null;
    }

    var index = Math.floor(Math.random() * array.length);
    return array[index];
  },

  // Couldn't get this to work w/ ES6 `(obj) => {...}` syntax :(
  getRandomProperty: function(obj) {
    var keys = Object.keys(obj);
    if (keys.length == 0) {
      return null;
    }

    var key = this.getRandomMember(keys);
    return obj[key];
  },

  normalizeWhitespace: (sentence) => {
    return sentence.trim().split(/\s/).filter((item) => {
      return item.trim() !== '';
    }).join(' ');
  }
};

module.exports = generalUtil;
