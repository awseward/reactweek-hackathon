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

  componentWillMount() {
    badlyNamedUtil.register(this);
  },

  componentWillUnmount() {
    badlyNameUtil.unregister(this);
  },

  doSomething() {
    var word = getRandomWord(this.props.text);
    var sanitized = word.replace(/[^\w]|_/g, '');
    console.log(sanitized);
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
        <p>{this.props.text}</p>
        <p style={styles.timestamp}>{this.props.timestamp}</p>
      </li>
    );
  }
});

module.exports = Tweet;
