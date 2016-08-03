var React = require('react');


module.exports = React.createClass({
	handleClick:function(e){
		e.preventDefault();
		e.stopPropagation();

		if(this.props.isCenter){
        	this.props.inverse();  	
        }else{
        	this.props.center();
        }
	},
	render:function(){
		var unitClassName = 'controller-unit';
		var iconName = '';
		if(this.props.isCenter){
			unitClassName += ' is-center';
			iconName = 'fa fa-repeat';
		}
		if(this.props.isInverse){
			unitClassName += ' is-inverse';
		}
		return (	
			<span className = {unitClassName} onClick = {this.handleClick}><i className={iconName}></i></span>
		)
	}
})