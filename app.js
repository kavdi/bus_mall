'use strict';

var allImageObjects = [];

var recentImages = [];

function Image(fileName, stringName, filePath, description) {
  this.fileName = fileName;
  this.stringName = stringName;
  this.filePath = filePath;
  this.desc = description;
  this.numShown = 0;
  this.numClicks = 0;
  allImagesObjects.push(this);
  this.imgGenerator = function() {
    //var ranNum = Math.floor(Math.random() * imagesArray.length - 1) + 1;
    //var imgRandom = imagesArray[ranNum];
    var area = document.getElementById('photo_area');
    var img = document.createElement('img');
    img.setAttribute('alt', this.desc);
    img.setAttribute('src', this.filePath);
    img.setAttribute('width', '25%');
    area.appendChild(img);
  };
}

var bag = new Image('bag.jpg', 'bag', 'assets/bag.jpg', 'A great looking bag');
var banana = new Image('banana.jpg', 'banana', 'assets/banana.jpg', 'Banana slicer');
var bathroom = new Image('bathroom.jpg', 'bathroom', 'assets/bathroom.jpg', 'Something for your bathroom');
