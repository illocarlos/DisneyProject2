


const lattId = document.querySelector('#lontId').value
const lontId = document.querySelector('#lattId').value
const initialCoords = { lat: Number(lattId), lng: Number(lontId) }


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


function printMarkers() {


    const position = {
        lat: Number(lattId),
        lng: Number(lontId)
    }

    new google.maps.Marker({
        position,
        map: myMapId,
        icon: '/images/IMG_9696(1).png',
    })



}