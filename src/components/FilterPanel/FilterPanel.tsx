import React from 'react';
import {PlaceType} from "../Map/Map";

type FilterPanelProps = {
    radius: number;
    placeType: PlaceType;
    onRadiusChange: (value: number) => void;
    onPlaceTypeChange: (value: PlaceType) => void; // Ожидаем тип PlaceType
};

const FilterPanel: React.FC<FilterPanelProps> = ({ radius, placeType, onRadiusChange, onPlaceTypeChange }) => {
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        onRadiusChange(value);
    };

    const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as PlaceType; // Приведение типа к PlaceType
        onPlaceTypeChange(value);
    };

    return (
        <div className="filter-panel">
            <h2>Фильтры</h2>
            <div className="filter-item">
                <label>Радиус поиска (м)</label>
                <input type="number" value={radius} onChange={handleRadiusChange} />
            </div>
            <div className="filter-item">
                <label>Тип заведения</label>
                <select value={placeType} onChange={handlePlaceTypeChange}>
                    <option value="restaurant">Ресторан</option>
                    <option value="museum">Музей</option>
                    <option value="park">Парк</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;
