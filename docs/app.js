// ------------------------------  Get the Data -----------------------------------------
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
const dataPromise = d3.json(url); 
console.log('Data Promise: ', dataPromise); 

function init() {
  d3.json(url).then(function(tmp_data) {
    data = tmp_data; 
    console.log(data); 
    updateDashboard(); 
  });
}
// ----------------------------  Get the Data ---------------------------------------------


// -------------------------------  Demographics Panel  -----------------------------------
function demoInfo(myID) {
  const demo_meta_data = data.metadata;
  const meta_data = demo_meta_data.filter((m) => m.id == myID)[0];
  const demo_info = d3.select('#sample-metadata');
  const id = meta_data.id;
  const ethnicity = meta_data.ethnicity;
  const gender = meta_data.gender;
  const age = meta_data.age;
  const location = meta_data.location;
  const bbtype = meta_data.bbtype;
  const wfreq = meta_data.wfreq;
  demo_info.html(''); // create a blank text field
  demo_info.append('h6').text(`ID: ${id}`);
  demo_info.append('h6').text(`Ethnicity: ${ethnicity}`);
  demo_info.append('h6').text(`Gender: ${gender}`);
  demo_info.append('h6').text(`Age: ${age}`);
  demo_info.append('h6').text(`Location: ${location}`);
  demo_info.append('h6').text(`bbtype: ${bbtype}`);
  demo_info.append('h6').text(`wfreq: ${wfreq}`);
};
// -------------------------------  Demographics Panel  -----------------------------------


// --------------------  Create the dropdown and change of  ID ---------------------------
function optionChanged(myID) {
  barChart(myID);
  bubbleChart(myID);
  demoInfo(myID);
  gaugeChart(myID);
};

// ---------------------------  Update the dashboard ------------------------------------
function updateDashboard() {
  const names=data.names;
  const subjdropdownMenu = d3.select('#selDataset');
  
  for (let i=0; i < names.length; i++) {
    const myID = names[i];
    subjdropdownMenu.append('option').text(myID).property('value', myID);
  }
  const initID = subjdropdownMenu.property('value');
  barChart(initID);
  bubbleChart(initID);
  demoInfo(initID);
  
};
// ---------------------------  Update the dashboard ------------------------------------

// ------------------------------ Bar Chart  ---------------------------------------------
function barChart(myID) {
    const samples = data.samples; 
    const bar_data = samples.filter( (s) => s.id == myID);
    const sampleID = bar_data[0];
    const sampleValues = sampleID.sample_values;
    const otu_ids = sampleID.otu_ids;
    const otu_labels = sampleID.otu_labels;
    const yticks = otu_ids.slice(0, 10).map((otuID) => `OUT ${otuID}`).reverse();
  
    // barChart data
    const barData =[{
      x: sampleValues.slice(0, 10).reverse(),
      y: yticks,
      type: 'bar',
      test: otu_labels.reverse(),
      orientation: 'h',
    }];
  
    // barChart Layout
    const barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      margin: {t: 30, l: 150},
    };
  
    // Insert the bar chart into the html
    Plotly.newPlot('bar', barData, barLayout);
  }
  // -------------------------------- Bar Chart ------------------------------------------------

  // ------------------------------ Bubble Chart  ---------------------------------------------
function bubbleChart(myID) {
    const samples = data.samples; // the sample data are the observations
    const bubble_data = samples.filter( (sObj) => sObj.id == myID);
    console.log('bubble_data:', bubble_data);
    const sampleID = bubble_data[0];
    const sampleValues = sampleID.sample_values;
    const otu_ids = sampleID.otu_ids;
    const otu_labels = sampleID.otu_labels;
  
    // bubble Chart data
    const bubbleData = [{
      x: otu_ids,
      y: sampleValues,
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sampleValues,
        color: otu_ids,
        colorscale: 'Earth',
      },
    }];
  
    // bubble Chart layout
    const bubbleLayout = {
      title: 'Bacteria Cultures per sample',
      margin: {t: 0},
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'},
      margin: {t: 30},
    };
    // Insert the bubble chant into the html
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  }
  // ---------------------------------- Bubble Chart -----------------------------------------



init();