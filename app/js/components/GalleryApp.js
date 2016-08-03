var React = require('react'),
    ReactDOM = require('react-dom'),
    ImgDatas = require('../../data/imgDatas.json'),
    PicComponent = require('./PicComponent.js'),
    ControllerUnit = require('./ControllerUnit.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            imgsArrangeArr: [{
                // pos:{
                // 	left:'0',
                // 	top:'0'
                // },
                // rotate:0,  旋转角度
                // isInverse:false  图片正反面
                // isCenter:false  图片正反面
            }]
        }
    },
    getRangeRandom: function(low, high) {
        return Math.floor(Math.random() * (high - low) + low)
    },
    get30DegRandom: function() {
        return Math.floor(Math.random() * 60) - 30
    },
    getImgDatas: function(data) {
        var imgArr = data;
        imgArr.forEach(function(img) {
            img.fileSrc = '/app/imgs/' + img.fileName;
        });
        return imgArr;
    },

    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: {
            leftSecX: [0, 0],
            rightSeX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    },
    inverse: function(index) {
        return function() {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !this.state.imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    },
    center: function(index) {
        return function() {
            this.rearrange(index);
        }.bind(this);
    },
    rearrange: function(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange;


        //布局中间图片
        var centerImgArr = imgsArrangeArr.splice(centerIndex, 1);
        centerImgArr[0] = {
            pos: centerPos,
            rotate: 0,
            isInverse: false,
            isCenter: true,
        }

        //布局上侧图片
        var topNum = Math.floor(Math.random() * 2);
        // console.log( vPosRange);

        var topImgIdex = Math.floor(Math.random() * imgsArrangeArr.length);
        var topImgArr = imgsArrangeArr.splice(topImgIdex, topNum);
        topImgArr.forEach(function(value, index) {
            value.pos = {
                top: this.getRangeRandom(vPosRange.topY[0], vPosRange.topY[1]),
                left: this.getRangeRandom(vPosRange.x[0], vPosRange.x[1])
            }
            value.rotate = this.get30DegRandom();
            value.isCenter = false;
            value.isInverse = false;
        }.bind(this));
        //布局两侧图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPos = i < k ? hPosRange.leftSecX : hPosRange.rightSeX;
            // console.log(imgsArrangeArr[i]);
            imgsArrangeArr[i].pos = {
                left: this.getRangeRandom(hPos[0], hPos[1]),
                top: this.getRangeRandom(hPosRange.y[0], hPosRange.y[1])
            }
            imgsArrangeArr[i].rotate = this.get30DegRandom();
            imgsArrangeArr[i].isCenter = false;
            imgsArrangeArr[i].isInverse = false;
        };
        //合并Arr
        if (topNum) {
            imgsArrangeArr.splice(topImgIdex, 0, topImgArr[0]);
        };
        imgsArrangeArr.splice(centerIndex, 0, centerImgArr[0]);
        // console.log(imgsArrangeArr);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });


    },
    componentDidMount: function() {
        var stageDOM = this.refs.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        var imgDOM = ReactDOM.findDOMNode(this.refs.img0),
            imgW = imgDOM.scrollWidth,
            imgH = imgDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH,
            zIndex: 10,
        };

        //计算左侧、右侧区域的排布范围
        this.Constant.hPosRange.leftSecX[0] = 0 - halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSeX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSeX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算上侧区域的排布范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(Math.floor(Math.random() * 16));
    },
    render: function() {
        var pictures = [];
        var controllerUnits = [];
        this.getImgDatas(ImgDatas).forEach(function(img, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            pictures.push(<PicComponent data = {img} inverse = {this.inverse(index)} center = {this.center(index)} arrange={this.state.imgsArrangeArr[index]} ref = {'img' + index} key = {index}/>);
        	controllerUnits.push(<ControllerUnit inverse = {this.inverse(index)} center = {this.center(index)} key = {index} isCenter={this.state.imgsArrangeArr[index].isCenter} isInverse={this.state.imgsArrangeArr[index].isInverse}/>)
        }.bind(this));
        return (
            <div className='stage' ref='stage'>
				<div className = 'img-sec'>
					{pictures}
				</div>
				<nav className = 'controller-nav'>
					{controllerUnits}
				</nav>
			</div>
        )
    },
})
