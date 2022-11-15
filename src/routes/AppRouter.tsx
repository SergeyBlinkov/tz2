import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./route";
import Avia from "../Components/Avia";



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map(({path,component}) => <Route key={path} path={path} element={component}/>)}
                <Route path={'*'} element={<Avia />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;