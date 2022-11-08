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
let calculateRoute;
let placesAPIRequest;
let aroundVancouverMarkers;
let challengeMarker;
let librarians;

//step shortcuts
let step1Shortcut;
let step2Shortcut;
let step3Shortcut;

const orangeMarker = "../Assets/orange marker.png"
const yellowMarker = "../Assets/yellow marker.png"

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

/////////////-------------------------------------------------------------------/////////////////////////////////////
const markerN1 = "../Assets/number 1 - marker.png";
const markerN2 = "../Assets/number 2 - marker.png";
const markerN3 = "../Assets/number 3 - marker.png";

const orangeMarkerN1 = "../Assets/number 1 - orange marker.png";
const orangeMarkerN2 = "../Assets/number 2 - orange marker.png";
const orangeMarkerN3 = "../Assets/number 3 - orange marker.png";

//get Challenge from storage
const challenge = JSON.parse(localStorage.getItem('challenge'));
console.log(challenge)

let userResults = JSON.parse(localStorage.getItem('user'))
let userPreferences = userResults.preferences
let surveyResults = userResults.preferences.surveyResults
/////////////-------------------------------------------------------------------/////////////////////////////////////


//Activates Gmaps API
async function initMap() {
  try {
    //sets default position to downtown
    let VancouverLatlng = new google.maps.LatLng(49.281709, -123.119305); // location downtown
    let challengeLatLng = {lat: challenge.areaCoordinates.lat, lng: challenge.areaCoordinates.lng}

    currentPosition = VancouverLatlng //sets current position to downtown

    //starts the map and set parameters
    map = new google.maps.Map(document.getElementById("map"), {
      mapId: myMapId,
      center: challengeLatLng,
      zoom: 14,

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

    calculateRoute = function (lat, lng, mode) {
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

          directionInfo.innerHTML += `
          <br>
          <div class="returnButton" id="returnButton" onclick="showChallengeSteps(challenge);initMap()">Return</div>
          `

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
             //https://developers.google.com/maps/documentation/javascript/reference/map#Map.setCenter
            
        //Calculates the route, takes coordinates and the mode of transportarion
//---------------------------------------------------------------------------------------------------------        
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

      //if place is a challengeSpot, sets up a special info window
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

        //-------------------------------

        let step1 = document.getElementById('step1')
        if(place.icon == markerN1){
          step1.addEventListener("click", () => {
            console.log('clicked')

            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            });
  
            //Close infowindow when a new one is open
            closeinfoWindow(infowindow)
          });
        }

        let step2 = document.getElementById('step2')
        if(place.icon == markerN2){
          step2.addEventListener("click", () => {
            console.log('clicked')

            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            });
  
            //Close infowindow when a new one is open
            closeinfoWindow(infowindow)
          });
        }        
        
        let step3 = document.getElementById('step3')
        if(place.icon == markerN3){
          step3.addEventListener("click", () => {
            console.log('clicked')

            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            });
  
            //Close infowindow when a new one is open
            closeinfoWindow(infowindow)
          });
        }


    /*     stepInstructions.addEventListener('click',()=>{
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });

          //Close infowindow when a new one is open
          closeinfoWindow(infowindow)
        }) */


      }

      //adds marker to the array
      currentVisibleMarkers.push(marker)
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


    findUser();
    showChallengeSteps(challenge);
    showChallengeInfo(challenge);
    challengeMarker(challenge);
    map.panTo(challengeLatLng)

  } catch (error) { console.log(error) }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------

const loadChallengeSteps = (challenge) =>{
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

}

const showChallengeSteps = (challenge) => {
  let challengeTitle = document.getElementById('challengeName');
  let challengeInfo = document.getElementById('directionInfo');

  console.log(challenge)

  //if low
  let challengeSteps = challenge.steps.low
  //if high
  // let challengeSteps = challenge.steps.high

  challengeTitle.innerHTML = `${challenge.name}`

  challengeInfo.innerHTML = `
            <div class="direction" id="step1"><div class="stepContainer"><img src="../Assets/designer-assets/png-icons-uploadpicture.png" width="100px"/> ${challengeSteps[0].desc}</div></div>
            <div class="direction" id="step2"><div class="stepContainer"><img src="../Assets/designer-assets/png-icons-uploadpicture.png" width="100px"/> ${challengeSteps[1].desc}</div></div>
            <div class="direction" id="step3"><div class="stepContainer"><img src="../Assets/designer-assets/png-icons-uploadpicture.png" width="100px"/> ${challengeSteps[2].desc}</div></div>
            <br>
            <div class="returnButton" id="returnButton" onclick="history.back()">Return</div>

            `

}
showChallengeSteps(challenge);

// Close info window when a new one is open
const closeinfoWindow = (infowindow) => {
  if (currentInfoWindow.length > 0) {
    currentInfoWindow[0].close()
    currentInfoWindow[0] = infowindow
  } else {
    currentInfoWindow[0] = infowindow
  }
}

const showChallengeInfo = (challenge) => {

  if (userPreferences.budget == 'low') {
      let placeMarker = {
          position: {lat:'',lng:''},
          title: '',
          name: '',
          icon: '',
          category: 'challengeStep',
          description: '',
          image: '',
      }
      for (let i = 0; i < challenge.steps.low.length; i++) {

          let challengeStep = challenge.steps.low[i]

          //checks if there are specific coordinates for the step
          if(challengeStep.coord==false){console.log('has no coordinates')}
          else{
              if(i==0){placeMarker.title = 'First Step!' ;placeMarker.icon = markerN1; }
              if(i==1){placeMarker.title = 'Second Step!';placeMarker.icon = markerN2; }
              if(i==2){placeMarker.title = 'Third Step!' ;placeMarker.icon = markerN3; }
              placeMarker.title = challenge.name
              placeMarker.name = challenge.name
              placeMarker.description = challengeStep.desc
              placeMarker.image = challengeStep.image
              placeMarker.position = {lat: challengeStep.coord.lat, lng: challengeStep.coord.lng}
              pinMarker(placeMarker)
          }

          //checks if there are specific TAGS for the step
          if(challengeStep.tag==false){console.log('has no tags')}
          else{
              if(i==0){placeMarker.title = 'First Step!' ;placeMarker.icon = orangeMarkerN1; }
              if(i==1){placeMarker.title = 'Second Step!';placeMarker.icon = orangeMarkerN2; }
              if(i==2){placeMarker.title = 'Third Step!' ;placeMarker.icon = orangeMarkerN3; }
              placeMarker.description = challengeStep.desc
              placeMarker.image = challengeStep.image
              let placeMarkerPosition = {lat: challengeStep.coord.lat, lng: challengeStep.coord.lng}
              setTimeout(() => {
              placesAPIRequest(challengeStep.tag[0], placeMarkerPosition, 3, false,  1200) //(type, position, npins, remove, radius)
          }, i * 6000);
          }
      }
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

const createChallengeString = (challenge) => {
  let challengeSteps = '';

    //if low
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
