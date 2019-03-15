function buildMetadata() {
  var selector = d3.select("#sample-metadata");
  d3.json("/metadata/").then((sampleData) => {
    sampleData.forEach((sample) => {
      selector
        .append("#sample-metadata")
        .text(sample)
        .property("value", sample)
        .html("")
        Object.entries(sample)
    });
    // var keys = Object.entries(response1)
    //   console.log(keys)
 // });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
})
};
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var data = d3.select("#selDataset")
  d3.json("/metadata/").then((sampleData) => {
    sampleData.forEach((sample) => {
      data
        .append("#sample-metadata")
        .text(sample)
        .property("value", sample)
        .html("")
        Object.entries(sample)

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: ['otu_ids'],
      y: [`sample_values`],
      mode: 'markers',
      marker: {
        color: [`otu_ids`],
        text: [`otu_labels`]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 300,
      width: 300
    };
    
    Plotly.newPlot('bubble', data, layout);

    // @TODO: Build a Pie Chart
  
    var data = [{
      values: ['sample_values'],
      labels: ['otu_ids'],
      type: 'pie'
    }];
    
    Plotly.newPlot('pie', data);
    });
  });
};
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

 buildCharts();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
     const firstSample = sampleNames[0];
     buildCharts(firstSample);
     buildMetadata(firstSample);
  });


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
};
// Initialize the dashboard
init()