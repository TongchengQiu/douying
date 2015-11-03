(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MovieSearch = require('./MovieSearch.jsx');
var MovieList = require('./MovieList.jsx');

var MovieDetail = require('./MovieDetail.jsx');

var MovieApp = React.createClass({
    displayName: 'MovieApp',

    getInitialState: function getInitialState() {
        return {
            nowPage: "nowMovie",
            listData: [],
            searchR: true,
            detailId: null
        };
    },
    getNowMovieData: function getNowMovieData() {
        $.ajax({
            url: "/getNowMovie",
            type: "POST",
            success: (function (data) {
                var _listData = data.listData;
                this.setState({ listData: _listData });
            }).bind(this)
        });
    },
    componentWillMount: function componentWillMount() {
        this.getNowMovieData();
    },
    doSearch: function doSearch(cont) {
        this.setState({ listData: [] });
        this.setState({ nowPage: "search" });
        this.setState({ searchR: true });
        if (cont !== "") {
            $.ajax({
                url: "/search",
                type: "POST",
                dataType: "json",
                data: { cont: cont },
                success: (function (data) {
                    if (data.status === 0) {
                        var _listData = data.listData;
                        this.setState({ listData: _listData });
                    } else if (data.status == 1) {
                        this.setState({ searchR: false });
                    }
                }).bind(this)
            });
        }
    },
    showDetail: function showDetail(id) {
        this.setState({ detailId: id }, function () {
            this.setState({ nowPage: "detail" });
        });
    },
    render: function render() {
        if (this.state.nowPage == "detail") {
            return React.createElement(
                'div',
                null,
                React.createElement(MovieSearch, { doSearch: this.doSearch, showDetail: this.showDetail.bind(this) }),
                React.createElement(MovieDetail, { detailId: this.state.detailId })
            );
        }
        return React.createElement(
            'div',
            null,
            React.createElement(MovieSearch, { doSearch: this.doSearch, showDetail: this.showDetail.bind(this) }),
            React.createElement(MovieList, { nowPage: this.state.nowPage, searchR: this.state.searchR, listData: this.state.listData, showDetail: this.showDetail.bind(this) })
        );
    }
});

module.exports = MovieApp;

},{"./MovieDetail.jsx":2,"./MovieList.jsx":3,"./MovieSearch.jsx":4}],2:[function(require,module,exports){
"use strict";

var MovieDetail = React.createClass({
    displayName: "MovieDetail",

    getInitialState: function getInitialState() {
        return {
            data: null
        };
    },
    getData: function getData() {
        var id = this.props.detailId;
        $.ajax({
            url: "/detail",
            type: "POST",
            dataType: "json",
            data: { id: id },
            success: (function (data) {
                if (data.status === 0) {
                    this.setState({ data: data.data });
                    console.log(data.data);
                }
            }).bind(this)
        });
    },
    componentWillMount: function componentWillMount() {
        this.getData();
    },
    render: function render() {

        if (this.state.data) {
            var imgNodes = this.state.data.picGroup.map(function (src) {
                return React.createElement("img", { src: src });
            });
        }

        return React.createElement(
            "div",
            { className: "detail-wrap" },
            !this.state.data ? React.createElement(
                "div",
                { className: "loading" },
                React.createElement(
                    "div",
                    { className: "spinner" },
                    React.createElement("div", { className: "rect1" }),
                    React.createElement("div", { className: "rect2" }),
                    React.createElement("div", { className: "rect3" }),
                    React.createElement("div", { className: "rect4" }),
                    React.createElement("div", { className: "rect5" })
                )
            ) : React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "div",
                    { className: "til" },
                    React.createElement("img", { className: "left", src: this.state.data.mainpic }),
                    React.createElement(
                        "div",
                        { className: "right" },
                        React.createElement(
                            "h1",
                            { className: "name" },
                            this.state.data.name
                        ),
                        React.createElement(
                            "div",
                            { className: "score" },
                            "评分：",
                            this.state.data.score
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "director v" },
                    React.createElement(
                        "span",
                        null,
                        "导演："
                    ),
                    this.state.data.director
                ),
                React.createElement(
                    "div",
                    { className: "editor v" },
                    React.createElement(
                        "span",
                        null,
                        "编剧："
                    ),
                    this.state.data.editor
                ),
                React.createElement(
                    "div",
                    { className: "actor v" },
                    React.createElement(
                        "span",
                        null,
                        "主演："
                    ),
                    this.state.data.actor
                ),
                React.createElement(
                    "div",
                    { className: "genre v" },
                    React.createElement(
                        "span",
                        null,
                        "类型："
                    ),
                    this.state.data.genre
                ),
                React.createElement(
                    "div",
                    { className: "date v" },
                    React.createElement(
                        "span",
                        null,
                        "上映日期："
                    ),
                    this.state.data.date
                ),
                React.createElement(
                    "div",
                    { className: "runtime v" },
                    React.createElement(
                        "span",
                        null,
                        "片长："
                    ),
                    this.state.data.runtime
                ),
                React.createElement(
                    "div",
                    { className: "report" },
                    React.createElement(
                        "div",
                        { className: "tag" },
                        "剧情简介："
                    ),
                    React.createElement(
                        "div",
                        { className: "cont" },
                        this.state.data.report
                    )
                ),
                React.createElement(
                    "div",
                    { className: "imgGroup" },
                    imgNodes
                )
            )
        );
    }
});

module.exports = MovieDetail;

},{}],3:[function(require,module,exports){
"use strict";

var MovieList = React.createClass({
    displayName: "MovieList",

    handleClick: function handleClick(id) {
        this.props.showDetail(id);
    },
    render: function render() {
        var j = 0;
        var listNodes = this.props.listData.map((function (data) {
            return React.createElement(
                "li",
                { key: j++, onClick: this.handleClick.bind(this, data.id) },
                React.createElement("img", { className: "pic", src: data.picSrc }),
                React.createElement(
                    "div",
                    { className: "bottom" },
                    React.createElement(
                        "h2",
                        { className: "title" },
                        data.title
                    ),
                    React.createElement(
                        "span",
                        { className: "score" },
                        data.score
                    )
                )
            );
        }).bind(this));
        var nowTil = "最新上映";
        if (this.props.nowPage == "search") {
            nowTil = "搜索结果";
        }
        return React.createElement(
            "div",
            { className: "list-wrap" },
            React.createElement(
                "h1",
                null,
                nowTil,
                ":"
            ),
            listNodes.length === 0 && this.props.searchR ? React.createElement(
                "div",
                { className: "loading" },
                React.createElement(
                    "div",
                    { className: "spinner" },
                    React.createElement("div", { className: "rect1" }),
                    React.createElement("div", { className: "rect2" }),
                    React.createElement("div", { className: "rect3" }),
                    React.createElement("div", { className: "rect4" }),
                    React.createElement("div", { className: "rect5" })
                )
            ) : React.createElement(
                "ul",
                { className: "detail" },
                listNodes
            ),
            !this.props.searchR ? React.createElement(
                "div",
                { className: "no-find" },
                "没有找到~~~"
            ) : null
        );
    }
});

module.exports = MovieList;

},{}],4:[function(require,module,exports){
'use strict';

var MovieSearchInput = require('./MovieSearchInput.jsx');
var MovieSearchBtn = require('./MovieSearchBtn.jsx');

var MovieSearch = React.createClass({
    displayName: 'MovieSearch',

    getInitialState: function getInitialState() {
        return {
            inputCont: ""
        };
    },
    doSearch: function doSearch() {
        var cont = this.state.inputCont;
        if (cont === "") {
            return;
        }
        this.props.doSearch(cont);
    },
    setInputChange: function setInputChange(cont) {
        this.setState({ inputCont: cont });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'search-wrap' },
            React.createElement(
                'div',
                { className: 'search-group' },
                React.createElement(MovieSearchInput, { setInputChange: this.setInputChange.bind(this) }),
                React.createElement(MovieSearchBtn, { doSearch: this.doSearch.bind(this) })
            )
        );
    }
});

module.exports = MovieSearch;

},{"./MovieSearchBtn.jsx":5,"./MovieSearchInput.jsx":6}],5:[function(require,module,exports){
"use strict";

var MovieSearchBtn = React.createClass({
    displayName: "MovieSearchBtn",

    render: function render() {
        return React.createElement(
            "button",
            { className: "search-btn", onClick: this.props.doSearch },
            "搜索"
        );
    }
});

module.exports = MovieSearchBtn;

},{}],6:[function(require,module,exports){
"use strict";

var MovieSearchInput = React.createClass({
    displayName: "MovieSearchInput",

    handleChange: function handleChange(e) {
        var inputCont = e.target.value;
        this.props.setInputChange(inputCont);
    },
    render: function render() {
        return React.createElement("input", { className: "search-input", placeholder: "请输入", onChange: this.handleChange.bind(this) });
    }
});

module.exports = MovieSearchInput;

},{}],7:[function(require,module,exports){
'use strict';

var MovieApp = require('./components/MovieApp.jsx');

React.render(React.createElement(MovieApp, null), document.getElementById('app'));

},{"./components/MovieApp.jsx":1}]},{},[7]);
