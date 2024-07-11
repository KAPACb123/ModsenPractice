import React, { useState } from 'react';
import FilterPanel, {FilterPanelProps} from '../FilterPanel/FilterPanel';
import './FilterButton.css'
const FilterButton: React.FC<FilterPanelProps>  = ({ radius, placeType, onRadiusChange, onPlaceTypeChange, onSearch }) => {


    const [showFilter, setShowFilter] = useState(true); // Состояние для отслеживания видимости фильтра

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className="filter-button-container">
            <button className="btn btn-primary control" onClick={toggleFilter}>
                {showFilter ? 'Скрыть фильтр' : 'Показать фильтр'}
            </button>
            <div className={`filter-content-container ${!showFilter && 'invisible'}`}>
                {showFilter &&
                    <FilterPanel
                        onSearch={onSearch}
                        radius={radius}
                        placeType={placeType}
                        onRadiusChange={onRadiusChange}
                        onPlaceTypeChange={onPlaceTypeChange}
                    />
                }
            </div>
        </div>
    );
};

export default FilterButton;
