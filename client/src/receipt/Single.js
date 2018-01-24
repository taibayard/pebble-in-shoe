import React, { Component } from 'react';

class Single extends Component {
	render() {
		return(
		<div>
		<h1> Here is your receipt:</h1>
		<img id="testImage" src="../img/test_receipt.jpg" alt="Receipt"></img>
		<h2> Here are the items on your receipt: </h2>

		</div>
		);
	}
}

export default Single;