import React, { Component } from 'react';
import {Link} from "react-router-dom";

// here is where you can put the image links - then match name of button to one of the positions in the array
const imgURL = ['http://cdn.newsapi.com.au/image/v1/b1b236b31ff63cb3a7a3ef82916f24c3?width=650',
'http://adam.piettes.com/temp/wdi-hackathon/20180124_223047.jpg',
 'http://adam.piettes.com/temp/wdi-hackathon/20180124_223258.jpg',
  'http://adam.piettes.com/temp/wdi-hackathon/20180124_223157.jpg',
   'http://adam.piettes.com/temp/wdi-hackathon/20180124_223117.jpg'];
const apiURL = 'https://api.ocr.space/parse/image'


class NewReceipt extends Component {

	constructor(props){
		super(props);
		this.state = {
			dataSubmitted: false,
			imageSource: ""
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();


		// set this equal to whatever image url matches the button pressed
		// and use this in the formData Object
		const img = ''


		//Prepare form data
		var formData = new FormData();
		//formData.append("file", fileToUpload);
		let link= (this.state.imageSource||imgURL[0]);
		formData.append("url", link);
		formData.append("language"   , "eng");
		formData.append("apikey"  , "f17fa6f07c88957");
		formData.append("isOverlayRequired", 'true');

		console.log(formData);

		let object = {
			method: 'post',
			body: formData
		}
		//Send OCR Parsing request asynchronously
		fetch(apiURL, object).then((response) => {
			return response.json();
			console.log('response', response.json());
		}).then( (json) => {
				// Receipt data
				console.log('json', json);

				this.setState({dataSubmitted: true});
				localStorage.setItem("resData",JSON.stringify(json));
				this.props.getReceiptData(json);

		}).catch((err) => {
			console.log('JSON error', err);
			this.props.setFlash("error","JSON error :"+err);
		})

		console.log('An image was submitted');
	}

	imageSourceChange = (e) => {
		e.preventDefault();

		let i=imgURL[parseInt(e.target.id)];
		this.setState({imageSource: i });
	}

	componentDidMount(){
		this.setState({
			dataSubmitted:false
		});
	}

	render() {
		return(
			<div>
				<h1> Choose receipt image:</h1>
				<div id="receiptButtons">
				<input value="Test Receipt 1" name="receipt1" type="submit" className="btn-primary" onClick={this.imageSourceChange} id="0"/>
				<input value="Test Receipt 2" name="receipt2" type="submit" className="btn-primary" onClick={this.imageSourceChange} id="1"/>
				<input value="Test Receipt 3" name="receipt3" type="submit" className="btn-primary" onClick={this.imageSourceChange} id="2"/>
				<input value="Test Receipt 4" name="receipt4" type="submit" className="btn-primary" onClick={this.imageSourceChange} id="3"/>
				<input value="Test Receipt 5" name="receipt5" type="submit" className="btn-primary" onClick={this.imageSourceChange} id="4"/>
				</div>
				<img src={this.state.imageSource} width="700" />
				<form onSubmit={this.handleSubmit}>
					<label>Image: 
					<input type="file" name="pic" id="pic" />
					</label>
					<br/>
					<input value="Submit" type="submit" className="btn-secondary" />
				</form>
			</div>
		);
	}
}

export default NewReceipt;
