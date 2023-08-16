



const initialCoords = { lat: 40.4460495560349, lng: - 3.6759638264748986 }

let myMap

function init() {
    renderMap()
    getEventsData()
}




function renderMap() {

    myMap = new google.maps.Map(

        document.querySelector('#myMap'),
        {
            zoom: 15,
            center: initialCoords,
        }
    )


}




function getEventsData() {

    axios

        .get('/api/events')
        .then(response => printMarkers(response.data))
        .catch(err => console.log(err))

}

function printMarkers(event) {
    console.log(event)
    event.forEach(elm => {

        const position = {
            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        console.log({ position })
        new google.maps.Marker({
            position,
            map: myMap,
            title: elm.name,
            icon: '/images/IMG_9696(1).png',


        })

    })

}