var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var marker;

function searchLocation() {
  var query = document.getElementById('searchInput').value;
  if (!query) return;

  console.log("Searching for:", query);

  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var lat = parseFloat(data[0].lat);
        var lon = parseFloat(data[0].lon);

        map.setView([lat, lon], 13);

        if (marker) {
          marker.setLatLng([lat, lon]);
        } else {
          marker = L.marker([lat, lon]).addTo(map);
        }

        const username = 'buffalochnage'; // Use your actual GeoNames username here

        fetch(`https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=${username}`)
          .then(res => res.json())
          .then(geo => {
            console.log("GeoNames result:", geo);

            if (geo.geonames && geo.geonames.length > 0) {
              const place = geo.geonames[0];
              const popupText = `
                <strong>${place.name}, ${place.countryName}</strong><br/>
                Admin: ${place.adminName1}<br/>
                Population: ${place.population}<br/>
                latitude: ${place.lat}, longitude: ${place.lng}
              `;
              marker.bindPopup(popupText).openPopup();
            }
          });
      }
    });
}


