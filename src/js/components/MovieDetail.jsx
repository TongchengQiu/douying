var MovieDetail = React.createClass({
    getInitialState: function () {
        return {
            data: null,
        };
    },
    getData: function() {
        var id = this.props.detailId;
        $.ajax({
            url: "/detail",
            type: "POST",
            dataType: "json",
            data: {id: id},
            success: function(data) {
                if(data.status === 0) {
                    this.setState({data: data.data});
                    console.log(data.data);
                }
            }.bind(this),
        });
    },
    componentWillMount: function () {
        this.getData();
    },
    render: function () {

        if(this.state.data) {
            var imgNodes = this.state.data.picGroup.map(function(src) {
                return (
                    <img src={src} />
                );
            });
        }

        return (
            <div className="detail-wrap">
                {
                    !this.state.data?
                    <div className="loading">
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>:
                    <div className="item">
                        <div className="til">
                            <img className="left" src={this.state.data.mainpic} />
                            <div className="right">
                                <h1 className="name">{this.state.data.name}</h1>
                                <div className="score">评分：{this.state.data.score}</div>
                            </div>
                        </div>

                        <div className="director v"><span>导演：</span>{this.state.data.director}</div>
                        <div className="editor v"><span>编剧：</span>{this.state.data.editor}</div>
                        <div className="actor v"><span>主演：</span>{this.state.data.actor}</div>
                        <div className="genre v"><span>类型：</span>{this.state.data.genre}</div>
                        <div className="date v"><span>上映日期：</span>{this.state.data.date}</div>
                        <div className="runtime v"><span>片长：</span>{this.state.data.runtime}</div>

                        <div className="report">
                            <div className="tag">剧情简介：</div>
                            <div className="cont">
                                {this.state.data.report}
                            </div>
                        </div>

                        <div className="imgGroup">{imgNodes}</div>
                    </div>
            }
            </div>
        );
    }
});

module.exports = MovieDetail;
