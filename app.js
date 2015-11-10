'use strict'

function Photo (name, path) { //object constructor for images
  this.name = name;
  this.path = path;
  this.votes = 0;
  // photoArray.push(this);
}

//Creation of new Photo objects. One for each image.
var allEyez = new Photo ("2Pac - All Eyes On Me", "img/alleyez.png");
var cap = new Photo ("Big Pun - Capital Punishment", "img/cap.jpg");
var daily = new Photo ("Gang Starr - Daily Operation", "img/daily.jpg");
var doomsday = new Photo ("MF DOOM - DOOMSDAY", "img/doomsday.jpg");
var enter36 = new Photo ("Wu-Tang Clan - Enter The Wu-Tang", "img/enter36.jpg");
var illmatic = new Photo ("Nas - Illmatic", "img/illmatic.jpg");
var infamous = new Photo ("Mobb Deep - The Infamous", "img/infamous.jpg");
var license = new Photo ("Beastie Boys - License to Ill", "img/license.jpg");
var liquid = new Photo ("GZA - Liquid Swords", "img/liquid.jpg");
var ready = new Photo ("The Notorious BIG - Read to Die", "img/ready.jpg");
var supreme = new Photo ("Ghostface Killah - Supreme Clientele", "img/supreme.jpg");
var theChronic = new Photo ("Dr. Dre - The Chronic", "img/thechronic.jpg");

//Putting each Photo object into an array
var photoArray = [allEyez, cap, daily, doomsday, enter36, illmatic, infamous, license, liquid, ready, supreme, theChronic];

//Creating the Tracker object
var Tracker = function() {
}

//This Track method generates a random number to select an image from photoArray
Tracker.prototype.getRandomPhoto = function() {
    return Math.floor((Math.random() * 12) + 0);
  };

//Creating a new Tracker object
var rapBattle = new Tracker ();

//Declaring left and right cover images by rapBattle.getRandomPhoto() method.
var leftCover = photoArray[rapBattle.getRandomPhoto()];
var rightCover = photoArray[rapBattle.getRandomPhoto()];

//If the left cover = the right cover it will reassign a new cover to the rightCover
//and leftCover variables until they are not the same.
while (leftCover === rightCover) {
  rightCover = photoArray[rapBattle.getRandomPhoto()];
  leftCover = photoArray[rapBattle.getRandomPhoto()];
}

console.log (leftCover);
console.log (rightCover);

var first = document.getElementById('left');
var second = document.getElementById('right');
var next = document.getElementById('nextbattle');

//This method puts the images and album titles into HTML
Tracker.prototype.displayPhotos = function () {
  var leftPhoto = document.createElement('img');
  var leftTitle = document.getElementById('leftName');
  leftPhoto.src = leftCover.path;
  first.appendChild(leftPhoto);
  leftTitle.innerHTML = leftCover.name;

  var rightPhoto = document.createElement('img');
  var rightTitle = document.getElementById('rightName');
  rightPhoto.src = rightCover.path;
  second.appendChild(rightPhoto);
  rightTitle.innerHTML = rightCover.name;
}

Tracker.prototype.leftWins = function(event) {
  event.preventDefault(); //When the event is triggered by the click it will not reload the page.
  event.target.style.outline = "solid blue 5px";//This adds a blue border to left cover if clicked
    leftCover.votes += 1; //This gives that cover 1 vote.
    console.log(leftCover.name + " has " + leftCover.votes + " votes.");
}

Tracker.prototype.rightWins = function(event) {
    event.preventDefault();
    event.target.style.outline = "solid red 5px";
    rightCover.votes += 1;
    console.log(rightCover.name + " has " + rightCover.votes + " votes.");
}

var newRapBattle = function () {
  leftCover = photoArray[rapBattle.getRandomPhoto()];
  rightCover = photoArray[rapBattle.getRandomPhoto()];

  while (leftCover === rightCover) {
    rightCover = photoArray[rapBattle.getRandomPhoto()];
    leftCover = photoArray[rapBattle.getRandomPhoto()];
  }
  // first.parentNode.removeChild('img src');
  var leftPhoto = document.createElement('img');
  var leftTitle = document.getElementById('leftName');
  leftPhoto.src = leftCover.path;
  first.appendChild(leftPhoto);
  leftTitle.innerHTML = leftCover.name;
  // first.innerHTML = 'img src =' + leftCover.path;

  // second.parentNode.removeChild('img src');
  var rightPhoto = document.createElement('img');
  var rightTitle = document.getElementById('rightName');
  rightPhoto.src = rightCover.path;
  second.appendChild(rightPhoto);
  rightTitle.innerHTML = rightCover.name;

  console.log (leftCover);
  console.log (rightCover);
}

rapBattle.displayPhotos();

first.addEventListener('click', rapBattle.leftWins); //If the left image is clicked it runs the leftWins method
second.addEventListener("click", rapBattle.rightWins); //If the left image is clicked it runs the leftWins method
next.addEventListener("click", newRapBattle);




