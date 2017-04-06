
var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  result = {};
  for (var i = 0; i < salesData.length; i++) {
    var name = salesData[i].name;
    if (name in result) {

      // add current sales total and push to exisiting sales total
      var addMe = salesData[i].sales;
      var rawSales = calcSales(addMe);
      result[name]["totalSales"] += rawSales;

      // calculate sales tax and add to existing sales tax
      var province = salesData[i].province;
      var rate = salesTaxRates[province];
      result[name]["totalTaxes"] += calcTaxes(rate, rawSales);
    } else {
      //create object with result object
      result[name] = {};

      // calculate sales and add to sales object
      var addMe = salesData[i].sales;
      var rawSales = calcSales(addMe);
      result[name]["totalSales"] = rawSales;

      //calc tax and add to tax object
      var province = salesData[i].province;
      var rate = salesTaxRates[province];
      result[name]["totalTaxes"] = calcTaxes(rate, rawSales);

    }
  }
  return result
}

calculateSalesTax(companySalesData, salesTaxRates);
console.log(result);

// function to calculate total of sales for one entry
function calcSales(addMe) {
  var sum = 0;
  for (var i = 0; i < addMe.length; i++) {
    sum += addMe[i];
  }
 return sum
}

// function to calculate sales tax for one entry
function calcTaxes(rate, rawSales) {
 var tax = 0;
 tax = rawSales*rate;
 return tax;
}
