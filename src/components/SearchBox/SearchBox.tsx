import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type SearchBoxProps = {
    onSearch: (query: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for places..."
            />
            <button className="btn btn-primary" onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export default SearchBox;
