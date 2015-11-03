var MovieList = React.createClass({
    handleClick: function (id) {
        this.props.showDetail(id);
    },
    render: function () {
        var j = 0;
        var listNodes = this.props.listData.map(function (data) {
            return (
                <li key={j++} onClick={this.handleClick.bind(this, data.id)}>
                    <img className="pic" src={data.picSrc} />
                    <div className="bottom">
                        <h2 className="title">{data.title}</h2>
                        <span className="score">{data.score}</span>
                    </div>
                </li>
            );
        }.bind(this));
        var nowTil = "最新上映";
        if(this.props.nowPage == "search") {
            nowTil = "搜索结果";
        }
        return (
            <div className="list-wrap">
                <h1>{nowTil}:</h1>
                {
                    listNodes.length === 0 && this.props.searchR ?
                    <div className="loading">
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>
                    :<ul className="detail">{listNodes}</ul>
                }
                {
                    !this.props.searchR ?
                    <div className="no-find">没有找到~~~</div>:
                    null
                }
            </div>
        );
    }
});

module.exports = MovieList;
