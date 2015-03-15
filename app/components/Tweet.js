var React = require('react');
var generalUtil = require('../utils/generalUtil');
var badlyNamedUtil = require('../utils/badlyNamedUtil');

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
    badlyNameUtil.unregister(this);
  },

  swapRandomWord() {
    var sentence = this.state.text;
    var word = getRandomWord(sentence);
    var index = sentence.indexOf(word);
    // var sanitized = word.replace(/[^\w]|_/g, '');

    var newWord = 'SHIT';
    var newSentence = sentence.substring(0, index) + newWord + sentence.substring(index + word.length);

    this.setState({
      text: newSentence
    });
  },

  resetText() {
    this.setState({
      text: this.props.text
    });
  },

  render() {
    var styles = {
      timestamp: {
        fontStyle: 'italic'
      },

      avatar: {
        height: '40px'
      },
    };

    return (
      <li>
        <img style={styles.avatar} src={this.props.avatar_url}></img>
        <p>{this.props.username}</p>
        <p>{this.state.text}</p>
        <p style={styles.timestamp}>{this.props.timestamp}</p>
        <button onClick={this.resetText}>Reset</button>
      </li>
    );
  }
});

module.exports = Tweet;
