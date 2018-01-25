import React, { Component } from 'react';


let testData = [{food: 14}, {electronics: 50}, {food: 10}, {clothes: 12}, {electronics: 23}]


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryData: {},
      category: []
    }
  }

  componentDidMount(){
    fetch('/').then(function(response){
      return response.json();
    }).then(function(json){
      this.setState({categoryData: json})
    })
      

  }


  render(){
    if(this.props.user && this.props.user.name){
      return (
        <div>

          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <div className="resultsHeader">
            <div className="resultsTable">
              <h2> Total # of Receipts: </h2>
              <h2> </h2>
              <Categories category={this.state.category} />
            </div>
          </div>


        </div>);
    }
    else {
      return (<p>You need to be logged in to view it.</p>);
    }
  }
}

const Categories = (props) => {

  return (
    <div className="categoryTotals">
    {props.category.map(c => {
      <h2> {c.name} : {c.total} </h2>
    })}
    </div>
  )
}

export default Profile;
