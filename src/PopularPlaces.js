import React from "react";
import {navbarHeight, marginBottom, isDesktop} from "./misc/misc";

export default class PopularPlaces extends React.Component {
	render() {

		if (this.props.popularPlaces.length === 0) return null;

		const titleHeight = 24;
		const widgetHeight = isDesktop ? $(window).height() - navbarHeight - marginBottom - titleHeight : "auto";

		const placeNodes = this.props.popularPlaces.map(item => {
			return (
				<li key={item.id} className="list-group-item venue animated fadeIn">
					<div classID="name"><strong>{item.name}</strong></div>
					<div className="address">{item.location.address}</div>
				</li>
			)
		});

		return (
			<div className="popular-places">
				<h5>Popular places in {this.props.selectedCity}</h5>
				<ul className="list-group shadow rounded" style={{height: widgetHeight}}>
					{placeNodes}
				</ul>
			</div>
		)
	}
}