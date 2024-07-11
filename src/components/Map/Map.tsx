import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';
import { fetchNearbyPlaces } from '../../utils/services/placesService';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import FilterPanel from '../FilterPanel/FilterPanel';
import {icons} from '../../assets/icons';
import {mapStyles} from '../../constans'
import './Map.css';


export type PlaceType = keyof typeof icons & string;

const Map: React.FC = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: -3.745, lng: -38.523 });
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [searchPlaces, setSearchPlaces] = useState<google.maps.places.PlaceResult[]>([]);
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
    const handleGetRouteCurried = (place:  google.maps.places.PlaceResult)  => () => handleGetRoute(place);
    const handleSearch = (query: string) => {
        if (!mapRef.current) return;
        const service = new google.maps.places.PlacesService(mapRef.current);
        const request = {
            query,
            fields: ['name', 'geometry'],
            locationBias: mapCenter,
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                setSearchPlaces(results);
            }
        });
    };

    useEffect(() => {
        if (mapRef.current) {
            fetchNearbyPlaces(mapRef.current, mapCenter, radius, placeType).then(setPlaces);
        }
    }, [mapCenter, radius, placeType]);

    return (
        <div className="map-container">
            <div className="filter-panel-container">
            <FilterPanel
                onSearch={handleSearch}
                radius={radius}
                placeType={placeType}
                onRadiusChange={setRadius}
                onPlaceTypeChange={setPlaceType}
            />
            </div>
            <LoadScript googleMapsApiKey={googleMapsApiKey ? googleMapsApiKey : ''} libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100vh' }}
                    center={mapCenter}
                    zoom={14}
                    onLoad={onLoad}
                    options={{
                            disableDefaultUI: true,
                            mapTypeControl: false,
                            styles: mapStyles
                    }}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                    {places.map((place) => (
                        <Marker
                            key={place.place_id}
                            position={{ lat: place.geometry?.location?.lat() || 0, lng: place.geometry?.location?.lng() || 0 }}
                            onClick={() => setSelectedPlace(place)}
                            icon={{
                                url: icons[place.types?.[0] || ''] || '',
                                scaledSize: new window.google.maps.Size(30, 30)
                            }}
                        />
                    ))}
                    {mapCenter && (
                        <Marker
                            key={'map_center'}
                            position={mapCenter}
                            icon={{
                                url: icons['myMarker'],
                            }}
                        />
                    )}
                    {selectedPlace && (
                        <InfoWindow
                            position={{ lat: selectedPlace.geometry?.location?.lat() || 0, lng: selectedPlace.geometry?.location?.lng() || 0 }}
                            onCloseClick={() =>  (null)}
                        >
                            <div>
                                <PlaceDetails place={selectedPlace} />
                                <button onClick={handleGetRouteCurried(selectedPlace)}>Простроить путь</button>
                            </div>
                        </InfoWindow>
                    )}
                    {searchPlaces.map((place) => (
                        <Marker
                            key={place.place_id}
                            onClick={() => setSelectedPlace(place)}
                            position={{
                                lat: place.geometry?.location?.lat() || 0,
                                lng: place.geometry?.location?.lng() || 0,
                            }}
                            icon={{
                                url: icons['searchPlace' || ''] || '',
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
