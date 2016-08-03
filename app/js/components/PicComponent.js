var React = require('react');

module.exports = React.createClass({
	handleClick:function(event){
		event.stopPropagation();
        event.preventDefault();
        if(this.props.arrange.isCenter){
        	this.props.inverse();  	
        }else{
        	this.props.center();
        }
	},
	render:function(){
		var styleObj = {};
		if(this.props.arrange.pos)
			styleObj = this.props.arrange.pos;
		if(this.props.arrange.rotate)
			styleObj.transform = 'rotate('+this.props.arrange.rotate+'deg)';
		var imgClassName = this.props.arrange.isInverse ? 'is-inverse':'';
		return (
			<div  style = {styleObj} className={imgClassName} onClick={this.handleClick}>
				<div className =  'img-front'>
					<img src={this.props.data.fileSrc} alt={this.props.data.title}/>
					<h2 className='img-caption'>{this.props.data.title}</h2>
				</div>
				<div className = 'img-back'>{this.props.data.desc}</div>
			</div>
		)
	}
})