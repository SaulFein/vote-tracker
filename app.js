var data;
var images = [];
var files = ['alleyez', 'cap', 'daily', 'doomsday', 'enter36', 'illmatic', 'infamous', 'license', 'liquid', 'ready', 'supreme', 'thechronic'];
var titles = ['2Pac - All Eyez On Me', 'Big Pun - Capital Punishment', 'Gang Starr - Daily Operation', 'MF DOOM - DOOMSDAY', 'Wu-Tang Clan - Enter The Wu-Tang', 'Nas - Illmatic', 'Mobb Deep - The Infamous', 'Beastie Boys - Licence To Ill', 'GZA - Liquid Swords', 'The Notorious BIG - Ready to Die', 'Ghostface Killah - Supreme Clientele', 'Dr. Dre - The Chronic'];

function Photo(name, path, title) {
  this.name = name;
  this.path = path;
  this.title = title;
  this.votes = 0;
  data.labels.push(name);
  data.datasets[0].data.push(0);
  images.push(this);
}

function createPhoto() {
  for (var i = 0; i < files.length; i++) {
    var filePath = 'img/' + files[i] + '.jpg';
    new Photo(files[i], filePath, titles[i]);
  }
  localStorage.setItem('images', JSON.stringify(images));
}

function checkLocal() {
  if (localStorage.chartData && localStorage.images) {
    images = JSON.parse(localStorage.getItem('images'));
    data = JSON.parse(localStorage.chartData);
  } else {
    data = {
      labels: [],
      datasets: [
        {
          label: 'rap albums',
          fillColor: "red",
          strokeColor: "red",
          highlightFill: "red",
          highlightStroke: "red",
          data: []
        }
      ]
    };
    createPhoto();
  }
}
checkLocal();

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
    tracker.leftCaption.textContent = tracker.left.title;

    tracker.rightCovEl.src = tracker.right.path;
    tracker.rightCovEl.id = tracker.right.name;
    tracker.rightCaption.textContent = tracker.right.title;
  },

  vote: function(id) {
    for (var i in images) {
      if (images[i].name === id) {
        images[i].votes += 1;
        data.datasets[0].data[i] = images[i].votes;
        chart.datasets[0].bars[i].value = images[i].votes;
        console.log(images[i].title + " has " + images[i].votes + " votes.");
      }
    }
    localStorage.setItem('chartData', JSON.stringify(data));
    localStorage.setItem('images', JSON.stringify(images));
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

var leftPhoto = document.getElementById('leftPhoto');
leftPhoto.addEventListener('click', function(event) {
    tracker.vote(event.target.id);
    event.target.style.outline = "solid gold 5px";
    setTimeout(tracker.getRandomImg, 600);
    setTimeout(removeHL, 600);
    chart.update();
})

var rightPhoto = document.getElementById('rightPhoto');
rightPhoto.addEventListener('click', function(event) {
    tracker.vote(event.target.id);
    event.target.style.outline = "solid gold 5px";
    setTimeout(tracker.getRandomImg, 600);
    setTimeout(removeHL, 600);
    chart.update();
})

tracker.getRandomImg();


