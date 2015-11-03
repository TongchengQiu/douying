var MovieSearchInput = React.createClass({
    handleChange: function (e) {
        var inputCont = e.target.value;
        this.props.setInputChange(inputCont);
    },
    render: function () {
        return (
            <input className="search-input" placeholder="请输入" onChange={this.handleChange.bind(this)}/>
        );
    }
});

module.exports = MovieSearchInput;
