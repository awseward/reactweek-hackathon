var React = require('react');
var TweetList = require('./components/TweetList');
var wordTransformUtil = require('./utils/wordTransformUtil');

var printResult = (original, transformed) => {
  alert(`{original: "${original}", transformed: "${transformed}"}`);
};

var App = React.createClass({
  componentDidMount() {
    var derp = 'gross';
    wordTransformUtil.synonym(derp, (word) => {
      printResult(derp, word);
    });

    wordTransformUtil.antonym(derp, (word) => {
      printResult(derp, word);
    });
  },

  render() {
    return <TweetList />;
  }
});

React.render(<App />, document.getElementById('app'));
