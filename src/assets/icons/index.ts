import restaurantMarker from './food.png';
import parkMarker from './nature.png';
import museumMarker from './culture.png';
import bankMarker from './bank.png';
import myMarker from './MyLandmark.png'
import searchMarker from './searchPlace.png'
import gasMarker from './gas station.png'
import storeMarker from './shop.png'
import stadiumMarker from './sport.png'
import bicycleStoreMarker from './bicycle.png'
import carDealerMarker from './car.png'
export const icons : { [key: string]: string }= {
    restaurant: restaurantMarker,
    park: parkMarker,
    museum: museumMarker,
    bank: bankMarker,
    myMarker: myMarker,
    searchPlace:searchMarker,
    gas_station: gasMarker,
    supermarket:storeMarker,
    stadium:stadiumMarker,
    bicycle_store:bicycleStoreMarker,
    car_dealer: carDealerMarker
} as const;


