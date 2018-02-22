import React from "react";
import {getMatchedPlaces, placesList, getLongLat} from "./misc/misc";

let map = null;

export default class Map extends React.Component {

	constructor() {
		super();
		this.markers = [];
		this.setMarkerTimeout = null;
	}

	render() {
		return (
			<div id="map"></div>
		)
	}

	setAppState = (state) => {
		this.props.setAppState(state)
	};

	initMap = () => {
		const vietnam = {lat: 14.0583, lng: 108.2772};
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 5,
			center: vietnam
		});

		Object.keys(placesList).forEach(place => {
			this.setMarker(place)
		})
	};

	setMarker = (place) => {
		const coordinates = getLongLat(place);
		const position = {lat: coordinates[0], lng: coordinates[1]};
		const map = this.map;
		const marker = new google.maps.Marker({
			position: position,
			map: map
		});

		this.markers.push(marker);

		// Bind event lisenters

		const params = $.param({
			client_id: "HFFF3KWZJWWRQFVE5MG0HLB5MGLBKKPLZLNCBSQHS4IHU12T",
			client_secret: "U21OHD13QXZ0FUO0AXU4VQ5CTNJ5VAIF3TIMIWISTNJWO00N",
			v: "20180220",
			near: place
		});

		marker.addListener('click', () => {
			// Fetch information of this place
			fetch(`https://api.foursquare.com/v2/venues/search?${params}`)
				.then(data => data.json())
				.then((data) => this.setAppState({
					popularPlaces: data.response.venues,
					selectedCity: place
				}))
		})
	};

	clearAllMarkers = () => {
		this.markers.forEach(marker => marker.setMap(null))
	};

	componentDidMount() {
		// Expose the init map function
		window.initMap = this.initMap;
	}

	setMarkers() {

		// Set timeout to add a little delay when users type.

		if (!!this.setMarkerTimeout) clearTimeout(this.setMarkerTimeout);

		this.setMarkerTimeout = setTimeout(() => {
			this.clearAllMarkers();
			const currentKeyword = this.props.currentKeyword;
			const matchedPlaces = getMatchedPlaces(currentKeyword);
			matchedPlaces.forEach(place => this.setMarker(place))
		}, 300)
	}

	componentDidUpdate() {
		this.setMarkers();
	}
} 