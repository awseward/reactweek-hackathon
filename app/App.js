var React = require('react');
var TweetList = require('./components/TweetList');

var App = React.createClass({
  render() {
    return <TweetList />;
  }
});

React.render(<App />, document.getElementById('app'));
