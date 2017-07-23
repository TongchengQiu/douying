'use strict';
// require('./Index.scss');

let Link = ReactRouter.Link;

let Loading = require('../../lib/components/Loading/Loading');

var Index = React.createClass({
  getInitialState: function() {
    return {
      data: null,
    };
  },
  getData: function() {
    reqwest({
      url: 'getNowMovie',
      method: 'post',
      type: 'json',
      success: function(resp) {
        this.setState({data: resp.listData});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getData();
  },
  itemClick: function() {

  },
  render: function() {
    let contNode = !this.state.data?
      <Loading color="#000" stl={1} />:
      this.state.data.map(function(item, idx) {
        return (
          <li key={'item'+idx} onClick={this.itemClick.bind(this, item.id)}>
            <img className="pic" src={item.picSrc} />
            <div className="bottom">
              <h2 className="title">{item.title}</h2>
              <span className="score">{item.score}</span>
            </div>
          </li>);
      }.bind(this));
    return (
      <div className="index">
        {contNode}
      </div>
    );
  }
});

module.exports = Index;
