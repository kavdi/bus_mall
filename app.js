'use strict';

var allImageObjects = [];
var previousImages = [];
var currentImages = [];
var grandTotalClicks = 0;
var clickLimit = 5;

if (localStorage.getItem('clicks')){
  allImageObjects = JSON.parse(localStorage.getItem('clicks'));
} else {
  var bag = new Image('bag', 'assets/bag.jpg', 'A great looking bag.');
  var banana = new Image('banana', 'assets/banana.jpg', 'Banana slicer.');
  var bathroom = new Image('bathroom', 'assets/bathroom.jpg', 'Something for your bathroom.');
  var boots = new Image('boots', 'assets/boots.jpg', 'Sweet boots!');
  var breakfast = new Image('breakfast', 'assets/breakfast.jpg', 'Revolutionize your breakfast!');
  var bubblegum = new Image('bubblegum', 'assets/bubblegum.jpg', 'Delicious bubblegum.');
  var chair = new Image('chair', 'assets/chair.jpg', 'A comfortable chair.');
  var cthulhu = new Image('cthulhu', 'assets/cthulhu.jpg', 'A great statue.');
  var dogduck = new Image('dog-duck', 'assets/dog-duck.jpg', 'A great looking dog-duck.');
  var dragon = new Image('dragon', 'assets/dragon.jpg', 'A great dragon.');
  var pen = new Image('pen', 'assets/pen.jpg', 'A great pen.');
  var pet_sweep = new Image('pet-sweep', 'assets/pet-sweep.jpg', 'A super pet sweep.');
  var scissors = new Image('scissors', 'assets/scissors.jpg', 'Cut stuff.');
  var shark = new Image('shark', 'assets/shark.jpg', 'Comfy shark.');
  var sweep = new Image('sweep', 'assets/sweep.png', 'A nice sweep.');
  var tauntaun = new Image('tauntaun', 'assets/tauntaun.jpg', 'A thing.');
  var unicorn = new Image('unicorn', 'assets/unicorn.jpg', 'Killer unicorn.');
  var usb = new Image('usb', 'assets/usb.gif', 'The best usb.');
  var water_can = new Image('water-can', 'assets/water-can.jpg', 'Hydrating water.');
  var wine_glass = new Image('wine-glass', 'assets/wine-glass.jpg', 'The greatest wine glass.');
  localStorage.setItem('clicks', JSON.stringify(allImageObjects));
}

function Image(stringName, filePath, description) {
  this.stringName = stringName;
  this.filePath = filePath;
  this.desc = description;
  this.numShown = 0;
  this.numClicks = 0;
  allImageObjects.push(this);
}

var imgGenerator = function(item) {
  var area = document.getElementById('photo_area');
  var img = document.createElement('img');
  img.setAttribute('alt', item.description);
  img.setAttribute('src', item.filePath);
  img.setAttribute('id', item.stringName);
  img.setAttribute('width', '30%');
  area.appendChild(img);
};

function ranNum() {
  return Math.floor(Math.random() * allImageObjects.length);
};

function displayImages() {
  var targetArea = document.getElementById('photo_area');
  targetArea.innerHTML = '';
  var currentImages = [];
  for(var i = 0; i < 3; i++) {
    var item = allImageObjects[ranNum()];
    if (currentImages.includes(item) || previousImages.includes(item)) {
      i--;
      continue;
    } else {
      currentImages.push(item);
      item.numShown++;
      imgGenerator(item);
    }
  }
  previousImages = currentImages;
};

displayImages();

function harvestClicks(event) {
  if(event.target.nodeName === 'IMG') {
    for(var i = 0; i < allImageObjects.length; i++) {
      if(String(event.target.id) === allImageObjects[i].stringName && grandTotalClicks < clickLimit) {
        allImageObjects[i].numClicks++;
        grandTotalClicks++;
        displayImages();
      } else if (grandTotalClicks === clickLimit) {
        countClicks.removeEventListener('click', harvestClicks);
        chartMaker();
        var myChart = new Chart(ctx, chartOptions);
        localStorage.setItem('clicks', JSON.stringify(allImageObjects));
        break;
      }
    }
  }
};

var countClicks = document.getElementById('photo_area');
countClicks.addEventListener('click', harvestClicks);

displayImages();

var votesArray = [];
var labelArray = [];
var chartMaker = function () {
  for (var i = 0; i < allImageObjects.length; i++) {
    labelArray.push(allImageObjects[i].stringName);
    votesArray.push(allImageObjects[i].numClicks);
  }
};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var chartOptions = {
  type: 'horizontalBar',
  data: {
    labels: labelArray,
    datasets: [{
      label: '# of Votes',
      data: votesArray,
      backgroundColor: 'rgba(11, 140, 97, 0.5)',
      borderColor: 'rgba(11, 140, 97, 1)',
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
};
