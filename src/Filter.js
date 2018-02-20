import React from "react";
import {getMatchedPlaces} from "./misc/misc";

export default class Filter extends React.Component {

	state = {
		currentKeyword: ""
	};

	setAppState = (state) => {
		this.props.setAppState(state);
	};

	handleKeywordChange = (e) => {
		const value = e.target.value;
		this.setAppState({currentKeyword: value})
	};

	handleLocationClick = (e) => {
		const value = e.target.innerText;
		this.setAppState({currentKeyword: value})
	};

	clearFilter = () => {
		this.setAppState({currentKeyword: ""})
	};

	render() {

		const currentKeyword = this.props.currentKeyword;
		const matchPlaces = getMatchedPlaces(currentKeyword);

		const filteredPlaceNodes = matchPlaces.map(item => <li key={item} onClick={this.handleLocationClick}
															   className="list-group-item">{item}</li>);

		return (
			<div className="filter mt-3">
				<form className="form-inline mb-3">
					<input value={this.props.currentKeyword}
						   className="form-control col-sm-8" type="text"
						   placeholder="Location filter"
						   onChange={this.handleKeywordChange}/>
					<button type="button" className="btn btn-light col-sm-4"
							onClick={this.clearFilter}>Clear
					</button>
				</form>
				<ul className="list-group">
					{filteredPlaceNodes}
				</ul>
			</div>
		)
	}
} 