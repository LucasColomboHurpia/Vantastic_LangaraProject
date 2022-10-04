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
let librarians;

//nPins dictates the number of desired pins to be rendered by the places API
let nPins = document.getElementById('locationCounter').value
let orangeMarker = "./Assets/orange marker.png"

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

let alreadyLoaded = false

//Activates Gmaps API
function initMap() {
    console.log('map started on main page')
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
              icon: "./Assets/red marker.png",
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
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        //if Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, VancouverLatlng);
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
      let infowindow = new google.maps.InfoWindow({
        content: createContentString(place), //creates a custom info window using the object parameters
      });

      //creates and adds the google maps marker
      const marker = new google.maps.Marker({
        position: place.position,
        map,
        title: place.title,
        icon: place.icon,
      });
      if (place.category == 'pointOfInterest') {
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

        //checks if marker should be stored as a point of interest

      } //adds marker to the array
      currentVisibleMarkers.push(marker)
    }

    ///---------------------------------------------------------------------------------------------
    ///Places API///

    //Calls the google places API for its database
    placesAPIRequest = function (type, position, npins) {

      requestPlaces.location = position //sets location as a parameter
      requestPlaces.type[0] = type //sets chosen type as a parameter

      //Delete pins and empty the array
      deletePins(currentVisibleMarkers)
      currentVisibleMarkers = [];

      //Sets how many markers will be rendered
      nPins = npins

      //Makes the API call
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(requestPlaces, callbackPlacesAPI);
    }

    //callback for the google places API
    function callbackPlacesAPI(results, status) {

      //Checks if the status response is OK
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        //Loops through the array
        for (i = 0; i < results.length; i++) {
          let place = results[i];
          console.log(place.photos)
          //gets the coordinates 
          let lat = (place.geometry.location.lat())
          let lng = (place.geometry.location.lng())

          //checks if price level is available
          let priceLevel;
          place.price_level > 0 ? priceLevel = place.price_level : priceLevel = 'Not available'

          //Creates a new object with the information provided by google
          let newPlace = {
            name: place.name,
            title: place.name,
            address: place.vicinity,
            picture: place.photos[0].getUrl(),
            position: { lat, lng },
            rating: place.rating,
            numberOfRatings: place.user_ratings_total,
            priceLevel: priceLevel,
            type: place.types,
            id: place.place_id,
            icon: orangeMarker,
            description: '',
            category: 'pointOfInterest'
          }
          //https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceReview

          //Creates the new Pin based on the object
          pinMarker(newPlace)

          //checks if the set requirement by nPin was met
          if (i == nPins - 1) { i = results.length }
        }
      }
    }

    //------------------------------------------------------------------
    /// Sets up the button for TESTING
    document.getElementById('load').addEventListener("click", () => {
      requestPlaces.location = currentPosition
      let dropdownValue = document.getElementById('exampleFormControlSelect1').value
      requestPlaces.type[0] = dropdownValue
      nPins = document.getElementById('locationCounter').value

      placesAPIRequest(dropdownValue, currentPosition, nPins)
    })
    //------------------------------------------------------------------
    //set markers around Vancouver
    aroundVancouverMarkers = function () {

      let invisibleMarkers = [
        { lat: 49.26619806343015, lng: -123.1857251774933 },
        { lat: 49.23321894517517, lng: -123.16840324520768 },
        { lat: 49.23378448708606, lng: -123.0690908334368 },
        { lat: 49.26851453010027, lng: -123.07305406904976 },
        { lat: 49.290754750354566, lng: -123.13429634796184 },
        { lat: 49.33972774400079, lng: -123.16267193737758 },
        { lat: 49.33387484028106, lng: -123.05406896259956 },
        { lat: 49.26137950331339, lng: -123.12082629486389 },
        { lat: 49.22790174959055, lng: -123.1146204699535 },
      ]
      nPins = 3

      for (point of invisibleMarkers) {
        const marker = {
          position: point,
          map,
          title: 'invisible',
          icon: './Assets/Empty.png',
          category: 'invisible'
        };
        point = marker
        pinMarker(point)

        //
        let dropdownValue = document.getElementById('exampleFormControlSelect1').value
        placesAPIRequest(dropdownValue, point.position, 3)
      }
    }

    //set object with our functions
    librarians = {
      pinMaker: pinMarker,
      deletePins: deletePins,
      placesAPIRequest: placesAPIRequest,
      aroundVancouverMarkers: aroundVancouverMarkers,
    }

 

  // Delete pins
  function deletePins(arrayOfMarkers) {
    if (arrayOfMarkers.length > 0) { //checks if there is something to delete
      for (pin of arrayOfMarkers) { // loops through the array
        pin.setMap(null); //deletes the pin
      }
    }
  }

  // Close info window when a new one is open
  const closeinfoWindow = (infowindow) => {
    if (currentInfoWindow.length > 0) {
      currentInfoWindow[0].close()
      currentInfoWindow[0] = infowindow
    } else {
      currentInfoWindow[0] = infowindow
    }
  }


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
          console.log('duration:', data.duration.text)
        }

        ///---------------------------------------------------------------------------------------------
        //output (STILL IN TESTING PHASE)
        output.innerHTML = `
        <div><b>Departure:</b> ${googleRoute.departure_time.text}</div>
        <div><b>Arrival:</b> ${googleRoute.arrival_time.text}</div>
        <div><b>Distance:</b> ${googleRoute.distance.text}</div>
        <div class="mb-2"><b>Duration:</b> ${googleRoute.duration.text}</div>
      `
        for (data of dataArray) {
          output.innerHTML += `
        <div>${data.instructions} <b>${data.duration.text}</b></div>
        `
        }
        ///---------------------------------------------------------------------------------------------

        //renders the directon in the map
        directionsRenderer.setDirections(result);
      } else {
        console.log('Directions Services not available')
      }
    });
  }
}

