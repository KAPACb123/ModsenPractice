import React from 'react';

interface PlaceDetailsProps {
    place: google.maps.places.PlaceResult | null;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
    if (!place) return null;

    return (
        <div>
            <h2>{place.name}</h2>
            <p>{place.formatted_address}</p>
            <p>{place.rating && `Rating: ${place.rating}`}</p>
            <p>{place.user_ratings_total && `Total Ratings: ${place.user_ratings_total}`}</p>
            {place.photos && place.photos.length > 0 && (
                <img
                    src={place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}
                    alt={place.name}
                />
            )}
        </div>
    );
}

export default PlaceDetails;
