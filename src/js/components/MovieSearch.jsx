var MovieSearchInput = require('./MovieSearchInput.jsx');
var MovieSearchBtn = require('./MovieSearchBtn.jsx');

var MovieSearch = React.createClass({
    getInitialState: function () {
        return {
            inputCont: "",
        };
    },
    doSearch: function () {
        var cont = this.state.inputCont;
        if(cont === "") {
            return ;
        }
        this.props.doSearch(cont);
    },
    setInputChange: function (cont) {
        this.setState({inputCont: cont});
    },
    render: function () {
        return (
            <div className="search-wrap">
                <div className="search-group">
                    <MovieSearchInput setInputChange={this.setInputChange.bind(this)} />
                    <MovieSearchBtn doSearch={this.doSearch.bind(this)} />
                </div>
            </div>
        );
    }
});

module.exports = MovieSearch;
