
export const mapStyles = [
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }]
    }
];
export const placeTypes : { [key: string]: string } = {
    restaurant: 'Ресторан',
    museum: 'Музей',
    park: 'Парк',
    bank: 'Банк',
    gas_station: 'Заправка',
    supermarket: 'Магазин',
    stadium: 'Стадион',
    bicycle_store: 'Велосипеды',
    car_dealer: 'Автомобили'
}

