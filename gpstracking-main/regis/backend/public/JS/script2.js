function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, 
        zoom: 10, 
    });
    function updateLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const userLocation = new google.maps.LatLng(lat, lng);
                map.setCenter(userLocation);
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Your Location',
                });
            });
        } else {
            alert("Geolocation not supported in this browser.");
        }
    }
    updateLocation();
    setInterval(updateLocation, 10000);
}
