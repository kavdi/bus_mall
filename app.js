'use strict';

var allImageObjects = [];
var previousImages = [];
var currentImages = [];
var grandTotalClicks = 0;

function Image(stringName, filePath, description) {
  this.stringName = stringName;
  this.filePath = filePath;
  this.desc = description;
  this.numShown = 0;
  this.numClicks = 0;
  allImageObjects.push(this);
  this.imgGenerator = function() {
    var area = document.getElementById('photo_area');
    var img = document.createElement('img');
    img.setAttribute('alt', this.desc);
    img.setAttribute('src', this.filePath);
    img.setAttribute('id', this.stringName);
    img.setAttribute('width', '25%');
    area.appendChild(img);
  };
}

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
      item.imgGenerator();
    }
  }
  previousImages = currentImages;
};
displayImages();

function harvestClicks(event) {
  event.preventDefault();
  console.log(event);
  if(event.target.nodeName === 'IMG') {
    for(var i = 0; i < allImageObjects.length; i++) {
      if(String(event.target.id) === allImageObjects[i].stringName && grandTotalClicks < 25) {
        allImageObjects[i].numClicks++;
        grandTotalClicks++;
        console.log(grandTotalClicks);
        displayImages();
      } else {
        countClicks.removeEventListener('click', harvestClicks, true);
      }
    }
  }
};

var countClicks = document.getElementById('photo_area');
countClicks.addEventListener('click', harvestClicks);

displayImages();
