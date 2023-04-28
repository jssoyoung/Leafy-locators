var apiKey = "sk-vnQq64473cbeb4e2b624";
var imgBtn = document.querySelector("#image-btn");
var locationBtn = document.querySelector("#location-btn");
var mainContainer = document.querySelector(".main-container");
var mapContainer = document.querySelector(".map-container");
var searchBar = document.querySelector("#tags");
var searchBtn = document.querySelector(".search");
const plantImage = document.querySelector("#plantImage");

// function getApi() {
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = `https://perenual.com/api/species-list?page=1&key=${apiKey}`;

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }
// getApi();

//added search button event listener
searchBtn.addEventListener("click", function () {
  plantImage.src = "";
  getPlant();
});

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = `https://perenual.com/api/species-list?page=1&key=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getApi();

// searchBar.addEventListener()
// return response.json();

imgBtn.addEventListener("click", function () {
  mainContainer.setAttribute("class", "show");
  mapContainer.setAttribute("class", "hidden");
});

locationBtn.addEventListener("click", function () {
  mainContainer.setAttribute("class", "hidden");
  mapContainer.setAttribute("class", "show");
});

// Google Places Map API with Search Box
// Name search element id="autocomplete"
// Name map element id="map" requires width and height in CSS

// TODO: Update "center" based on user's input; need to grab geocoder for it:

var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(47.6062, -122.3321);

  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 12,
  });

  var request = {
    location: pyrmont,
    radius: "50",
    query: "plants",
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 5; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  console.log(place);

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}


// Recent Searches:

// Write a local item..
localStorage.setItem("myKey", "myValue");

// Read a local item..
var theItemValue = localStorage.getItem("myKey");

// Check for changes in the local item and log them..
window.addEventListener(
  "storage",
  function (event) {
    console.log(
      "The value for " +
        event.key +
        " was changed from" +
        event.oldValue +
        " to " +
        event.newValue
    );
  },
  false
);

// Check for HTML5 Storage..
function supports_html5_storage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

//need to target data to display to page
var requestUrl = `https://perenual.com/api/species-list?page=1&key=${apiKey}`;
var plantName = document.querySelector("#name");
var otherName = document.querySelector("#other");
var scientificName = document.querySelector("#scientific");
var water = document.querySelector("#water");
var sun = document.querySelector("#sunlight");

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {});

function getPlant() {
  var requestUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${searchBar.value}`;
  var plantName = document.querySelector("#name");
  var otherName = document.querySelector("#other");
  var scientificName = document.querySelector("#scientific");
  var water = document.querySelector("#water");
  var sun = document.querySelector("#sunlight");

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      plantName.innerHTML = `Plant Name: ${data.data[0].common_name}`;
      otherName.innerHTML = `Other Name: ${data.data[0].other_name}`;
      scientificName.innerHTML = `Scientific Name: ${data.data[0].scientific_name}`;
      water.innerHTML = `Watering: ${data.data[0].watering}`;
      sun.innerHTML = `Sunlight: ${data.data[0].sunlight}`;
      plantImage.src = `${data.data[0].default_image.original_url}`;
    });
}


let plantNames = [];

for (let i = 0; i <= 1; i++) {
  fetch(
    `https://perenual.com/api/species/details/${i}?key=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      plantNames.push(data.common_name);
    });
}

$(function () {
  let availableTags = plantNames;
  $("#tags").autocomplete({
    source: availableTags,
  });
});

 plantName.innerHTML = plantNames;