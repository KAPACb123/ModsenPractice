import React from 'react';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import HomePage from "../../pages/Home/HomePage";
import LoginPage from "../../pages/Login/LoginPage";
import RegisterPage from "../../pages/Register/RegisterPage";
import Map from "../../components/Map/Map";
const App: React.FC = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Navigate to="/map" replace />} />
            <Route path={'/map'} element={<Map/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
        </Routes>
        </BrowserRouter>
    );
};

export default App;