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

      var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: [40, 60, 80, 100]
        }
      };
      
      var bubbleData = [trace1];
      
      var bubbleLayout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      

      var gaugeData = [
        {
          type: "indicator",
          mode: "gauge+number+delta",
          value: wfreq,
          title: { text: "Speed", font: { size: 24 } },
          delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 250], color: "cyan" },
              { range: [250, 400], color: "royalblue" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var gaugeLayout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
      
    })
};