//--------------------------------------------------------------------
/// Buttons for the TESTING interface

//Testing button to finding the user
let findMe = document.getElementById('findMe')
findMe.addEventListener('click', () => { findUser() })

//Testing button to deleting markers
let deleteButton = document.getElementById('deleteButton')
deleteButton.addEventListener('click', () => { deletePins(currentVisibleMarkers) })

//Testing button for changing the map style
let changeStyle = document.getElementById('changeStyle')
changeStyle.addEventListener('click', () => {
  if (myMapId == 'd04e37658de12594') { myMapId = 'ffcaa1df68a4459b' }
  else if (myMapId == 'ffcaa1df68a4459b') { myMapId = 'd04e37658de12594' }
  initMap()
})

//Testing button for toggling control
let toggleControls = document.getElementById('toggleControls')
toggleControls.addEventListener('click', () => {
  myMapTypeControl = !myMapTypeControl
  myFullscreenControl = !myFullscreenControl
  myStreetViewControl = !myStreetViewControl
  initMap()
})

//Testing button to finding the user
let loadVancouverButton = document.getElementById('loadVancouver')
loadVancouverButton.addEventListener('click', () => { aroundVancouverMarkers() })

//d04e37658de12594 map id default
//ffcaa1df68a4459b normal map id 

//----------------------------------------------------------------------------------------------------

//sets up HTML and style yo infowindow
const createContentString = (place) => {
  let infoWindowString = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${place.picture}">
      <div class="card-body">
        <h5 class="card-title">${place.name}</h5>
        <p class="card-text">${place.address}</p>
        <p class="card-text"><b>Rating: </b>${place.rating} (${place.numberOfRatings} ratings)</p>
        <p class="card-text"><b>Price Level: </b>${place.priceLevel}/5</p>
      </div>
      <button type="button" class="btn btn-primary" onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
    </div>
    `
  return infoWindowString
}
