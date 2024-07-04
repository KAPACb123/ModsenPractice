import restaurantMarker from './food.png';
import parkMarker from './nature.png';
import museumMarker from './culture.png';
import bankMarker from './bank.png';

export const icons : { [key: string]: string }= {
    restaurant: restaurantMarker,
    park: parkMarker,
    museum: museumMarker,
    bank: bankMarker,
} as const;

