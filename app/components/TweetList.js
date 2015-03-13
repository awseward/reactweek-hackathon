var React = require('react');
var twitterUtil = require('../utils/twitterUtil');

var TweetList = React.createClass({
  getInitialState() {
    return {
      tweets: []
    };
  },

  render() {
    var tweetComponents = this.state.tweets.map((item) => {
      return <li>TODO: This will be a tweet</li>
    });
    return <ul>{tweetComponents}</ul>;
  }
});

module.exports = TweetList;
