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
      <p class="card-text"><b>Price Level: </b>${place.priceLevel}/5</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="calculateRoute(${place.position.lat},${place.position.lng},'TRANSIT')">See route</button>
  </div>
  `
  return infoWindowString
}


