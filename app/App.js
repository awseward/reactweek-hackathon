var React = require('react');
var TweetList = require('./components/TweetList');
var wordTransformUtil = require('./utils/wordTransformUtil');
var generalUtil = require('./utils/generalUtil');

var printResult = (method, original, transformed) => {
  console.warn(`${method}: {original: "${original}", transformed: "${transformed}"}`);
};

var demoTransformers = () => {
    wordTransformUtil.random((word) => {
      wordTransformUtil.wikiSynonym(word, (transformed) => {
        printResult('wikiSynonym', word, transformed);
      });
    });

    wordTransformUtil.random((word) => {
      wordTransformUtil.synonym(word, (transformed) => {
        printResult('synonym', word, transformed);
      });
    });

    wordTransformUtil.random((word) => {
      wordTransformUtil.antonym(word, (transformed) => {
        printResult('antonym', word, transformed);
      });
    });
};

var App = React.createClass({
  componentDidMount() {
    demoTransformers();
  },

  render() {
    return <TweetList />;
  }
});

React.render(<App />, document.getElementById('app'));
