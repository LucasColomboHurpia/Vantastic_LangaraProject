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

//current coords for method change
let currentLat;
let currentLng;


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
let challenge = JSON.parse(localStorage.getItem('challenge'));

let userPreferences = user.preferences
let surveyResults = user.preferences.surveyResults


//Activates Gmaps API
async function initMap() {
  try {
    //sets default position to downtown
    let VancouverLatlng = new google.maps.LatLng(49.281709, -123.119305); // location downtown
    let challengeLatLng = { lat: challenge.areaCoordinates.lat, lng: challenge.areaCoordinates.lng }

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
    // Create button inside the map
    const centerControlDiv = document.createElement("div");
    centerControlDiv.innerHTML = '<span id="findMeButton" onclick="findME()"><img src="../Assets/red marker.png" width="15px"/>Find me</span>'
    centerControlDiv.classList.add('mapButton')
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
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

      //sets up variables for method change
      currentLat = lat;
      currentLng = lng;

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
          directionInfo.innerHTML = ''

/*           directionInfo.innerHTML += `
            <div class="flexCenter">
              <select name="selectmMthod" id="methodInput" onchange="changeMethod()">
                <option value="TRANSIT" class="optText">Public Transport</option>
                <option value="WALKING" class="optText">Walk</option>
                <option value="DRIVING" class="optText">Drive</option>
                <option value="BICYCLING" class="optText">Biking</option>
              </select>
            </div>
          ` */
          
          console.log(googleRoute)
          //checks results compability
          if(googleRoute.departure_time){
            directionInfo.innerHTML += `<div id="departure" class="direction"><b>Departure:</b> ${googleRoute.departure_time.text}</div>`
          } 
          if(googleRoute.arrival_time){
            directionInfo.innerHTML += `<div id="arrival" class="direction"><b>Arrival:</b> ${googleRoute.arrival_time.text}</div>`
          } 
          if(googleRoute.distance){
            directionInfo.innerHTML += `<div id="distance" class="direction"><b>Distance:</b> ${googleRoute.distance.text}</div>`
          } 
          if(googleRoute.duration){
            directionInfo.innerHTML += `<div id="duration" class="direction"><b>Duration:</b> ${googleRoute.duration.text}</div>`
          } 
          
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
        if (place.icon == markerN1) {
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
        if (place.icon == markerN2) {
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
        if (place.icon == markerN3) {
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
        icon: challenge.marker,
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

const loadChallengeSteps = (challenge) => {
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

//----------------------------------------------------------------------------
//if low
let challengeSteps = challenge.steps.low
//if high
// let challengeSteps = challenge.steps.high
//----------------------------------------------------------------------------


const showChallengeSteps = (challenge) => {
  let challengeTitle = document.getElementById('challengeName');
  let challengeInfo = document.getElementById('directionInfo');

  console.log(challenge)

  challengeTitle.innerHTML = `${challenge.name}`

  let defaultImg = '../Assets/designer-assets/png-icons-uploadpicture.png'

  challengeInfo.innerHTML = '';

  let i = 0;
  for (step of challengeSteps) {
    if (step.done) {
      challengeInfo.innerHTML += `<div class="stepDone" id="step${i+1}"><div class="stepContainer"><img src="${step.image}" onclick="showModal('${step.desc}',${i},'${step.image}')" class="imgStep" width="100px"/> ${step.desc}</div></div>`
    } else {
      challengeInfo.innerHTML += `<div class="direction" id="step${i+1}"><div class="stepContainer"><img src="${step.image}" onclick="showModal('${step.desc}',${i},'${step.image}')" class="imgStep" width="100px"/><div class="submit">Submit</div> ${step.desc}</div></div>`
    }
    i++;
  }
  challengeInfo.innerHTML += `
  <br>
  <div class="returnButton" id="returnButton" onclick="history.back()">Return</div>
`
  ///-----------------------------------------------------------------
  //check if complete

  if (challengeSteps[0].done && challengeSteps[1].done && challengeSteps[2].done) {
    setTimeout(()=>{challengeCompletion()}, 2000)
  }
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
      position: { lat: '', lng: '' },
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
      if (challengeStep.coord == false) { console.log('has no coordinates') }
      else {
        if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = markerN1; }
        if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = markerN2; }
        if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = markerN3; }
        placeMarker.title = challenge.name
        placeMarker.name = challenge.name
        placeMarker.description = challengeStep.desc
        placeMarker.image = challengeStep.image
        placeMarker.position = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
        pinMarker(placeMarker)
      }

      //checks if there are specific TAGS for the step
      if (challengeStep.tag == false) { console.log('has no tags') }
      else {
        if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = orangeMarkerN1; }
        if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = orangeMarkerN2; }
        if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = orangeMarkerN3; }
        placeMarker.description = challengeStep.desc
        placeMarker.image = challengeStep.image
        let placeMarkerPosition = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
        setTimeout(() => {
          placesAPIRequest(challengeStep.tag[0], placeMarkerPosition, 3, false, 1200) //(type, position, npins, remove, radius)
        }, i * 6000);
      }
    }
  }

  if (userPreferences.budget == 'high') {
    let placeMarker = {
      position: { lat: '', lng: '' },
      title: '',
      name: '',
      icon: '',
      category: 'challengeStep',
      description: '',
      image: '',
    }
    for (let i = 0; i < challenge.steps.high.length; i++) {

      let challengeStep = challenge.steps.high[i]

      //checks if there are specific coordinates for the step
      if (challengeStep.coord == false) { console.log('has no coordinates') }
      else {
        if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = markerN1; }
        if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = markerN2; }
        if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = markerN3; }
        placeMarker.title = challenge.name
        placeMarker.name = challenge.name
        placeMarker.description = challengeStep.desc
        placeMarker.image = challengeStep.image
        placeMarker.position = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
        pinMarker(placeMarker)
      }

      //checks if there are specific TAGS for the step
      if (challengeStep.tag == false) { console.log('has no tags') }
      else {
        if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = orangeMarkerN1; }
        if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = orangeMarkerN2; }
        if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = orangeMarkerN3; }
        placeMarker.description = challengeStep.desc
        placeMarker.image = challengeStep.image
        let placeMarkerPosition = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
        setTimeout(() => {
          placesAPIRequest(challengeStep.tag[0], placeMarkerPosition, 3, false, 1200) //(type, position, npins, remove, radius)
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
    <div class="infoWindow-body">
      <h5 class="infoWindow-title">${challenge.name}</h5>
      <p class="infoWindow-text">${challenge.description}</p>
      <p class="infoWindow-text">
        ${challengeSteps}  
      </p>
    </div>
    <button type="button" class="infoWindow-btn"
      onclick="calculateRoute(${challenge.areaCoordinates.lat},${challenge.areaCoordinates.lng},'TRANSIT')">See route</button>
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
      <p class="infoWindow-text">${place.description}</p>
    </div>
    <button type="button" class="infoWindow-btn"
    onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
    </div>
  `
  return infoWindowString
}

const findME = () => {
  findUser();
  map.panTo(currentPosition)
}


///---------------------------------------------------------------------------------------------

//MODAL//

//declare elements
buttonUpload = document.getElementById('buttonUpload')
fileInput = document.getElementById('fileInput')
submitbutton = document.getElementById('submitbutton')
buttonTakePic = document.getElementById('buttonTakePic')
displayImage = document.getElementById('display-image')
videoModal = document.getElementById('videoModal')
snapButton = document.getElementById('snapButton')

// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close")[1];

stepIndex = 0;

const showModal = (desc, index, img) => {
  (document.getElementById('modalText')).innerHTML = desc
  stepIndex = index
  modal.style.display = "block";
  videoModal.style.display = "none";
  snapButton.style.display = "none";
  submitbutton.style.display = "none";

  if (challengeSteps[stepIndex].done) {
    displayImage.style.backgroundImage = `url(${img})`;
    console.log("done!")
  } else {
    displayImage.style.backgroundImage = ``;
  }
}

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = "none";
  if (videoModal.style.display == 'block') {
    displayImage.style.display = 'block'

    const tracks = videoModal.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }
}
)
span2.addEventListener('click', () => {
  modalCompletion.style.display = "none";
  if (videoModal.style.display == 'block') {
    displayImage.style.display = 'block'

    const tracks = videoModal.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }
}
)
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    if (videoModal.style.display == 'block') {
      displayImage.style.display = 'block'
      const tracks = videoModal.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

}


//upload button
buttonUpload.addEventListener('click', () => {
  videoModal.style.display = 'none';
  displayImage.style.display = 'block'
  submitbutton.style.display = "flex";
  snapButton.style.display = "none";
  fileInput.click()
})

//when image is selected by user, activates this
let uploaded_image;
fileInput.onchange = () => {


  console.log(fileInput.files[0]);

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    displayImage.style.backgroundImage = `url(${uploaded_image})`;
    console.log(typeof uploaded_image);

    //Storing in firestore storage
    const ref = firebase.storage().ref();
    const userid = user.id
    const challengeID = challenge.id
    const name = "step" + stepIndex + "-image";

    //'images/user1234/file.txt'
    ref.child(userid+'/'+challengeID+'/'+name).putString(uploaded_image, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
    });
  });
  reader.readAsDataURL(fileInput.files[0]);
  snapButton.style.display = "none";
  submitbutton.style.display = "flex";
}


buttonTakePic.addEventListener("click", () => {
  displayImage.style.display = 'none'
  videoModal.style.display = 'block';
  submitbutton.style.display = "none";
  snapButton.style.display = "flex";

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      //video.src = window.URL.createObjectURL(stream);
      videoModal.srcObject = stream;
      // video.play();  // or autplay
    });
  } else {
    console.log('media devices not available in this browser');
  }
})

//submit challenge
submitbutton.addEventListener("click", () => {
  modal.style.display = "none";

  challengeSteps[stepIndex].image = uploaded_image
  challengeSteps[stepIndex].done = true

  showChallengeSteps(challenge)

  submitbutton.style.display = "none";
})

//snap
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
snapButton.addEventListener("click", () => {
  canvas.width = videoModal.videoWidth;
  canvas.height = videoModal.videoHeight;
  context.drawImage(videoModal, 0, 0);

  //we can pass the content of canvas as blob (a file like object)
  const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
})

function handleBlob(blob) {
  const tracks = videoModal.srcObject.getTracks();
  tracks.forEach((track) => track.stop());

  // we can turn the blob into DOMString
  const objectURL = window.URL.createObjectURL(blob);

  console.log(objectURL)

  displayImage.style.backgroundImage = `url(${objectURL})`;
  videoModal.style.display = 'none';
  displayImage.style.display = 'block';
  submitbutton.style.display = "flex";
  snapButton.style.display = "none";

  uploaded_image = objectURL

  //if we want to store the image into server, one way is to
  //create base64 rendition of the the blob using FileReader
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log('Base64:', reader.result);
  });
  // if you want to deal with it as base64 string (e.g. img src)
  reader.readAsDataURL(blob);
  //if you want to read it binary
  //reader.readAsArrayBuffer(blob);
}

///---------------------------------------------------------------------------------------------
// -------- CHALLENGE COMPLETION --------


const challengeCompletion = () => {

  let modalCompletion = document.getElementById('modalCompletion');

  modalCompletion.style.display = 'block'

  modalCompletion.classList.add('animationSlideIN')


  document.getElementById('congratsDesc').innerHTML = `You completed <b>${challenge.name}</b>!`

  checkBadges()
}

const checkBadges = () =>{
  //GET INFO FROM LOCAL STORAGE
let badges = JSON.parse(localStorage.getItem("badges"));

  for(badge of badges){
    if(challenge.id == badge.relation){

      user.badges.push(badge.relation)
      user.challengesDone.push(challenge.id)

      localStorage.setItem("user", JSON.stringify(user));
      console.log(user)
      badge.status = "Completed"
      localStorage.setItem("badges", JSON.stringify(badges));
    }
  }
}

//--------------

const changeMethod = ()=>{
  let methodIndput = document.getElementById('methodInput')
  console.log(methodIndput.value)
  console.log(currentLat)

  console.log(currentLng)


  calculateRoute(currentLat,currentLng,methodIndput.value)
}

//let storage = firebase.storage();

let imgtest = document.getElementById('imagetest')
console.log(imgtest)

/* firebase.storage().ref(`${user.id}/${challenge.id}/step2-image`).getDownloadURL().then(imgURL => {
  imgtest.src = imgURL

}) */

/////////////-------------------------------------------------------------------/////////////////////////////////////
let challengesDone = user.challengesDone
console.log(challengesDone)

/////////////-------------------------------------------------------------------/////////////////////////////////////
