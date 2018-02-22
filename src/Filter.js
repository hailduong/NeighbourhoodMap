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

		const filteredPlaceNodes = matchPlaces.map(item => <li key={item} tabIndex="1" onClick={this.handleLocationClick}
															   className="list-group-item">{item}</li>);

		const clearBtnIsHidden = !this.props.currentKeyword;
		return (
			<div className="filter">
				<div className="row mb-2">
					<div className="col-8">
						<h5>Filter</h5>
					</div>
					<div className={`col-4 text-right animated fadeIn ${clearBtnIsHidden ? 'hidden' : ""}`}>
						<a href="#"
						   tabIndex="1"
						   className="btn btn-outline-primary btn-sm"
						   onClick={this.clearFilter}>Clear</a>
					</div>
				</div>
				<form className="form-inline mb-3">
					<input value={this.props.currentKeyword}
						   tabIndex="1"
						   autoFocus={true}
						   className="form-control col-sm-12 input-lg" type="text"
						   placeholder="Location filter"
						   onChange={this.handleKeywordChange}/>
				</form>
				<ul className="list-group mb-4">
					{filteredPlaceNodes}
				</ul>
			</div>
		)
	}
} 