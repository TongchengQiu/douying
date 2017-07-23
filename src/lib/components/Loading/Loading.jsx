'use strict';
// require('./Loading.scss');

var Loading = React.createClass({
  renderLoading: function(num) {
    if(num == 1) {
      return (
        <div className="spinner1">
          <div className="rect1" style={this.props.color?{backgroundColor: this.props.color}:{}}/>
          <div className="rect2" style={this.props.color?{backgroundColor: this.props.color}:{}}/>
          <div className="rect3" style={this.props.color?{backgroundColor: this.props.color}:{}}/>
          <div className="rect4" style={this.props.color?{backgroundColor: this.props.color}:{}}/>
          <div className="rect5" style={this.props.color?{backgroundColor: this.props.color}:{}}/>
        </div>);
    }
    if(num == 2) {
      return (
        <div className="spinner2" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
      );
    }
    if(num == 3) {
      return (
        <div className="spinner3">
          <div className="double-bounce1" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
          <div className="double-bounce2" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
        </div>
      );
    }
    if(num == 4) {
      return (
        <div className="spinner4">
          <div className="cube1" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
          <div className="cube2" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
        </div>
      );
    }
    if(num == 5) {
      return (
        <div className="spinner5">
          <div className="bounce1" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
          <div className="bounce2" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
          <div className="bounce3" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
        </div>
      );
    }
    if(num == 6) {
      return (
        <div className="spinner6" style={this.props.color?{backgroundColor: this.props.color}:{}}></div>
      );
    }
  },
  render: function() {
    var loading = this.renderLoading(this.props.stl||1);
    return (
      <div className="loading">
        {loading}
      </div>
    );
  }
});

module.exports = Loading;
