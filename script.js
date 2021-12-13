let api_key = "";
//let api_key = "?registrationkey=#";
//When you have obtained your API key, replace the # above with you api key and uncomment the line.

let supersector = {
"00":	"Total Nonfarm",
"05":	"Total Private",
"06":	"Goods-producing",
"07":	"Service-providing",
"08":	"Private Service-providing",
"10":	"Mining and Logging",
"20":	"Construction",
"30":	"Manufacturing",
"31":	"Durable Goods",
"32":	"Nondurable Goods",
"40":	"Trade, Transportation, and Utilities",
"41":	"Wholesale Trade",
"42":	"Retail Trade",
"43":	"Transportation and Warehousing",
"44":	"Utilities",
"50":	"Information",
"55":	"Financial Activities",
"60":	"Professional and Business Services",
"65":	"Education and Health Services",
"70":	"Leisure and Hospitality",
"80":	"Other Services",
"90":	"Government"
}
let firstTime = 0;
    const labels =[];


    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      light_green: 'rgb(0, 200,0)',
      brown: 'rgb(127,87,0)',
      pink: 'rgb(244,103,211)',
      dark_blue: 'rgb(0,0,203)',
      dark_orange: 'rgb(193, 97, 0)',
      dark_green: 'rgb(0,97,0)',
      black: 'rgb(0,0,0)',
      dark_purple: 'rgb(234, 0, 255)',
      neon_blue: 'rgb(0, 255, 255)',
      maroon: 'rgb(86, 0, 53)',
      yellow2: 'rgb(255,255,21)',
      dark_grey: 'rgb(90,90,90)',
      aqua: 'rgb(0, 114,112)',
      light_red: 'rgb(255, 120, 120)',
      blue2: 'rgb(0, 14, 106)'
    };
    
let CHART_COLORS_array= Object.keys(CHART_COLORS);
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      light_green: 'rgba(0,200,0,0.5)',
      brown: 'rgba(127,87,0, 0.5)',
      pink: 'rgba(244,103,211, 0.5)',
      dark_blue: 'rgba(0,0,203,0.5)',
      dark_orange: 'rgba(193,97,0,0.5)',
      dark_green: 'rgba(0,97,0, 0.5)',
      black: 'rgba(0,0,0,0.5)',
      dark_purple: 'rgba(234, 0, 255, 0.5)',
      neon_blue: 'rgba(0, 255, 255, 0.5)',
      maroon: 'rgba(86, 0, 53, 0.5)',
      yellow2: 'rgba(255,255,21,0.5)',
      dark_grey: 'rgba(90, 90,90, 0.5)',
      aqua: 'rgba(0,114,112, 0.5)',
      light_red: 'rgba(255,120,120,0.5)',
      blue2: 'rgba(0,14,106,0.5)'
    };


    const data = {
      labels: labels,
      datasets: []
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
function drawChart(){

    const myChart = new Chart(
      document.getElementById('myChart'),
        config);


    }
function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let sectorLine = {
      label: 'Sample Label',
      data: [],
      borderColor: CHART_COLORS[CHART_COLORS_array[firstTime]],
      backgroundColor: CHART_COLORS_50_Percent[CHART_COLORS_array[firstTime]],
      hidden: true
    }
    console.log("Success");
    console.log(this.response.Results);
    let seriesID= this.response.Results.series[0].seriesID;
    sectorLine.label = supersector[seriesID.substring(3,5)];
    let dataArray= this.response.Results.series[0].data;
    for (let i = dataArray.length - 1; i >= 0; i--) {
      if (firstTime ==0){
      labels.push(dataArray[i].periodName + "/" + dataArray[i].year);
    }
      sectorLine.data.push(dataArray[i].value);
    }
    firstTime = firstTime + 1;
    data.datasets.push(sectorLine);
    if (firstTime== Object.keys(supersector).length){
      drawChart ();
    }

console.log(this.response);
  } else {
console.log ("error");
  }
}

for (let sector in supersector) {
let xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.addEventListener("load", responseReceivedHandler);
let requestStart = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
let requestEnd = "00000001"+api_key;
xhr.open("GET", requestStart + sector + requestEnd);
console.log(requestStart + sector + requestEnd);
xhr.send();
}
