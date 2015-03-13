var React = require('react');
var twitterUtil = require('../utils/twitterUtil');

var TweetList = React.createClass({
  getInitialState() {
    return {
      tweets: []
    };
  },

  componentDidMount() {
    var tweets = twitterUtil.getSearchResults().statuses.map((item) => {
      return {
        username: item.user.screen_name,
        text: item.text,
        geo: {
          lat: item.geo.coordinates[0],
          lon: item.geo.coordinates[1]
        }
      };
    });

    this.setState({
      tweets: tweets
    });
  },

  render() {
    var tweetComponents = this.state.tweets.map((item) => {
      return (
        <li>
          <p>{item.username}</p>
          <p>{item.text}</p>
          <p>{item.geo.lat}, {item.geo.lon}</p>
        </li>
        );
    });
    return <ul>{tweetComponents}</ul>;
  }
});

module.exports = TweetList;
