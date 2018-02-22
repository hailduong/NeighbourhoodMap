import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import Filter from "./Filter";
import Map from "./Map";
import PopularPlaces from "./PopularPlaces";


class App extends React.Component {

	state = {
		currentKeyword: "",
		popularPlaces: [],
		selectedCity: ""
	};

	setAppState = (state) => {
		this.setState(state);
	};

	render() {

		return (
			<div>
				<Nav/>
				<div className="container-fluid">
					<div className="row">
						<aside className="col-sm-3 neighborhood-map__aside">
							<Filter setAppState={this.setAppState} currentKeyword={this.state.currentKeyword}/>
						</aside>
						<main className="col-sm-6 neighborhood-map__main">
							<Map setAppState={this.setAppState} currentKeyword={this.state.currentKeyword}/>
						</main>
						<aside className="col-sm-3 neighborhood-map__right-aside">
							<PopularPlaces popularPlaces={this.state.popularPlaces} selectedCity={this.state.selectedCity}/>
						</aside>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('.neighborhood-map'));