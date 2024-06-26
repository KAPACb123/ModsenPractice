export const getRoute = (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): Promise<google.maps.DirectionsResult> => {
    return new Promise((resolve, reject) => {
        const directionsService = new google.maps.DirectionsService();
        const request: google.maps.DirectionsRequest = {
            origin,
            destination,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
                resolve(result);
            } else {
                reject(status);
            }
        });
    });
};
