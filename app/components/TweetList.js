var React = require('react');
var twitterUtil = require('../utils/twitterUtil');
var Tweet = require('./Tweet');
var wordTransformUtil = require('../utils/wordTransformUtil');
var generalUtil = require('../utils/generalUtil');

var TweetList = React.createClass({
  getInitialState() {
    return {
      tweets: []
    };
  },

  componentWillMount() {
    var response = twitterUtil.getSearchResults();
    var tweets = response.statuses.slice(0, 12).map((item) => {
    // Only loading 12 tweets for now...
    // var tweets = response.statuses.map((item) => {
      return {
        id: item.id,
        username: item.user.screen_name,
        avatar_url: item.user.profile_image_url,
        text: item.text,
        timestamp: item.created_at
      };
    });

    this.setState({
      tweets: tweets
    });
  },

  render() {
    var tweetComponents = this.state.tweets.map((item) => {
      return (
        <Tweet
          id={item.id}
          key={item.id}
          username={item.username}
          text={item.text}
          avatar_url={item.avatar_url}
          timestamp={item.timestamp} />
      );
    });
    return <div>{tweetComponents}</div>;
  }
});

module.exports = TweetList;
