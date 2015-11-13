'use strict' //scott help

var myNewChart;
var data;
var photoArray = [];

function Photo (name, path, id) { //object constructor for images
  this.name = name;
  this.path = path;
  this.id = id;
  this.votes = 0;
  photoArray.push(this);
}

//Creation of new Photo objects. One for each image.
localStorage.clear();

function checkLocal(){
  if (localStorage.chartData && localStorage.photoArray) {
    // data = JSON.parse(localStorage.chartData);
    // photoArray = JSON.parse(localStorage.getItem('photoArray'));
    console.log('if');
  } else {
  //   var allEyez = new Photo ("2Pac - All Eyes On Me", "img/alleyez.png", "allEyez");
  //   var cap = new Photo ("Big Pun - Capital Punishment", "img/cap.jpg", "cap");
  //   var daily = new Photo ("Gang Starr - Daily Operation", "img/daily.jpg", "daily");
  //   var doomsday = new Photo ("MF DOOM - DOOMSDAY", "img/doomsday.jpg", "doomsday");
  //   var enter36 = new Photo ("Wu-Tang Clan - Enter The Wu-Tang", "img/enter36.jpg", "enter36");
  //   var illmatic = new Photo ("Nas - Illmatic", "img/illmatic.jpg", "illmatic");
  //   var infamous = new Photo ("Mobb Deep - The Infamous", "img/infamous.jpg", "infamous");
  //   var license = new Photo ("Beastie Boys - License to Ill", "img/license.jpg", "license");
  //   var liquid = new Photo ("GZA - Liquid Swords", "img/liquid.jpg", "liquid");
  //   var ready = new Photo ("The Notorious BIG - Read to Die", "img/ready.jpg", "ready");
  //   var supreme = new Photo ("Ghostface Killah - Supreme Clientele", "img/supreme.jpg", "supreme");
  //   var theChronic = new Photo ("Dr. Dre - The Chronic", "img/thechronic.jpg", "theChronic");

  //   data = {
  //     labels: ["allEyez", "cap", "daily", "doomsday", "enter36", "illmatic", "infamous", "license", "liquid", "ready", "supreme", "theChronic"],
  //     datasets: [
  //       {
  //         label: "My First dataset",
  //         fillColor: "red",
  //         strokeColor: "red",
  //         highlightFill: "rgba(220,220,220,0.75)",
  //         highlightStroke: "rgba(220,220,220,1)",
  //         data: [0,0,0,0,0,0,0,0,0,0,0,0]
  //       }
  //     ]
  //   };
  // }

  // //Putting each Photo object into an array
  // // photoArray = [allEyez, cap, daily, doomsday, enter36, illmatic, infamous, license, liquid, ready, supreme, theChronic];

  // localStorage.setItem('photoArray', JSON.stringify(photoArray));
  console.log('else');
  }
}

checkLocal();


//Creating the tracker object
var tracker = function() {
}

//This tracker method generates a random number to select an image from photoArray
tracker.getRandomPhoto = function() {
    return Math.floor((Math.random() * 12) + 0);
  };

//Declaring left and right cover images by tracker.prototype.getRandomPhoto() method.
var leftCover = photoArray[tracker.getRandomPhoto()];
var rightCover = photoArray[tracker.getRandomPhoto()];

//If the left cover = the right cover it will reassign a new cover to the rightCover
//and leftCover variables until they are not the same.
while (leftCover === rightCover) {
  rightCover = photoArray[tracker.getRandomPhoto()];
  leftCover = photoArray[tracker.getRandomPhoto()];
}

console.log (leftCover);
console.log (rightCover);

var first = document.getElementById('left');
var second = document.getElementById('right');
var next = document.getElementById('nextbattle');

//This method puts the images and album titles into HTML
tracker.displayPhotos = function () {
  var leftPhoto = document.createElement('img');
  var leftTitle = document.getElementById('leftName');
  leftPhoto.src = leftCover.path;
  leftPhoto.id = leftCover.id;
  first.appendChild(leftPhoto);
  leftTitle.innerHTML = leftCover.name;

  var rightPhoto = document.createElement('img');
  var rightTitle = document.getElementById('rightName');
  rightPhoto.src = rightCover.path;
  rightPhoto.id = rightCover.id;
  second.appendChild(rightPhoto);
  rightTitle.innerHTML = rightCover.name;
}

tracker.leftWins = function(event) {
  event.preventDefault(); //When the event is triggered by the click it will not reload the page.
  event.target.style.outline = "solid blue 5px";//This adds a blue border to left cover if clicked
  leftCover.votes += 1; //This gives that cover 1 vote.
  console.log(leftCover.name + " has " + leftCover.votes + " votes.");
  refreshChart();
  localStorage.setItem('chartData', JSON.stringify(data));
  // displayChart();// redraws chart after votes have been incremented
  setTimeout(newRapBattle, 600);
  setTimeout(removeHL, 600);
}


tracker.rightWins = function(event) {
  event.preventDefault();
  event.target.style.outline = "solid red 5px";
  rightCover.votes += 1;
  console.log(rightCover.name + " has " + rightCover.votes + " votes.");
  refreshChart();
  localStorage.setItem('chartData', JSON.stringify(data));
  // displayChart();// redraws chart after votes have been incremented
  setTimeout(newRapBattle, 600);
  setTimeout(removeHL, 600);
}


var removeHL = function () {
  document.getElementById("right1").removeAttribute('style');//removes border highlighting
  document.getElementById("left1").removeAttribute('style');
}

var newRapBattle = function () {
  leftCover = photoArray[tracker.getRandomPhoto()];
  rightCover = photoArray[tracker.getRandomPhoto()];

  while (leftCover === rightCover) {
    rightCover = photoArray[tracker.getRandomPhoto()];
  }

  var left1 = document.getElementById('left1');
  var leftTitle = document.getElementById('leftName');
  left1.src = leftCover.path;
  leftTitle.innerHTML = leftCover.name;

  var right1 = document.getElementById('right1');
  var rightTitle = document.getElementById('rightName');
  right1.src = rightCover.path;
  rightTitle.innerHTML = rightCover.name;

  console.log (leftCover);
  console.log (rightCover);

}

tracker.displayPhotos();

first.addEventListener("click", tracker.leftWins);
second.addEventListener("click", tracker.rightWins);

//Chart section
// var displayChart = function() {

  var ctx = document.getElementById("myChart").getContext("2d");




  var barOptions = {
      barShowStroke : false,
      animateScale : false,
      scaleFontColor: "gold",
      scaleLineColor: "gold"
    }

  var myNewChart = new Chart(ctx).Bar(data, barOptions, { scaleFontColor: "#00FFFF" })

// }

var refreshChart = function (id) {
  for (var i in photoArray){
    if(photoArray[i].id === id) {
      myNewChart.datasets[0].bars[i].value = photoArray[i].votes;
      data.datasets[0].data[i] = photoArray[i].votes;
    }
    // myNewChart.segments[i].value = photoArray[i].votes;
    // myNewChart.update();
    myNewChart.update();
  }
}







// displayChart();











