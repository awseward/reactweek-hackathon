var React = require('react');
var TweetList = require('./components/TweetList');
var wordTransformUtil = require('./utils/wordTransformUtil');
var generalUtil = require('./utils/generalUtil');

var printResult = (original, transformed) => {
  alert(`{original: "${original}", transformed: "${transformed}"}`);
};

var App = React.createClass({
  componentDidMount() {
    // var original = 'love';
    // wordTransformUtil.synonym(original, (transformed) => {
    //   printResult(original, transformed);
    // });

    // wordTransformUtil.antonym(original, (transformed) => {
    //   printResult(original, transformed);
    // });
  },

  render() {
    return <TweetList />;
  }
});

React.render(<App />, document.getElementById('app'));
