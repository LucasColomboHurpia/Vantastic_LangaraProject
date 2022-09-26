const orangeMarker = "./Assets/orange marker.png"

//sets up HTML and style yo infowindow
const createContentString = (place) =>{
  let infoWindowString = `
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${place.picture}">
    <div class="card-body">
      <h5 class="card-title">${place.name}</h5>
      <p class="card-text">${place.address}</p>
      <p class="card-text"><b>Rating: </b>${place.rating} (${place.numberOfRatings} ratings)</p>
      <p class="card-text"><b>Price Level: </b>${place.priceLevel}</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
  </div>
  `
  return infoWindowString
}

//Calculates the route, takes coordinates and the mode of transportarion
//Available modes are //DRIVING, BICYCLING, TRANSIT, WALKING//

const calculateRoute = (lat,lng, mode) =>{
  let start = currentPosition; //start route
  let end = {lat,lng}; //end route

  //sets up request object for the API
  let request = {
    origin: start,
    destination: end,    
    travelMode: mode //DRIVING, BICYCLING, TRANSIT, WALKING  
  };

  //Makes the route API request
  directionsService.route(request, function(result, status) {
    //checks if the status of the response is OK
    if (status == 'OK') {
      //gets data from the response
      let googleRoute = result.routes[0].legs[0]
      let dataArray = googleRoute.steps
      for(data of dataArray){
        console.log('duration:',data.duration.text)
      }

///---------------------------------------------------------------------------------------------
      //output (STILL IN TESTING PHASE)
      output.innerHTML = `
        <div><b>Departure:</b> ${googleRoute.departure_time.text}</div>
        <div><b>Arrival:</b> ${googleRoute.arrival_time.text}</div>
        <div><b>Distance:</b> ${googleRoute.distance.text}</div>
        <div class="mb-2"><b>Duration:</b> ${googleRoute.duration.text}</div>
      `
      for(data of dataArray){
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

