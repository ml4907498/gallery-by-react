var React = require('react'),
	ReactDOM = require('react-dom'),
	
	GalleryApp = require('./components/GalleryApp.js'),
	mainCom = ReactDOM.render(
    <GalleryApp />,
    document.getElementById('app')
)
