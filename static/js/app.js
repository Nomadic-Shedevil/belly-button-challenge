//read in the json file

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function main() {

let selector = d3.select("#selDataset")

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    let random = data.names
    for(let i = 0; i < random.length; i++) {
        selector.append("option").text(random[i]).property("value", random[i]);

    }
    let firstItem = random[0];
    makeCharts(firstItem);
    hugeData(firstItem);
  });
};
function optionChanged(subject) {
    makeCharts(subject);
    hugeData(subject);
    console.log(subject);


};

main();

//set function to update data of the sample based on subject chosen
function hugeData(sample){
    d3.json(url).then(function(data){let mega = data.metadata
        let megaArray = mega.filter(obj => obj.id == sample);
        let megaResult = megaArray[0];
        let panel = d3.select("#sample-metadata") 
    panel.html("");
    for(key in megaResult){
        panel.append("h6").text(`${key.toUpperCase()}: ${megaResult[key]}`)

    }
     })    
};

//set function so that all charts change when choosing a new sample with subject ID

function makeCharts(sample){

    d3.json(url).then(function(data){let mega = data.metadata
        let megaArray = mega.filter(obj => obj.id == sample);
        let megaResult = megaArray[0];
        
        let wfreq = megaResult.wfreq
        let little = data.samples
        let littleArray = little.filter(obj => obj.id == sample);
        let littleResult = littleArray[0];
        let otu_ids = littleResult.otu_ids;
        let otu_labels = littleResult.otu_labels;
        let sample_values = littleResult.sample_values;

        let yTicks = otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse()
    
    var barData = [{
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: yTicks,
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', barData);

      //bubble chart code
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      };
      
      var bubbleData = [trace1];
      
      var bubbleLayout = {
        title: 'OTU ID',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      
      //gauge chart code
      var gaugeData = [
        {
          type: "indicator",
          mode: "gauge+value+delta",
          value: wfreq,
          title: { text: "Belly Button Washing Frequency <br> Scrubs per week", font: { size: 20 } },
          delta: { reference: 9, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [0,9], tickwidth: .01, tickcolor: "darkpurple" },
            bar: { color: "cyan" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 5], color: "purple" },
              { range: [5, 9], color: "navy" }
            ],
            threshold: {
              line: { color: "red", width: 6 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var gaugeLayout = {
        width: 400,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
      
    })
};