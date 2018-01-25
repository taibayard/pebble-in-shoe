import React, { Component } from 'react';

class Confirmation extends Component {

//Getting all prices from the api response
getResultData = (result) => {
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
findToatalData = (item, priceData) => {
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
  let t = Math.max.apply(
    Math,
    lowestDiff.map(function(o) {
      return o.price;
    })
  ); //gets total from highest "Total" found;
  return t;
}
//generates equation based on prices from receipt and the total cost of all the items
findEquation = (solution, input) => {
  var correctEquation = false;
  var testEquation = [];
  var f = function(prefix, input) {
    testEquation = [];
    for (let i = 0; i < input.length; i++) {
      testEquation.push(prefix + input[i].WordText);
      let product = testEquation[0].toString().split('/');
      product = product.reduce(function(a, b) {
        return parseFloat(a) + parseFloat(b);
      });
      if (solution === product) {
        correctEquation = testEquation.toString().split('/');
      }
      f(prefix + input[i].WordText + '/', input.slice(i + 1));
    }
  };
  f(0, input, 0);
  return correctEquation;
}
findPurchases = (prices, priceData, resultData) => {
  let lines = resultData.ParsedResults[0].TextOverlay.Lines;
  let itemsArr = [];
  for (let i = 0; i < prices.length; i++) {
    let p = parseFloat(prices[i]);
    for (let j = 0; j < priceData.length; j++) {
      if (p == priceData[i].WordText) {
        let lowestDiff = {
          item: null,
          diff: 999999, //default diff
        };
        for (let m = 0; m < lines.length; m++) {
          let diff = Math.abs(parseFloat(lines[m].MinTop)-parseFloat(priceData[i].Top) );
          console.log(diff);
          if ( diff < lowestDiff.diff && diff !== 0) {
            //line is closer
            lowestDiff = {
              item: JSON.stringify(lines[m]),
              diff: diff, //default diff
            };
          }
        }
        itemsArr.push(lowestDiff.item);
        j = priceData.length; //ends loop
      }
    }
  }
  return itemsArr.map(function(item){
    let e = JSON.parse(item);
    let itemName = "";
    e.Words.forEach(function(txt){
       itemName = itemName + txt.WordText + " ";
    })
    return itemName;
  })
}
makeList = (arr,price) => { 
  let output ="";  for(let i=0; i<arr.length; i++) { output += arr[i] +" :  $"+ parseFloat(price[i]) + "    \r\n " } return output; 
}
   render() {
    let searchData = this.getResultData(this.props.receiptData);
    let priceData = searchData[0];
    let receiptTotal = this.findToatalData(searchData[1], priceData);
    let receiptPrices = this.findEquation(receiptTotal, priceData);
    let purchases = this.findPurchases(receiptPrices, priceData, this.props.receiptData);
    let category = "test";
      return(
         <div>
           <h1>Total : {receiptTotal} </h1>
          {this.makeList(purchases,receiptPrices)}
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
