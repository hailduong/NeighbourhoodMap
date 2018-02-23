import React from "react";
import {getMatchedPlaces, placesList, getLongLat, navbarHeight, marginBottom, isDesktop} from "./misc/misc";
import swal from "sweetalert";

let map = null;

export default class Map extends React.Component {

	constructor() {
		super();
		this.markers = [];
		this.matchedPlaces = Object.keys(placesList); // Since we set it to all places for the initial state
		this.setMarkerTimeout = null;
	}

	componentDidMount() {
		// Expose the init map function
		window.initMap = this.initMap;
	}

	componentDidUpdate() {
		this.setMarkers();
	}

	setAppState = (state) => {
		this.props.setAppState(state)
	};

	initMap = () => {
		const vietnam = {lat: 16.4498, lng: 107.5624};

		if (typeof google === "undefined") {
			swal("Could not load Google Map.", "Please reload page or try again later", "error");
			return
		}

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

		if (typeof google === "undefined") {
			swal("Could not load Google Map.", "Please reload page or try again later", "error");
			return
		}

		const marker = new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP
		});

		this.markers.push(marker);

		// Bind event listeners
		const params = $.param({
			client_id: "HFFF3KWZJWWRQFVE5MG0HLB5MGLBKKPLZLNCBSQHS4IHU12T",
			client_secret: "U21OHD13QXZ0FUO0AXU4VQ5CTNJ5VAIF3TIMIWISTNJWO00N",
			v: "20180220",
			near: place
		});

		// TODO: Scroll down to the detail section on mobile
		marker.addListener('click', () => {
			// Bounce the marker
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(() => {
				marker.setAnimation(null)
			}, 1000);

			if (!!fetch) {
				// Fetch information of this place
				fetch(`https://api.foursquare.com/v2/venues/search?${params}`)
					.then(data => data.json())
					.then((data) => {
							this.setAppState({
								popularPlaces: data.response.venues,
								selectedCity: place
							});
						}
					)
					.catch(error => {
						console.log('ERROR: ', error);
						swal("Oops", "Failed to get data for this location. Please try again", "error")
					})
			 } else {
				swal("Your browser does not support fetching data.", "Please upgrade to the latest version!", "error")
			}
			
		})
	};

	clearAllMarkers = () => {
		this.markers.forEach(marker => marker.setMap(null))
	};

	setMarkers() {

		// Set timeout to add a little delay when users type.
		if (!!this.setMarkerTimeout) clearTimeout(this.setMarkerTimeout);

		this.setMarkerTimeout = setTimeout(() => {
			const currentKeyword = this.props.currentKeyword;
			const matchedPlaces = getMatchedPlaces(currentKeyword);
			const matchedPlacesHaveChanged = JSON.stringify(matchedPlaces) !== JSON.stringify(this.matchedPlaces);
			this.matchedPlaces = matchedPlaces;

			// Only set the markers, if they have changed.
			if (matchedPlacesHaveChanged) {
				this.clearAllMarkers();
				matchedPlaces.forEach(place => this.setMarker(place))
			}
		}, 300)
	}

	render() {
		const mapHeight = isDesktop ? $(window).height() - navbarHeight - marginBottom : "auto";
		const styles = {height: mapHeight};

		return (
			<div role='application' className="shadow mb-4" id="map" style={styles}></div>
		)
	}
} 