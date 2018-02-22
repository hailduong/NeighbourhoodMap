import React from "react";

export default class PopularPlaces extends React.Component {
	render() {

		const placeNodes = this.props.popularPlaces.map(item => {
			return (
				<li key={item.id} className="list-group-item venue">
					<div classID="name"><strong>{item.name}</strong></div>
					<div className="address">{item.location.address}</div>
				</li>
			)
		});

		return (
			<div className="popular-places">
				<h5>Popular places in {this.props.selectedCity}</h5>
				<ul className="list-group">
					{placeNodes}
				</ul>
			</div>
		)
	}
}