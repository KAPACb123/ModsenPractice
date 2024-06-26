import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from './components/Map/Map';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App: React.FC = () => {
    return (
        <Router>
                    <Map />
        </Router>
    );
};

export default App;