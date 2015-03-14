var React = require('react');
var TweetList = require('./components/TweetList');
var wordTransformUtil = require('./utils/wordTransformUtil');
var generalUtil = require('./utils/generalUtil');

var printResult = (method, original, transformed) => {
  console.warn(`${method}: {original: "${original}", transformed: "${transformed}"}`);
};

var App = React.createClass({
  componentDidMount() {
    var original = 'pump';

    wordTransformUtil.wikiSynonym(original, (transformed) => {
      printResult('wikiSynonym', original, transformed);
    });

    wordTransformUtil.synonym(original, (transformed) => {
      printResult('synonym', original, transformed);
    });

    wordTransformUtil.antonym(original, (transformed) => {
      printResult('antonym', original, transformed);
    });

    wordTransformUtil.random((transformed) => {
      printResult('random', original, transformed);
    });
  },

  render() {
    return <TweetList />;
  }
});

React.render(<App />, document.getElementById('app'));
