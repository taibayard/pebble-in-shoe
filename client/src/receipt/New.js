import React, { Component } from 'react';

class New extends Component {

	constructor(props){
		super(props);
		this.state = {
			receiptData: {}
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// const apiURL = 'https://api.ocr.space/parse/image?language=eng&isOverlayRequired=true&apikey=f17fa6f07c88957&url='
		// const imgURL = 'http://cdn.newsapi.com.au/image/v1/b1b236b31ff63cb3a7a3ef82916f24c3?width=650'
		
		// let object = {method: post}
		// fetch((apiURL + imgURL), object).then(response => {
		// 	response.json().then(data => {
		// 		// Receipt data 
		// 		this.setState({receiptData: data});

		// 	})
		// })

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