var React = require('react');
var TweetList = require('./components/TweetList');
var LocationSelector = require('./components/LocationSelector');

var App = React.createClass({
  render() {
    return (
      <div>
        <TweetList />
        <LocationSelector />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
