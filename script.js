var apiKey = "sk-wAYq644c646faa136638";
var imgBtn = document.querySelector("#image-btn");
var locationBtn = document.querySelector("#location-btn");
var mainContainer = document.querySelector(".main-container");
var mapContainer = document.querySelector(".map-container");
var searchBar = document.querySelector("#tags");
var searchBtn = document.querySelector("#search-btn");
const plantImage = document.querySelector("#plantImage");

window.navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    let { latitude, longitude } = position.coords;
    let userWeatherQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=a0e961f2177e8fbe6ce4c3be4f49a2eb`;
    let userWeatherData = await fetch(userWeatherQuery);
    if (!userWeatherData.ok) {
      throw new Error(`There's an error!`);
    }
    let userWeather = await userWeatherData.json();
  } catch (error) {
    console.error(error);
    window.location.replace(`./error.html`);
  }
});
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
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  plantImage.src = "";
  getPlant();
 
});

// searchBar.addEventListener()
// return response.json();

imgBtn.addEventListener("click", function () {
  mainContainer.classList.remove("hidden");
  mapContainer.classList.add("hidden");
});

locationBtn.addEventListener("click", function () {
  mapContainer.classList.remove("hidden");
  mainContainer.classList.add("hidden");
});

// Google Map API:
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
      plantName.innerHTML = `${data.data[0].common_name}`;
      otherName.innerHTML = `(${data.data[0].other_name})`;
      scientificName.innerHTML = `${data.data[0].scientific_name}`;
      water.innerHTML = `Watering: ${data.data[0].watering}`;
      sun.innerHTML = `Sunlight: ${data.data[0].sunlight}`;
      plantImage.src = `${data.data[0].default_image.thumbnail}`
      localStorage.setItem("recentSearch", `${data.data[0].common_name}`);
      
     
    });
}

let plantNames = [];

for (let i = 1; i <= 1; i++) {
  fetch(`https://perenual.com/api/species/details/${i}?key=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      plantNames.push(data.common_name);
    });
}

let availableTags = plantNames;
$(function () {
  $("#tags").autocomplete({
    source: availableTags,
  });
});


  let save = document.querySelector("#save-btn")
  save.addEventListener("click", function(){
    // ask TA how to aviod dupilicating
    let search = localStorage.getItem("recentSearch")
    let savedSearchEL = document.createElement("p")
    savedSearchEL.innerHTML = search 
  
  let Search1 = document.querySelector("#Search-1");
  Search1.appendChild(savedSearchEL)


} )


