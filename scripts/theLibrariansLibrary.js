///////////////////////////////////////////////
//Guide to global functions\\
///////////////////////////////////////////////

///use pinMaker({object}) to add new pins. the object must follow standards
//use deletePins([array of markers]) to delete markers

//----------------------

///use placesFunction(type) to display pins from the google database set by parameters
//types can be any of: 'restaurant','library','aquarium','art_gallery','bar','movie_theater','bowling_alley','museum','cafe','night_club','bus_station','park','restaurant','shopping_mall','stadium','spa','subway_station','tourist_attraction','zoo'

//----------------------

//use findUser() to find the user location(and set a pin)

//-----------------------------------------------------------------------------------------------

librarians = {
    pinMaker: pinMarker, //(place) 
    deletePins: deletePins, //(arrayOfMarkers)
    placesAPIRequest: placesAPIRequest, //(type, position, npins)
    aroundVancouverMarkers: aroundVancouverMarkers,//()
} 

//-----------------------------------------------------------------------------------------------

//Guide to place object

let newPlace = {
    name: 'name', //required
    title: 'title', //optional
    address: 'vicinity', //optional
    picture: 'href', //optional
    position: { lat, lng }, //required
    rating: place.rating, //optional
    numberOfRatings: place.user_ratings_total, //optional
    priceLevel: priceLevel, //optional
    type: place.types, //optional
    id: place.place_id, ////
    icon: orangeMarker, //required
    description: '', //optional
    category: 'pointOfInterest' ///
  }