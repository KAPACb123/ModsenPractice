import React from 'react';
import {PlaceType } from "../Map/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import {placeTypes} from   '../../constans';

type FilterPanelProps = {
    radius: number;
    placeType: PlaceType;
    onRadiusChange: (value: number) => void;
    onPlaceTypeChange: (value: PlaceType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ radius, placeType, onRadiusChange, onPlaceTypeChange }) => {
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        onRadiusChange(value);
    };

    const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as PlaceType;
        onPlaceTypeChange(value);
    };

    // @ts-ignore
    return (
        <div className="card filter-panel-container">
            <div className="card-body">
                <h2 className="card-title">Фильтры</h2>
                <div className="form-group">
                    <label>Радиус поиска (м)</label>
                    <input type="number" className="form-control" value={radius} onChange={handleRadiusChange} />
                </div>
                <div className="form-group">
                    <label>Тип заведения</label>
                    <select className="form-control" value={placeType} onChange={handlePlaceTypeChange}>
                        {Object.entries(placeTypes).map(([key, value]) => (
                            <option value={key}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
