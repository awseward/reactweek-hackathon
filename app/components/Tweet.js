var React = require('react');
var $ = require('jquery');
var generalUtil = require('../utils/generalUtil');
var badlyNamedUtil = require('../utils/badlyNamedUtil');
var wordTransformUtil = require('../utils/wordTransformUtil');

var cleanUpWord = (oldWord, newWord) => {
  if (oldWord.replace(/([^\w|_])/g, '') === '') {
    return newWord;
  }

  var headMatches = oldWord.match(/^([^\w]|_)+/);
  var head = headMatches && headMatches[0] || '';

  var tailMatches = oldWord.match(/([^\w]|_)+$/);
  var tail = tailMatches && tailMatches[0] || '';

  return head + newWord + tail;
};

var Tweet = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
    avatar_url: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      words: this.props.text.split(/\s/),
    };
  },

  componentWillMount() {
    badlyNamedUtil.register(this);
  },

  componentWillUnmount() {
    badlyNamedUtil.unregister(this);
  },

  componentDidUpdate() {
    var container = this.refs.container.getDOMNode();
    $(container).addClass('updated');
    setTimeout(() => {
      $(container).removeClass('updated');
    }, 300);
  },

  swapRandomWord() {
    var words = this.state.words.slice();
    var randomPosition = Math.floor(Math.random() * words.length);
    var originalWord = words[randomPosition];

    wordTransformUtil.betterRandom((word) => {
      var newWord = cleanUpWord(originalWord, word);
      words[randomPosition] = newWord;

      this.setState({
        // If we don't join and split, there is a potential for an index in
        // words to have to words in it due to the API occasionally returning
        // 'phrases'. (e.g. `['this', 'shit', 'is bananas']`)
        //
        // The joining and splitting done here makes sure that the above
        // example ends up as `['this', 'shit', 'is', 'bananas']` instead.
        words: words.join(' ').split(/\s/)
      });
    });
  },

  reset() {
    this.setState(this.getInitialState());
  },

  render() {
    var styles = {
      container: {
        margin: '10px',
        padding: '10px',
        display: 'inline-block',
        width: '22%',
        verticalAlign: 'top'
      },

      timestamp: {
        fontStyle: 'italic',
      },

      avatar: {
        height: '40px',
        marginRight: '10px',
        verticalAlign: 'middle'
      },

      username: {
        verticalAlign: 'top',
        textDecoration: 'none',
        color: 'rgb(0, 132, 180)'
      }
    };

    var userLink = `https://twitter.com/${this.props.username}`;
    var date = new Date(Date.parse(this.props.timestamp));
    var timestamp = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`

    return (
      <div className='tweet' ref='container' style={styles.container}>
        <img style={styles.avatar} src={this.props.avatar_url}></img>
        <a href={userLink} style={styles.username}>@{this.props.username}</a>
        <p>{this.state.words.join(' ')}</p>
        <p style={styles.timestamp}>{timestamp}</p>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
});

module.exports = Tweet;
