var React = require('react');

var Tweet = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    avatar_url: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.string.isRequired
  },

  render() {
    var styles = {
      timestamp: {
        'font-style': 'italic'
      },

      avatar: {
        height: '40px'
      }
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
