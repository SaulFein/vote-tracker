//



// var img = document.createElement("img");
// var img2 = document.createElement("img");

// img.src = "img/cap.jpg";
// img2.src = "img/enter36.jpg";

// var src = document.getElementById("left");
// var src2 = document.getElementById("right");

// src.appendChild(img);
// src.appendChild(img2);
'use strict'

function Photo (name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0
  // photoArray.push(this);
}

var allEyes = new Photo ("2Pac - All Eyes On Me", "img/alleyes.jpg");
var cap = new Photo ("Big Pun - Capital Punishment", "img/cap.jpg");
var daily = new Photo ("Gang Starr - Daily Operation", "img/daily.jpg");
var doomsday = new Photo ("MF DOOM - DOOMSDAY", "img/doomsday.jpg");
var enter36 = new Photo ("Wu-Tang Clan - Enter The Wu-Tang", "img/enter36.jpg");
var illmatic = new Photo ("Nas - Illmatic", "img/illmatic.jpg");
var infamous = new Photo ("Mobb Deep - The Infamous", "img/infamous.jpg");
var license = new Photo ("Beastie Boys - License to Ill", "img/license.jpg");
var liquid = new Photo ("GZA - Liquid Swords", "img/liquid.jpg");
var ready = new Photo ("The Notorious BIG - Read to Die", "img/ready.jpg");
var supreme = new Photo ("Ghostface Killah - Supreme", "img/supreme.jpg");
var theChronic = new Photo ("Dr. Dre - The Chronic", "img/thechronic.jpg");

var photoArray = [allEyes, cap, daily, doomsday, enter36, illmatic, infamous, license, liquid, ready, supreme, theChronic];

var Tracker = function() {
  this.getRandomPhoto = function() {
    return Math.floor((Math.random() * 12) + 0);
    //generate a random number to select an image from photoArray
  };
}

var rapBattle = new Tracker ();

var leftCover = photoArray[rapBattle.getRandomPhoto()].path;
var rightCover = photoArray[rapBattle.getRandomPhoto()].path;

while (leftCover === rightCover) {
  rightCover = photoArray[rapBattle.getRandomPhoto()].path;
  leftCover = photoArray[rapBattle.getRandomPhoto()].path;
}

console.dir (leftCover);
console.dir (rightCover);

Tracker.prototype.displayPhotos = function () {
  var first = document.getElementById('left');
  var leftPhoto = document.createElement('img');
  leftPhoto.src = leftCover;
  first.appendChild(leftPhoto);

  var second = document.getElementById('right');
  var rightPhoto = document.createElement('img');
  rightPhoto.src = rightCover;
  second.appendChild(rightPhoto);
}

rapBattle.displayPhotos();
