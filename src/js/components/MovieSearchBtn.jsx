var MovieSearchBtn = React.createClass({
    render: function () {
        return (
            <button className="search-btn" onClick={this.props.doSearch}>搜索</button>
        );
    }
});

module.exports = MovieSearchBtn;
