var apiKey = "sk-iCaf64474eccc478b625";
var imgBtn = document.querySelector(".image-btn");

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

imgBtn.addEventListener("click", function () {
  console.log("clicked");
});

// Google Places Map API with Search Box
// Name search element id="autocomplete"
// Name map element id="map" requires width and height in CSS

// TODO: Update "center" based on user's input; need to grab geocoder for it:
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.867, lng: -117.998 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // TODO: change it so that it always searches for "plants" in user's input (location)
  const input = document.getElementById("autocomplete");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];
  let infoWindows = [];

  searchBox.addListener("places_changed", function () {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    infoWindows.forEach(function (infoWindow) {
      infoWindow.close();
    });

    markers = [];
    infoWindows = [];

    const bounds = new google.maps.LatLngBounds();

    places.forEach(function (place) {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        // DONE: displays custom icon (sprout) for each marker
        url: "./assets/images/plant.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      const marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
      });
      markers.push(marker);

      const infowindow = new google.maps.InfoWindow({
        content: `${place.name}<br>${place.formatted_address}`,
        position: place.geometry.location,
        pixelOffset: new google.maps.Size(-23, -5),
      });

      infoWindows.push(infowindow);

      marker.addListener("click", function () {
        infowindow.open(map, marker);
        // TODO: save the following "li"s in local storage and display them in a separate page
        let li = document.createElement("li");
        li.innerHTML = `${place.name}<br>${place.formatted_address}<br>Rating: ${place.rating}/5`;
        document.getElementById("list-of-stores").appendChild(li);
      });

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;

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
