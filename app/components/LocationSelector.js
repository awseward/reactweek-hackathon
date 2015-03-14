var React = require('react');
var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http'; 
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

var LocationSelector = React.createClass({

  render: function() {
    return (
      <div > look at me! </div>
    );
  }

});

module.exports = LocationSelector;
