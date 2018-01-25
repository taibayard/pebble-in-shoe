import React, { Component } from 'react';

class Confirmation extends Component {

//Getting all prices from the api response
getResultData =(result)=>{
    let prices = [];
    let totals = [];
    let lines = result.ParsedResults[0].TextOverlay.Lines;
    for (let i = 0; i < lines.length; i++) {
      let words = lines[i].Words;
      for (let j = 0; j < words.length; j++) {
        if (words[j].WordText.toLowerCase().indexOf('total') !== -1) {
          totals.push(words[j]);
        } else if (
          words[j].WordText.indexOf('$') !== -1 &&
          words[j].WordText.length > 1
        ) {
          words[j].WordText = words[j].WordText.replace(/[^0-9.]/g, '');
          prices.push(words[j]);
        }
      }
    }
    return [prices, totals];
  }
  //finds which price is associated with the "Total";
findToatalData = (item, priceData) =>{
    let lowestDiff = [];
    let receiptItems = null;
    for (let i = 0; i < item.length; i++) {
      lowestDiff.push({
        diff: 999999, //default diff
        price: null,
        itemIndex: null, //which total in the "item" array contains the lowest diff
      });
      for (let j = 0; j < priceData.length; j++) {
        let diff = Math.abs(
          parseFloat(item[i].Top) - parseFloat(priceData[j].Top)
        );
        if (diff < lowestDiff[i].diff) {
          //set new lowest diff
          lowestDiff[i].diff = diff;
          lowestDiff[i].price = parseFloat(priceData[j].WordText);
          lowestDiff[i].itemIndex = i;
        }
      }
    }
    return Math.max.apply(Math, lowestDiff.map(function(o) { return o.price; }));;
  }
   render() {
    let searchData = this.getResultData(this.props.receiptData);
    let priceData = searchData[0];
    let receiptTotal = this.findToatalData(searchData[1], priceData);
    let category = "test";
      return(
         <div>
            <form method="POST" action="/receipts/add">
              <input name="category" type="hidden" value={category}/>
              <input name="total" type="hidden" value={receiptTotal}/>
              <input name="token" type="hidden" value={localStorage.getItem("mernToken")}/>
              <input type="submit" value="Submit" />
            </form>
         </div>
      )
   }

}


export default Confirmation;
