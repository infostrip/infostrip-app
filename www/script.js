

function criaMapa() {

    document.querySelector('#mapContainer').innerHTML = "";
    var input = document.querySelector("#txtSearch").value;
    document.getElementById('mapContainer').style.display = 'block';
    // Initialize the platform object:
    var platform = new H.service.Platform({
        'apikey': 'EAQxY6dxBYJCDIN5wPqfjVO-_jp3OSwd0sh4hs6j1xU'
    });
    const geocoderService = platform.getGeocodingService();
    const geocoder = query => {
        return new Promise((resolve, reject) => {


            geocoderService.geocode(
                {
                    "searchText": query
                },
                success => {

                    resolve(success.Response.View[0].Result[0].Location.DisplayPosition);
                },

                error => {
                    reject(error);
                }
            );
        });
    }

    const start = async () => {
        const fresno = await geocoder(input);
        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainer'),
            maptypes.vector.normal.map,
            {
                zoom: 10,
                center: { lng: fresno.Longitude, lat: fresno.Latitude }
            });

        const marker = new H.map.Marker({ lat: fresno.Latitude, lng: fresno.Longitude });
        map.addObject(marker);
    }
    start();
}