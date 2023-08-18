const location = document.querySelector('#location').value

console.log(location)

const searchParam = new URLSearchParams(location)


axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchParam}`)
    .then(response => console.log(response.data.location))
