import React from "react";
import {navbarHeight, marginBottom, isDesktop} from "./misc/misc";

export default class PopularPlaces extends React.Component {

	state = {
		tooltipInitiated: false
	};

	render() {

		if (this.props.popularPlaces.length === 0) return null;

		const titleHeight = 24;
		const widgetHeight = isDesktop ? $(window).height() - navbarHeight - marginBottom - titleHeight : "auto";

		const placeNodes = this.props.popularPlaces.map(item => {
			return (
				<li key={item.id} tabIndex="1" className="list-group-item venue animated fadeIn">
					<div classID="name"><strong>{item.name}</strong></div>
					<div className="address">{item.location.address}</div>
				</li>
			)
		});

		const refIconInfo = el => this.iconInfo = el;

		return (
			<div className="popular-places">
				<h5>Popular places in {this.props.selectedCity}
					<img tabIndex="1" ref={refIconInfo} className="icon-info" title="Data is retrieved from Foursquare"
						 src="/open-iconic/svg/info.svg"
						 alt="Info icon"/>
				</h5>
				<ul className="list-group shadow rounded" style={{height: widgetHeight}}>
					{placeNodes}
				</ul>
			</div>
		)
	}


	initTooltip = () => {
		if (!this.state.tooltipInitiated) {
			const iconInfoExists = !!this.iconInfo;
			if (iconInfoExists) {
				$(this.iconInfo).tooltip();
				this.setState({tooltipInitiated: true})
			}

		}
	};

	componentDidUpdate() {
		this.initTooltip();
	}
}