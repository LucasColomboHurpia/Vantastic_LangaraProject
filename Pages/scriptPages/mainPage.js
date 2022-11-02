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

      //if place is a challengeSpot, sets up a specific info window
      if (place.category == 'challengeStep') {
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

    ///---------------------------------------------------------------------------------------------
    ///Places API///

    //Calls the google places API for its database
    placesAPIRequest = function (type, position, npins, remove, radius, category) {
      console.log('TYPE IS', type)
      requestPlaces.location = position //sets location as a parameter
      requestPlaces.type[0] = type //sets chosen type as a parameter

      //chekc if there is a radius specification
      if (radius) {
        requestPlaces.radius = radius
      } else { requestPlaces.radius = 50000 }

      //Delete pins and empty the array
      if (remove) {
        console.log('remove',)
        deletePins(currentVisibleMarkers)
        currentVisibleMarkers = [];
      }

      //Sets how many markers will be rendered
      nPins = npins

      //Makes the API call
      if (!category) {
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(requestPlaces, callbackPlacesAPI);
      }
      else if (category == 'arounVan') {
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(requestPlaces, callbackPlacesAPIaroundVan);
      }
    }

    //callback for the google places API //default
    function callbackPlacesAPI(results, status) {

      //Checks if the status response is OK
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)

        //Loops through the array
        for (i = 0; i < results.length; i++) {
          let place = results[i];

          //gets the coordinates 
          let lat = (place.geometry.location.lat())
          let lng = (place.geometry.location.lng())

          //checks if price level is available
          let priceLevel;
          place.price_level > 0 ? priceLevel = place.price_level : priceLevel = 'Not available'

          //checks if photos is valid
          let photosAPI = '../Assets/default_img.jpg'
          /*           if(place.photos[0]){photosAPI=place.photos[0]}
           */
          //Creates a new object with the information provided by google
          let newPlace = {
            name: place.name,
            title: place.name,
            address: place.vicinity,
            picture:  place.photos[0].getUrl(),
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

          //Creates the new Pin based on the object
          pinMarker(newPlace)

          //checks if the set requirement by nPin was met
          if (i == nPins - 1) { i = results.length }
        }
      }
    }

    //callback for the google places API //default
    function callbackPlacesAPIaroundVan(results, status) {

      //Checks if the status response is OK
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)

        //Loops through the array
        for (i = 0; i < results.length; i++) {
          let place = results[i];

          //gets the coordinates 
          let lat = (place.geometry.location.lat())
          let lng = (place.geometry.location.lng())

          //checks if price level is available
          let priceLevel;
          place.price_level > 0 ? priceLevel = `${place.price_level}/5` : priceLevel = 'Not available'

          //checks if photos is valid
          let photosAPI = '../Assets/default_img.jpg'
          /*           if(place.photos[0]){photosAPI=place.photos[0]}
           */
          //Creates a new object with the information provided by google
          let newPlace = {
            name: place.name,
            title: place.name,
            address: place.vicinity,
            picture:  place.photos[0].getUrl(),
            position: { lat, lng },
            rating: place.rating,
            numberOfRatings: place.user_ratings_total,
            priceLevel: priceLevel,
            type: place.types,
            id: place.place_id,
            icon: yellowMarker,
            description: '',
            category: 'pointOfInterest'
          }

          //Creates the new Pin based on the object
          pinMarker(newPlace)

          //checks if the set requirement by nPin was met
          if (i == nPins - 1) { i = results.length }
        }
      }
    }
    //---------------------------------------------------------------------------------------------------

    //set markers around Vancouver
    aroundVancouverMarkers = function (type, npins) {
      //type, position, npins
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
      if (!npins) { nPins = 3 }

      for (point of invisibleMarkers) {
        const marker = {
          position: point,
          map,
          title: 'invisible',
          icon: '../Assets/Empt',
          category: 'invisible'
        };
        point = marker
        pinMarker(point)

        //
        placesAPIRequest(type, point.position, npins, false, 50000, 'arounVan' )
      }
    }

    //------------Polygons----------------------------------------
    //https://developers.google.com/maps/documentation/javascript/shapes

    challengeMarker = (challenge) => {
      //CIRCLE
      const cityCircle = new google.maps.Circle({
        strokeColor: "#264996",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#264996",
        fillOpacity: 0.25,
        map,
        center: challenge.areaCoordinates,
        radius: 1200,
      });

      //marker
      let newMarker = new google.maps.Marker({
        position: challenge.areaCoordinates,
        map,
        title: challenge.name,
        icon: "../Assets/blue marker.png",
      });

      //INFOWINDOW
      let infowindow = new google.maps.InfoWindow({
        content: createChallengeString(challenge), //creates a custom info window using the object parameters
      });

      //adds infowindow when clicked
      newMarker.addListener("click", () => {
        infowindow.open({
          anchor: newMarker,
          map,
          shouldFocus: true,
        });
        closeinfoWindow(infowindow)
        infowindow.focus()
      });
    }
    //--------------------------------------------------------------------

    //set object with our functions
    librarians = {
      pinMaker: pinMarker,
      deletePins: deletePins,
      placesAPIRequest: placesAPIRequest,
      aroundVancouverMarkers: aroundVancouverMarkers,
      challengeMarker: challengeMarker,
      findUser: findUser,
    }
    console.log('Librarian', librarians)


    librarians.findUser();
    preferences(surveyResults)

  } catch (error) { console.log(error) }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------

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
        console.log('duration:', googleRoute.departure_time)
      }

      ///---------------------------------------------------------------------------------------------
      //output (STILL IN TESTING PHASE)
      /*         output.innerHTML = `
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
       */        ///---------------------------------------------------------------------------------------------

      //renders the directon in the map
      directionsRenderer.setDirections(result);
    } else {
      console.log('Directions Services not available')
    }
  });
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

//add if to high option
const createChallengeString = (challenge) => {
  let challengeSteps = '';
  for (steps of challenge.steps.low) {
    challengeSteps += `<li class="infoWindow-ChallengeStep" >${steps.desc}</li>`
  }

  let infoWindowString = `
    <div class="infoWindowContainer">
    <img class="infoWindowImg" src="${challenge.image}">
    <div class="infoWindow-body">
      <h5 class="infoWindow-title">${challenge.name}</h5>
      <p class="infoWindow-text">${challenge.description}</p>
      <p class="infoWindow-text">
        ${challengeSteps}  
      </p>
    </div>
    <button type="button" class="infoWindow-btn"
      onclick="calculateRoute(${challenge.areaCoordinates.lat},${challenge.areaCoordinates.lng},'TRANSIT')">Start
      Challenge</button>
  </div>
  `
  return infoWindowString
}

//add info for challenge step
const createChallengStepString = (place) => {
  console.log('place is', place)

  let infoWindowString = `
    <div class="infoWindowContainer">
    <img class="infoWindowImgChallenge" src="${place.image}">
    <div class="infoWindow-body">
    <h5 class="infoWindow-title">${place.name}</h5>
      <p class="infoWindow-text">${place.description}</p>
    </div>
    <button type="button" class="infoWindow-btn"
    onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
    </div>
  `
  return infoWindowString
}

//https://developers.google.com/maps/documentation/javascript/shapes

