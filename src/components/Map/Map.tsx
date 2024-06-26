import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';
import { fetchNearbyPlaces } from '../../utils/services/placesService';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import FilterPanel from '../FilterPanel/FilterPanel';
import restaurantMarker from '../../assets/icons/food.png';
import parkMarker from '../../assets/icons/nature.png';
import museumMarker from '../../assets/icons/culture.png';


export type PlaceType = 'restaurant' | 'museum' | 'park';


const categoryIconMap: { [key: string]: string } = {
    restaurant: restaurantMarker,
    park: parkMarker,
    museum: museumMarker,
};
const Map: React.FC = () => {
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: -3.745, lng: -38.523 });
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [radius, setRadius] = useState<number>(1000);
    const [placeType, setPlaceType] = useState<PlaceType>('restaurant');
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setMapCenter(userCenter);
                fetchNearbyPlaces(map, userCenter, radius, placeType).then(setPlaces);
            },
            (error) => console.log(error)
        );
    }, [radius, placeType]);

    const handleGetRoute = (place: google.maps.places.PlaceResult) => {
        if (place.geometry?.location) {
            const destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            setOrigin(mapCenter);

            const request: google.maps.DirectionsRequest = {
                origin: origin!,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING
            };

            const directionsService = new google.maps.DirectionsService();
            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            });
        }
    };



    useEffect(() => {
        if (mapRef.current) {
            fetchNearbyPlaces(mapRef.current, mapCenter, radius, placeType).then(setPlaces);
        }
    }, [mapCenter, radius, placeType]);

    return (
        <div className="map-container">
            <FilterPanel
                radius={radius}
                placeType={placeType}
                onRadiusChange={setRadius}
                onPlaceTypeChange={setPlaceType} // Прямое присвоение функции изменения состояния placeType
            />
            <LoadScript googleMapsApiKey="AIzaSyDtPwhgu3_KQas7DTT2CuRqCqTu3a3PfFU" libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100vh' }}
                    center={mapCenter}
                    zoom={14}
                    onLoad={onLoad}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                    {places.map((place) => (
                        <Marker
                            key={place.place_id}
                            position={{ lat: place.geometry?.location?.lat() || 0, lng: place.geometry?.location?.lng() || 0 }}
                            onClick={() => setSelectedPlace(place)}
                            icon={{
                                url: categoryIconMap[place.types?.[0] || ''] || '',
                                scaledSize: new window.google.maps.Size(30, 30)
                            }}
                        />
                    ))}

                    {selectedPlace && (
                        <InfoWindow
                            position={{ lat: selectedPlace.geometry?.location?.lat() || 0, lng: selectedPlace.geometry?.location?.lng() || 0 }}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                <PlaceDetails place={selectedPlace} />
                                <button onClick={() => handleGetRoute(selectedPlace)}>Простроить путь</button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
