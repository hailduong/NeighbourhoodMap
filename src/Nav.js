import React from "react";

export default class Nav extends React.Component {
	render() {
		return (
			<nav role="navigation" className="navbar navbar-expand-lg navbar-light neighborhood-map__navbar shadow mb-4">
				<h1><a tabIndex="-1" className="navbar-brand" href="#">Neighbourhood<strong>Map</strong></a></h1>
			</nav>
		)
	}
} 