import React, { Component } from 'react';

class New extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		// POST ROUTE
		alert('An image was submitted');
	}

	render() {
		return(
		<div>
		<h1> Enter your receipt image here.</h1>
		<img src="../img/test_receipt.jpg" alt="Receipt"></img>
		<form onSubmit={this.handleSubmit}>
			<label>Image: </label>
			<br/>
			<input type="file" name="pic" id="pic" />
			<br/>
			<input type="submit" value="New Receipt" className="btn-primary" />
		</form>
		</div>
		);
	}
}

export default New;