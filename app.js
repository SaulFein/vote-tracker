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

//Creating the tracker object
var tracker = function() {
}

//This Track method generates a random number to select an image from photoArray
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
  leftPhoto.id = 'left1';
  first.appendChild(leftPhoto);
  leftTitle.innerHTML = leftCover.name;

  var rightPhoto = document.createElement('img');
  var rightTitle = document.getElementById('rightName');
  rightPhoto.src = rightCover.path;
  rightPhoto.id = 'right1';
  second.appendChild(rightPhoto);
  rightTitle.innerHTML = rightCover.name;
}

tracker.leftWins = function(event) {
  event.preventDefault(); //When the event is triggered by the click it will not reload the page.
  event.target.style.outline = "solid blue 5px";//This adds a blue border to left cover if clicked
  leftCover.votes += 1; //This gives that cover 1 vote.
  console.log(leftCover.name + " has " + leftCover.votes + " votes.");
  displayChart();// redraws chart after votes have been incremented
}

tracker.rightWins = function(event) {
  event.preventDefault();
  event.target.style.outline = "solid red 5px";
  rightCover.votes += 1;
  console.log(rightCover.name + " has " + rightCover.votes + " votes.");
  displayChart();// redraws chart after votes have been incremented
}

var newRapBattle = function () {
  leftCover = photoArray[tracker.getRandomPhoto()];
  rightCover = photoArray[tracker.getRandomPhoto()];

  while (leftCover === rightCover) {
    rightCover = photoArray[tracker.getRandomPhoto()];
    // leftCover = photoArray[rapBattle.getRandomPhoto()];
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

first.addEventListener("click", tracker.leftWins); //If the left image is clicked it runs the leftWins method
second.addEventListener("click", tracker.rightWins); //If the left image is clicked it runs the leftWins method
next.addEventListener("click", function() { // runs newRapBattle function and removes highlighting.
  newRapBattle();
  document.getElementById("right1").removeAttribute('style');
  document.getElementById("left1").removeAttribute('style');
});


//Chart section
var displayChart = function() {

var ctx = document.getElementById("myChart").getContext("2d");
var ctx2 = document.getElementById("myChart2").getContext("2d");

var data = [
    // {
    //     value: leftCover.votes,
    //     color: "#46BFBD",
    //     highlight: "#FF5A5E",
    //     label: "Blue"
    // },
    // {
    //     value: rightCover.votes,
    //     color: "#F7464A",
    //     highlight: "#5AD3D1",
    //     label: "Red"
    // },
    {
        value: allEyez.votes,
        color: "red",
        highlight: "red",
        label: "allEyez"
    },
    {
        value: cap.votes,
        color: "blue",
        highlight: "blue",
        label: "cap"
    },
    {
        value: daily.votes,
        color: "green",
        highlight: "green",
        label: "daily"
    },
    {
        value: doomsday.votes,
        color: "yellow",
        highlight: "yellow",
        label: "doomsday"
    },
    {
        value: enter36.votes,
        color: "purple",
        highlight: "purple",
        label: "enter36"
    },
    {
        value: illmatic.votes,
        color: "orange",
        highlight: "orange",
        label: "illmatic"
    },
    {
        value: infamous.votes,
        color: "#DEB887",
        highlight: "#DEB887",
        label: "infamous"
    },
    {
        value: license.votes,
        color: "#6495ED",
        highlight: "#6495ED",
        label: "license"
    },
    {
        value: liquid.votes,
        color: "#B8860B",
        highlight: "#B8860B",
        label: "liquid"
    },
    {
        value: ready.votes,
        color: "#006400",
        highlight: "#006400",
        label: "ready"
    },
    {
        value: supreme.votes,
        color: "#FF1493",
        highlight: "#FF1493",
        label: "supreme"
    },
    {
        value: theChronic.votes,
        color: "#696969",
        highlight: "#696969",
        label: "theChronic"
    },

];

var pieOptions = {
  segmentShowStroke : false,
  animateScale : true
}
var barData = {
    labels: ["allEyez", "cap", "daily", "doomsday", "enter36", "illmatic", "infamous", "license", "liquid", "ready", "supreme", "theChronic"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "red",
            strokeColor: "red",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [allEyez.votes, cap.votes, daily.votes, doomsday.votes, enter36.votes, illmatic.votes, infamous.votes, license.votes, liquid.votes, ready.votes, supreme.votes, theChronic.votes]
        },
        // {
        //     label: "My Second dataset",
        //     fillColor: "green",
        //     strokeColor: "green",
        //     highlightFill: "rgba(151,187,205,0.75)",
        //     highlightStroke: "rgba(151,187,205,1)",
        //     data: [cap.votes]
        // }
    ]
};

var barOptions = {
  barShowStroke : false,
  animateScale : false
}

var myNewChart = new Chart(ctx2).Pie(data,pieOptions);
// var myNewChart = new Chart(ctx).PolarArea(data,pieOptions);
var myBarChart = new Chart(ctx).Bar(barData, barOptions);

}

