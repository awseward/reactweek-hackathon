var React = require('react');
var $ = require('jquery');
var generalUtil = require('../utils/generalUtil');
var badlyNamedUtil = require('../utils/badlyNamedUtil');
var wordTransformUtil = require('../utils/wordTransformUtil');

var getRandomWord = (sentence) => {
  var words = sentence.split(' ');
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
      text: this.props.text
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
    var word = getRandomWord(sentence).replace(/^[^\w]|_/g, '').replace(/[^\w]|_$/g, '');

    if (word.replace(/\s/g, '') === '') { return; }

    // FIXME: This does weird things when punctuation is on the end of words
    var index = sentence.indexOf(word);
    var head = sentence.substring(0, index);
    var tail = sentence.substring(index + word.length);

    wordTransformUtil.betterRandom((word) => {
      this.setState({
        text: head + word + tail
      });
    });
  },

  resetText() {
    this.setState({
      text: this.props.text
    });
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
        fontStyle: 'italic'
      },

      avatar: {
        height: '40px',
        marginRight: '20px'
      },

      username: {
        verticalAlign: 'top'
      }
    };

    return (
      <div ref='container' style={styles.container}>
        <img style={styles.avatar} src={this.props.avatar_url}></img>
        <span style={styles.username}>{this.props.username}</span>
        <p>{this.state.text}</p>
        <p style={styles.timestamp}>{this.props.timestamp}</p>
        <button onClick={this.resetText}>Reset</button>
      </div>
    );
  }
});

module.exports = Tweet;
