var generalUtil = require('./generalUtil');
var tweets = [];

var interval = setInterval(() => {
  if (tweets.length == 0) { return; }
  var tweet = generalUtil.getRandomMember(tweets);
  tweet.swapRandomWord();
}, 1000);

var swapSchedulingUtil = {
  register: (tweet) => {
    tweets.push(tweet)
  },
  unregister: (tweet) => {
    var index = tweets.indexOf(tweet);
    if (index != -1) {
      tweets.splice(index, 1);
    }
  }
};

module.exports = swapSchedulingUtil;
