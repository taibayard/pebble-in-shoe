import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class NewReceipt extends Component {

	constructor(props){
		super(props);
		this.state = {
			receiptData: {},
			dataSubmitted: false
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const apiURL = 'https://api.ocr.space/parse/image'
		const imgURL = 'http://cdn.newsapi.com.au/image/v1/b1b236b31ff63cb3a7a3ef82916f24c3?width=650'

		

		//Prepare form data
		var formData = new FormData();
		//formData.append("file", fileToUpload);
		formData.append("url", imgURL);
		formData.append("language"   , "eng");
		formData.append("apikey"  , "f17fa6f07c88957");
		formData.append("isOverlayRequired", 'true');

		let object = {
			method: 'post', 
			body: formData
		}
		let base = this; 
		//Send OCR Parsing request asynchronously
		fetch(apiURL, object).then(response => {
			return response.json();
			console.log('response', response.json());
		}).then(json => {
				// Receipt data
				console.log('json', json);
				base.props.getReceiptData(json);
				// redirect to Tai's page
		}).catch((err) => {
			console.log('JSON error', err);
		})

		this.setState({dataSubmitted: true});

		console.log('An image was submitted');
	}

	render() {

		if (this.props.reset && this.state.dataSubmitted===true) {
			this.setState({ dataSubmitted: false});
		}

		if (this.state.dataSubmitted) {
			return (<Redirect to="/confirmation" />);
		}

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

export default NewReceipt;
