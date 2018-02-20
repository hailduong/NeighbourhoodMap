import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import Filter from "./Filter";
import Map from "./Map";



class App extends React.Component {

	state = {
		currentKeyword: ""
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
						<main className="col-sm-9 neighborhood-map__main">
							<Map currentKeyword={this.state.currentKeyword}/>
						</main>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('.neighborhood-map'));