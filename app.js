var data;
var images = [];
var files = ['alleyez', 'cap', 'daily', 'doomsday', 'enter36', 'illmatic', 'infamous', 'license', 'liquid', 'ready', 'supreme', 'theChronic'];

function Photo(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 1;
  data.labels.push(name);
  data.datasets[0].data.push(0);
  images.push(this);
}

function createPhoto() {
  for (var i = 0; i < files.length; i++) {
    var filePath = 'img/' + files[i] + '.jpg';
    new Photo(files[i], filePath);
  }
  localStorage.setItem('images', JSON.stringify(images)); // This line is new
}

function checkLocal() { // This function wrapper is new, and some content
  if (localStorage.chartData && localStorage.images) {
    data = JSON.parse(localStorage.chartData); // line 24 and 25 are two different ways to get data from Local Storage
    images = JSON.parse(localStorage.getItem('images'));
  } else {
    data = {
      labels: [],
      datasets: [
        {
          label: 'rap albums',
          fillColor: "rgba(25, 207, 205, 0.5)",
          strokeColor: "rgba(25, 207, 205, 0.8)",
          highlightFill: "rgba(25, 207, 205, 0.75)",
          highlightStroke: "rgba(25, 207, 20 5, 1)",
          data: []
        }
      ]
    };
    createPhoto();
  }
} checkLocal();

var tracker = {
  left: '',
  right: '',
  leftCovEl: document.getElementById('leftPhoto'),
  rightCovEl: document.getElementById('rightPhoto'),
  leftCaption: document.getElementById('leftName'),
  rightCaption: document.getElementById('rightName'),

  getRandomNum: function() {
    return Math.floor(Math.random() * images.length);
  },

  getRandomImg: function() {
    tracker.left = images[tracker.getRandomNum()];
    tracker.right = images[tracker.getRandomNum()];

    if (tracker.left === tracker.right) {
      tracker.getRandomImg();
    }

    tracker.leftCovEl.src = tracker.left.path;
    tracker.leftCovEl.id = tracker.left.name;
    tracker.leftCaption.textContent = tracker.left.name;

    tracker.rightCovEl.src = tracker.right.path;
    tracker.rightCovEl.id = tracker.right.name;
    tracker.rightCaption.textContent = tracker.right.name;
  },

  vote: function(id) {
    for (var i in images) {
      if (images[i].name === id) {
        images[i].votes += 1;
        data.datasets[0].data[i] = images[i].votes;
        chart.datasets[0].bars[i].value = images[i].votes;
      }
    }
    localStorage.setItem('chartData', JSON.stringify(data)); // This line is new
  }
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx).Bar(data, {
  scaleShowVerticalLines: false,
  scaleShowHorizontalLines: true,
  barStrokeWidth: 1
});

var removeHL = function () {
  for (var i in images) {
  document.getElementById(tracker.leftCovEl.id).removeAttribute('style');
  document.getElementById(tracker.rightCovEl.id).removeAttribute('style');
  }
}
var leftButton = document.getElementById('leftButton');
votearea.addEventListener('click', function(event) {
    tracker.vote(event.target.id);
    event.target.style.outline = "solid red 5px";
    setTimeout(tracker.getRandomImg, 600);
    setTimeout(removeHL, 600);
    chart.update();
})

var rightButton = document.getElementById('rightButton');
votearea.addEventListener('click', function(event) {
    tracker.vote(event.target.id);
    event.target.style.outline = "solid blue 5px";
    setTimeout(tracker.getRandomImg, 600);
    setTimeout(removeHL, 600);
    chart.update();
})



tracker.getRandomImg();
