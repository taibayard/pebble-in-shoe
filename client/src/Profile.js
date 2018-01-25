import React, { Component } from 'react';


//let testData = [{food: 14}, {electronics: 50}, {food: 10}, {clothes: 12}, {electronics: 23}]
let testData = [ {cat: "food", total: "50"}, {cat: "electronics", total: "44"}, {cat: "food", total: "10"}, {cat: "clothes", total: "12"}, {cat: "electornics", total: "23"}];



class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryData: {},
      category: [],
      catTotals: []
    }
  }

  componentDidMount(){
    fetch('/').then(function(response){
      return response.json();
    }).then(function(json){

      let categoryList = this.state.category.slice();

      this.setState({categoryData: json}, function() {
         for(let i=0; i<this.state.categoryData.length; i++) {
            let cat = categoryData[i].cat;
            for( let j=0; j<categoryList.length; j++) {
               if( cat!== categoryList[j]) {
                  categoryList.push(cat);
               }
            }
         }
         this.setState({category: categoryList}, function() {
            getCategoryTotals();
         });
      });
    })
  }


  getCategoryTotals = () => {
     let catState = [];
     for( let j=0; j<this.state.category.length; j++) {
        let total=0;
        for(let i=0; i<this.state.categoryData.length) {
           if( this.state.category[j] === this.state.categoryData[j].cat) {
             total += this.state.categoryData[j].total;
          }
        }
        catState.push({ cat: this.state.category[j], total: total});
     }

   this.setState({catTotals: catState});
 }

  render(){
    if(this.props.user && this.props.user.name){
      return (
        <div>

          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <div className="resultsHeader">
            <div className="resultsTable">
              <h2> Total # of Receipts: {this.state.categoryData.length}</h2>
              <h2> </h2>
              <Categories category={this.state.catTotals} />
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
      <h2> {c.cat} : {c.total} </h2>
    })}
    </div>
  )
}

export default Profile;
