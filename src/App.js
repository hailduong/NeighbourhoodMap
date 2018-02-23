import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import Filter from "./Filter";
import Map from "./Map";
import PopularPlaces from "./PopularPlaces";


class App extends React.Component {
	
	constructor(){
		super();
		this.initServiceWorker();
	}

	state = {
		currentKeyword: "",
		popularPlaces: [],
		selectedCity: ""
	};

	setAppState = (state) => {
		this.setState(state);
	};

	initServiceWorker() {

		// Check if serviceWorker is available;
		if (!navigator.serviceWorker) return;

		// Register serviceWorker
		navigator.serviceWorker.register('/sw.js', {scope: "/"}).then((reg) => {
			console.log('Service Worker Registered');
		}).catch((err) => {
			console.log('Failed to register a Service Worker', err)
		})
	}
	
	render() {

		return (
			<div className="animated fadeIn">
				<Nav/>
				<div className="container-fluid">
					<div className="row">
						<aside className="col-lg-3 neighborhood-map__aside left-aside">
							<Filter setAppState={this.setAppState} currentKeyword={this.state.currentKeyword}/>
						</aside>
						<main role="main" className="col-lg-6 neighborhood-map__main">
							<Map setAppState={this.setAppState} currentKeyword={this.state.currentKeyword}/>
						</main>
						<aside className="col-lg-3 neighborhood-map__aside right-aside">
							<PopularPlaces popularPlaces={this.state.popularPlaces} selectedCity={this.state.selectedCity}/>
						</aside>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('.neighborhood-map'));