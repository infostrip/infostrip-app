

function criaMapa() {

    document.getElementById('cardGroup').style.display = 'none';
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

        let endereco = document.querySelector('#txtSearch').value;

        let api_url = "https://hotels4.p.rapidapi.com/locations/v2/search?query=" + endereco
            + "&locale=pt_BR";
        console.log(api_url);
        console.log(document.querySelector('#txtSearch').value);
        console.log(endereco);

        let response = await fetch(api_url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "afe9673c49mshad9eefaa2329985p171bc7jsnd32018ecc63a"
            }
        });

        let data = await response.json();
        console.log(data.suggestions[1].entities[0].name);
        console.log(data);

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainer'),
            maptypes.vector.normal.map,
            {
                zoom: 13,
                center: { lng: fresno.Longitude, lat: fresno.Latitude }
            });

        const marker = new H.map.Marker({ lat: fresno.Latitude, lng: fresno.Longitude });
        map.addObject(marker);

        //console.log(data.suggestions[])

        for (let i = 0; i < data.suggestions[1].entities.length; i++) {

            const newMarker = new H.map.Marker({
                lat: data.suggestions[1].entities[i].latitude,
                lng: data.suggestions[1].entities[i].longitude
            });

            map.addObject(newMarker);
        }

        console.log(data.suggestions[1].entities[0].name);

        document.querySelector('#tituloHotel').style.display = 'block';
        document.querySelector('#hotel1').innerHTML = data.suggestions[1].entities[0].name;
        document.querySelector('#hotel2').innerHTML = data.suggestions[1].entities[1].name;
        document.querySelector('#hotel3').innerHTML = data.suggestions[1].entities[2].name;
        document.querySelector('#cardGroup').style.display = 'block';

        const reverseGeocode = coords => {
            return new Promise((resolve, reject) => {
                geocoderService.reverseGeocode(
                    {
                        prox: coords.Latitude + "," + coords.Longitude,
                        mode: "retrieveAddresses",
                        maxresults: 1
                    },
                    success => {
                        resolve(success);
                    },
                    reject => {
                        reject(error);
                    }
                );
            });
        }

        for (let i = 0; i < data.suggestions[1].entities.length; i++) {

            const location = await reverseGeocode({
                Latitude: data.suggestions[1].entities[i].latitude,
                Longitude: data.suggestions[1].entities[i].longitude
            });

            // let cidade = location.Response.View[0].Result[0].Location.Address.City;
            // let pais = location.Response.View[0].Result[0].Location.Address.Country;
            // let county = location.Response.View[0].Result[0].Location.Address.County;
            // let district = location.Response.View[0].Result[0].Location.Address.District;
            // let houseNumber = location.Response.View[0].Result[0].Location.Address.HouseNumber;

            console.log(location);

            if (i == 0) {
                document.querySelector('#hotelAddress1').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }

            if (i == 1) {
                document.querySelector('#hotelAddress2').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }

            if (i == 2) {
                document.querySelector('#hotelAddress3').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }
        }

    }
    start();
}




















function sugerir() {
    document.querySelector('#mapContainerSugestao').innerHTML = "";
    var input = document.querySelector("#txtInteresting").value;
    document.getElementById('mapContainerSugestao').style.display = 'block';
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

        let endereco = document.querySelector('#txtInteresting').value;

        let api_url = "https://hotels4.p.rapidapi.com/locations/v2/search?query=" + endereco
            + "&locale=pt_BR";
        console.log(api_url);
        console.log(document.querySelector('#txtInteresting').value);
        console.log(endereco);

        let response = await fetch(api_url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "afe9673c49mshad9eefaa2329985p171bc7jsnd32018ecc63a"
            }
        });

        let data = await response.json();
        console.log(data.suggestions[1].entities[0].name);
        console.log(data);

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainerSugestao'),
            maptypes.vector.normal.map,
            {
                zoom: 13,
                center: { lng: fresno.Longitude, lat: fresno.Latitude }
            });

        const marker = new H.map.Marker({ lat: fresno.Latitude, lng: fresno.Longitude });
        map.addObject(marker);
        //<!------------------------------------------------------------------------------------------------------->
        for (let i = 0; i < data.suggestions[2].entities.length; i++) {

            const newMarker = new H.map.Marker({
                lat: data.suggestions[2].entities[i].latitude,
                lng: data.suggestions[2].entities[i].longitude
            });

            map.addObject(newMarker);
        }

        console.log(data.suggestions[2].entities[0].name);

        document.querySelector('#tituloLM').style.display = 'block';
        document.querySelector('#lm1').innerHTML = data.suggestions[2].entities[0].name;
        document.querySelector('#lm2').innerHTML = data.suggestions[2].entities[1].name;

        document.querySelector('#cardGroupLandMarks').style.display = 'block';

        const reverseGeocode = coords => {
            return new Promise((resolve, reject) => {
                geocoderService.reverseGeocode(
                    {
                        prox: coords.Latitude + "," + coords.Longitude,
                        mode: "retrieveAddresses",
                        maxresults: 1
                    },
                    success => {
                        resolve(success);
                    },
                    reject => {
                        reject(error);
                    }
                );
            });
        }

        for (let i = 0; i < data.suggestions[2].entities.length; i++) {

            const location = await reverseGeocode({
                Latitude: data.suggestions[2].entities[i].latitude,
                Longitude: data.suggestions[2].entities[i].longitude
            });

            console.log(location);

            if (i == 0) {
                document.querySelector('#lmark1').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }

            if (i == 1) {
                document.querySelector('#lmark2').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }

        }


    }

    start();
}









