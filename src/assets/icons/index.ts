import restaurantMarker from './food.png';
import parkMarker from './nature.png';
import museumMarker from './culture.png';
import bankMarker from './bank.png';
import myMarker from './MyLandmark.png'
import searchMarker from './searchPlace.png'

export const icons : { [key: string]: string }= {
    restaurant: restaurantMarker,
    park: parkMarker,
    museum: museumMarker,
    bank: bankMarker,
    myMarker: myMarker,
    searchPlace:searchMarker
} as const;


