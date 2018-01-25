import React, { Component } from 'react';
import RC2 from 'react-chartjs2';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryData: {},
      category: [],
      catTotals: []
    }
  }

  componentDidMount = () => {
    var base = this; 
    fetch('/receipts').then(function(response){
      if(!response) {
        return null;
      }

      return response.json();
    }).then(function(response){
      
      let categoryList = base.state.category.slice();

      base.setState({categoryData: response}, function() {
         for(let i=0; i<base.state.categoryData.length; i++) {
            let cat = base.state.categoryData[i].cat;
            let match= false;
            for( let j=0; j<categoryList.length; j++) {
               if( cat== categoryList[j]) match=true;
            }
            if(!match) {
              categoryList.push(cat);
            }
         }
         
         base.setState({category: categoryList}, function() {
          
            base.getCategoryTotals(base);
         });
      });
    })
  }


  getCategoryTotals = (base) => {
    console.log('test cat state', base.state.category)
     let catState = [];
     for( let j=0; j<base.state.category.length; j++) {
        let total=0;
        for(let i=0; i<base.state.categoryData.length; i++) {
           if( base.state.category[j] === base.state.categoryData[i].cat) {
             total += Number(base.state.categoryData[i].total);
          }
        }
        catState.push({ cat: base.state.category[j], total: total});
     }

   base.setState({catTotals: catState});
 }

  render(){

    if(this.props.user && this.props.user.name){
      return (
        <div>
          <div className="resultsHeader">
            <div className="resultsTable">
              <h2> # of Receipts Logged: {this.state.categoryData.length}</h2>
              <CatGraph chartdata = {this.state.catTotals} />
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
  console.log(props.category);
  return (
    <div className="categoryTotals">
    {props.category.map((c) => (
      <div classNamr="singleCategory">
      <h3> {c.cat} : ${c.total}</h3>
      </div>
    ))}
    </div>
  )
}

const CatGraph = (props) => {
    let dataSet= [];
    let labels = [];
    for(let i=0; i<props.chartdata.length; i++){ 
      dataSet.push(Number(props.chartdata[i].total)),
      labels.push(props.chartdata[i].cat)
    }

  return (
    <div className="graph" id="dataVisual">
    </div>
  )
}


export default Profile;
