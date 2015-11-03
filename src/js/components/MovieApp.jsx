var MovieSearch = require('./MovieSearch.jsx');
var MovieList = require('./MovieList.jsx');

var MovieDetail = require('./MovieDetail.jsx');

var MovieApp = React.createClass({
    getInitialState: function () {
        return {
            nowPage: "nowMovie",
            listData: [],
            searchR: true,
            detailId: null,
        };
    },
    getNowMovieData: function () {
        $.ajax({
            url: "/getNowMovie",
            type: "POST",
            success: function (data) {
                var _listData = data.listData;
                this.setState({listData: _listData});
            }.bind(this),
        });
    },
    componentWillMount: function () {
        this.getNowMovieData();
    },
    doSearch: function (cont) {
        this.setState({listData: []});
        this.setState({nowPage: "search"});
        this.setState({searchR: true});
        if( cont !== "" ) {
            $.ajax({
                url: "/search",
                type: "POST",
                dataType: "json",
                data: {cont: cont},
                success: function(data) {
                    if(data.status === 0) {
                        var _listData = data.listData;
                        this.setState({listData: _listData});
                    } else if(data.status == 1) {
                        this.setState({searchR: false});
                    }
                }.bind(this),
            });
        }
    },
    showDetail: function (id) {
        this.setState({detailId: id}, function() {
            this.setState({nowPage: "detail"});
        });
    },
    render: function () {
        if(this.state.nowPage == "detail") {
            return (
                <div>
                    <MovieSearch doSearch={this.doSearch} showDetail={this.showDetail.bind(this)} />
                    <MovieDetail detailId={this.state.detailId} />
                </div>
            );
        }
        return (
            <div>
                <MovieSearch doSearch={this.doSearch} showDetail={this.showDetail.bind(this)} />
                <MovieList nowPage={this.state.nowPage} searchR={this.state.searchR} listData={this.state.listData} showDetail={this.showDetail.bind(this)} />
            </div>
        );
    }
});

module.exports = MovieApp;