function calculaRota() {
    document.querySelector('#mapContainerRota').innerHTML = "";
    var inputPartida = document.querySelector("#txtBegin").value;
    var inputChegada = document.querySelector("#txtEnd").value;
    document.getElementById('mapContainerRota').style.display = 'block';

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


    ////////////////////// ALTERAR A FUNCTION ASYNC ABAIXO, QUE É LONGA //////////////////////// 

    const start = async () => {

        const partida = await geocoder(inputPartida);
        const chegada = await geocoder(inputChegada);

        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainerRota'),
            maptypes.vector.normal.map,
            {
                zoom: 13,
                center: { lng: partida.Longitude, lat: partida.Latitude }
            });

        const marker = new H.map.Marker({ lat: partida.Latitude, lng: partida.Longitude });
        map.addObject(marker);

        console.log(partida);
        console.log(chegada);

        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',

            'origin': partida.Latitude + "," + partida.Longitude,

            'destination': chegada.Latitude + "," + chegada.Longitude,

            'return': 'polyline'
        };

        var onResult = function (result) {
            // ensure that at least one route was found
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    // Create a linestring to use as a point source for the route line
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                    // Create a polyline to display the route:
                    let routeLine = new H.map.Polyline(linestring, {
                        style: { strokeColor: 'blue', lineWidth: 3 }
                    });

                    // Create a marker for the start point:
                    let startMarker = new H.map.Marker(section.departure.place.location);

                    // Create a marker for the end point:
                    let endMarker = new H.map.Marker(section.arrival.place.location);

                    // Add the route polyline and the two markers to the map:
                    map.addObjects([routeLine, startMarker, endMarker]);

                    // Set the map's viewport to make the whole route visible:
                    map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                });
            }
        };

        var router = platform.getRoutingService(null, 8);

        // Call calculateRoute() with the routing parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        router.calculateRoute(routingParameters, onResult,
            function (error) {
                alert(error.message);
            });


        //<!------------------------------------------------------------------------------------------------------->       
        
    }
    start();
}








function mostraTransportes(){
    document.querySelector('#mapContainerTransporte').innerHTML = "";
    var input = document.querySelector("#txtCommuting").value;
    document.getElementById('mapContainerTransporte').style.display = 'block';
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

        let endereco = document.querySelector('#txtCommuting').value;

        let api_url = "https://hotels4.p.rapidapi.com/locations/v2/search?query=" + endereco
            + "&locale=pt_BR";
        console.log(api_url);
        console.log(document.querySelector('#txtCommuting').value);
        console.log(endereco);

        let response = await fetch(api_url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "afe9673c49mshad9eefaa2329985p171bc7jsnd32018ecc63a"
            }
        });

        let data = await response.json();
        console.log(data.suggestions[3].entities[0].name);
        console.log(data);

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainerTransporte'),
            maptypes.vector.normal.map,
            {
                zoom: 13,
                center: { lng: fresno.Longitude, lat: fresno.Latitude }
            });

        const marker = new H.map.Marker({ lat: fresno.Latitude, lng: fresno.Longitude });
        map.addObject(marker);
        //<!------------------------------------------------------------------------------------------------------->
        for (let i = 0; i < data.suggestions[3].entities.length; i++) {

            const newMarker = new H.map.Marker({
                lat: data.suggestions[3].entities[i].latitude,
                lng: data.suggestions[3].entities[i].longitude
            });

            map.addObject(newMarker);
        }

        console.log(data.suggestions[3].entities[0].name);

        document.querySelector('#tituloTransporte').style.display = 'block';
        document.querySelector('#tr1').innerHTML = data.suggestions[3].entities[0].name;
        document.querySelector('#tr2').innerHTML = data.suggestions[3].entities[1].name;
        
        document.querySelector('#cardGroupTransporte').style.display = 'block';

        const reverseGeocode = coords => {
            return new Promise((resolve, reject) => {
                geocoderService.reverseGeocode(
                    {
                        prox: coords.Latitude + "," + coords.Longitude,
                        mode: "retrieveAddresses",
                        maxresults: 1
                    },
                    success => {
                        resolve(success);
                    },
                    reject => {
                        reject(error);
                    }
                );
            });
        }

        for (let i = 0; i < data.suggestions[3].entities.length; i++) {

            const location = await reverseGeocode({
                Latitude: data.suggestions[3].entities[i].latitude,
                Longitude: data.suggestions[3].entities[i].longitude
            });

            console.log(location);

            if (i == 0) {
                document.querySelector('#transp1').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }

            if (i == 1) {
                document.querySelector('#transp2').innerHTML = location.Response.View[0].Result[0].Location.Address.Label;
            }           

        }

    }

    start();
}





