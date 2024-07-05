import React from 'react';
import { PlaceType } from "../Map/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import { placeTypes } from '../../constans';
import './FilterPanel.css'

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

    const handlePlaceTypeChange = (placeType: PlaceType) => {
        onPlaceTypeChange(placeType);
    };

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
                    <div className="list-group scroll-list">
                        {Object.entries(placeTypes).map(([key, value]) => (
                            <div
                                key={key}
                                className={`list-group-item ${placeType === key ? 'active' : ''}`}
                                onClick={() => handlePlaceTypeChange(key as PlaceType)}
                                style={{ cursor: 'pointer' }}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
