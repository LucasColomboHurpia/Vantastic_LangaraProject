//Array to store and manage custom markers
let currentVisibleMarkers = []

//Array to store and manage info window
let currentInfoWindow = []

//default position
let currentPosition = {};
let userMarker = false;

//global variables
let directionsService;
let directionsRenderer;
let pinMarker;
let findUser;
let placesAPIRequest;
let aroundVancouverMarkers;
let challengeMarker;
let librarians;

const orangeMarker = "../Assets/orange marker.png"
const yellowMarker = "../Assets/yellow marker.png"

//nPins dictates the number of desired pins to be rendered by the places API
/* let nPins = document.getElementById('locationCounter').value
 */

// Object to manage the google places API
let requestPlaces = {
  location: currentPosition, //default
  radius: '50000', //max range is 50km
  type: ['restaurant'] //default
}

//map ID to be used for different styles
let myMapId = 'd04e37658de12594'

//////////////////////////////////////////////////
//map declarations
let map;
let myMapTypeControl = false;
let myFullscreenControl = false;
let myStreetViewControl = false;


//Activates Gmaps API
async function initMap() {
  try {
    //sets default position to downtown
    let VancouverLatlng = new google.maps.LatLng(49.281709, -123.119305); //sets location to downtown
    currentPosition = VancouverLatlng //sets current position to downtown

    //starts the map and set parameters
    map = new google.maps.Map(document.getElementById("map"), {
      mapId: myMapId,
      center: VancouverLatlng,
      zoom: 12,

      //map control starts deactivate
      mapTypeControl: myMapTypeControl,
      fullscreenControl: myFullscreenControl,
      streetViewControl: myStreetViewControl,
    });


    ////---------------------------------------------------------------------------------------------
    ///Declarations to make routes work
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    ///---------------------------------------------------------------------------------------------
    //Calculates the route, takes coordinates and the mode of transportarion
    //Available modes are //DRIVING, BICYCLING, TRANSIT, WALKING//

    const calculateRoute = (lat, lng, mode) => {
      let start = currentPosition; //start route
      let end = { lat, lng }; //end route

      //sets up request object for the API
      let request = {
        origin: start,
        destination: end,
        travelMode: mode //DRIVING, BICYCLING, TRANSIT, WALKING  
      };

      //Makes the route API request
      directionsService.route(request, function (result, status) {
        //checks if the status of the response is OK
        if (status == 'OK') {
          //gets data from the response
          let googleRoute = result.routes[0].legs[0]
          let dataArray = googleRoute.steps
          for (data of dataArray) {
            console.log('duration:', googleRoute.departure_time)
          }

          //output
          let directionInfo = document.getElementById('directionInfo');

          directionInfo.innerHTML = `
                    <div id="departure" class="direction"><b>Departure:</b> ${googleRoute.departure_time.text}</div>
                    <div id="arrival" class="direction"><b>Arrival:</b> ${googleRoute.arrival_time.text}</div>
                    <div id="distance" class="direction"><b>Distance:</b> ${googleRoute.distance.text}</div>
                    <div id="duration" class="direction"><b>Duration:</b> ${googleRoute.duration.text}</div>

            `
          for (data of dataArray) {
            directionInfo.innerHTML += `
              <div class="direction">${data.instructions} <b>${data.duration.text}</b></div>
              `
          }


          //renders the directon in the map
          directionsRenderer.setDirections(result);
        } else {
          console.log('Directions Services not available')
        }
      });
    }


    ///////Pan to current location

    //sets up function to find user
    findUser = function () {
      // chechs if the navigator has geolocation
      if (navigator.geolocation) {
        ///gets the current position by geolocation
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //set up the position in an object
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            //-----------------------------------------
            //sets up infoWindow
            let infowindow = new google.maps.InfoWindow({
              content: "Location found!"
            });

            //checks if there is a userMarker already
            if (userMarker) { userMarker.setMap(null); }
            //Creates the userMarker
            userMarker = new google.maps.Marker({
              position: pos,
              map,
              title: "You are here!",
              icon: "../Assets/red marker.png",
            });

            //adds infowindow when clicked
            userMarker.addListener("click", () => {
              infowindow.open({
                anchor: userMarker,
                map,
                shouldFocus: true,
              });
            });
            //update currentPosition 
            currentPosition = pos;
            map.panTo(currentPosition) //https://developers.google.com/maps/documentation/javascript/reference/map#Map.setCenter
            
        //Calculates the route, takes coordinates and the mode of transportarion
        //Available modes are //DRIVING, BICYCLING, TRANSIT, WALKING//
        const coord = JSON.parse(localStorage.getItem('destination'));
        calculateRoute(coord.lat, coord.lng, 'TRANSIT')

          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );

        //Calculates the route, takes coordinates and the mode of transportarion
        //Available modes are //DRIVING, BICYCLING, TRANSIT, WALKING//
        const coord = JSON.parse(localStorage.getItem('destination'));
        calculateRoute(coord.lat, coord.lng, 'TRANSIT')

      } else {
        //if Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, VancouverLatlng);
        //Calculates the route, takes coordinates and the mode of transportarion
        //Available modes are //DRIVING, BICYCLING, TRANSIT, WALKING//
        const coord = JSON.parse(localStorage.getItem('destination'));
        calculateRoute(coord.lat, coord.lng, 'TRANSIT')

      }
    };
    //Deal with errors
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
    }

    ///---------------------------------------------------------------------------------------------
    ///marker///

    //sets up function to build markers
    pinMarker = function (place) {

      //creates and adds the google maps marker
      const marker = new google.maps.Marker({
        position: place.position,
        map,
        title: place.title,
        icon: place.icon,
      });

      //if place is a point of interest, sets up a specific info window
      if (place.category == 'pointOfInterest') {

        let infowindow = new google.maps.InfoWindow({
          content: createContentString(place), //creates a custom info window using the object parameters
        });

        //adds infowindow when clicked
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });

          //Close infowindow when a new one is open
          closeinfoWindow(infowindow)
        });
        //focus the window
        infowindow.focus()
      }

      //if place is a challengeSpot, sets up a special info window
      if (place.category == 'challengeStep') {
        specific
        let infowindow = new google.maps.InfoWindow({
          content: createChallengStepString(place), //creates a custom info window using the object parameters
        });

        //adds infowindow when clicked
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });

          //Close infowindow when a new one is open
          closeinfoWindow(infowindow)
        });
        //focus the window
        infowindow.focus()
      }

      //adds marker to the array
      currentVisibleMarkers.push(marker)
    }

    findUser();




  } catch (error) { console.log(error) }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------


// Close info window when a new one is open
const closeinfoWindow = (infowindow) => {
  if (currentInfoWindow.length > 0) {
    currentInfoWindow[0].close()
    currentInfoWindow[0] = infowindow
  } else {
    currentInfoWindow[0] = infowindow
  }
}





//--------------------------------------------------------------------

//d04e37658de12594 map id default
//ffcaa1df68a4459b normal map id 

//sets up HTML and style yo infowindow
const createContentString = (place) => {
  let infoWindowString = `
    <div class="infoWindowContainer">
    <img class="infoWindowImg" src="${place.picture}">
    <div class="infoWindow-body">
      <h5 class="infoWindow-title">${place.name}</h5>
      <p class="infoWindow-text">${place.address}</p>
      <p class="infoWindow-text"><b>Rating: </b>${place.rating} (${place.numberOfRatings} ratings)</p>
      <p class="infoWindow-text"><b>Price Level: </b>${place.priceLevel}</p>
    </div>
    <button type="button" class="infoWindow-btn"
      onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
  </div>
  `
  return infoWindowString
}

