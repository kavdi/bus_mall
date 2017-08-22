'use strict';

var allImageObjects = [];
var previousImages = [];
var currentImages = [];

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
    img.setAttribute('width', '25%');
    area.appendChild(img);
  };
}

var bag = new Image('bag', 'assets/bag.jpg', 'A great looking bag.');
var banana = new Image('banana', 'assets/banana.jpg', 'Banana slicer.');
var bathroom = new Image('bathroom', 'assets/bathroom.jpg', 'Something for your bathroom.');
var boots = new Image('boots', 'assets/boots.jpg', 'Sweet boots!');
var breakfast = new Image('breatfast', 'assets/breakfast.jpg', 'Revolutionize your breakfast!');
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
