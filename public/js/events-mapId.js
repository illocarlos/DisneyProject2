
const initialCoords = { lat: 40.4460495560349, lng: - 3.6759638264748986 }

let myMapId


function init() {
    renderMap()
    printMarkers()
}



function renderMap() {

    myMapId = new google.maps.Map(

        document.querySelector('#myMapDetails'),
        {
            zoom: 12,
            center: initialCoords

        }
    )
}

const eventId = document.querySelector('#eventId').value
const title = document.querySelector('#title').value
const descriptionId = document.querySelector('#descriptionId').value
const dateId = document.querySelector('#dateId').value
const lontId = document.querySelector('#lontId').value
const lattId = document.querySelector('#lattId').value

function printMarkers(eventId) {

    console.log(title)




    const position = {
        lat: lattId,
        lng: lontId
    }

    new google.maps.Marker({
        position,
        map: myMapDetails,
        icon: '/images/IMG_9696(1).png',
    })



}