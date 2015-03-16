var React = require('react');
var $ = require('jquery');
var generalUtil = require('../utils/generalUtil');
var badlyNamedUtil = require('../utils/badlyNamedUtil');
var wordTransformUtil = require('../utils/wordTransformUtil');

var getRandomWord = (sentence) => {
  var words = sentence.split(/\s/).filter((item) => {
    return item !== '';
  });
  return generalUtil.getRandomMember(words);
}

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
      text: generalUtil.normalizeWhitespace(this.props.text)
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
    var sentence = this.state.text;
    var randomWord = getRandomWord(sentence);
    var cleanedWord = randomWord.replace(/^([^\w]|_)+/g, '').replace(/([^\w]|_)+$/g, '');

    var index, tail;
    if (cleanedWord.replace(/\s+/g, '') === '') {
      index = sentence.indexOf(randomWord);
      tail = sentence.substring(index + randomWord.length);
    } else {
      index = sentence.indexOf(cleanedWord);
      tail = sentence.substring(index + cleanedWord.length);
    }
    var head = sentence.substring(0, index);

    wordTransformUtil.betterRandom((word) => {
      this.setState({
        text: head + word + tail
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
        <p>{this.state.text}</p>
        <p style={styles.timestamp}>{timestamp}</p>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
});

module.exports = Tweet;
