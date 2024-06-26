export const fetchNearbyPlaces = (
    map: google.maps.Map | null,
    center: google.maps.LatLngLiteral,
    radius: number,
    type: string
): Promise<google.maps.places.PlaceResult[]> => {
    return new Promise((resolve, reject) => {
        if (!map) {
            reject('Map is not loaded');
            return;
        }

        const request: google.maps.places.PlaceSearchRequest = {
            location: center,
            radius: radius,
            type: type
        };

        const service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results);
            } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                console.log('No results found in the specified area.');
                resolve([]); // Returning empty array when no results are found
            } else {
                console.error('Error fetching nearby places:', status);
                reject(status);
            }
        });
    });
};
