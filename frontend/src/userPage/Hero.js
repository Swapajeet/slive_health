import React from "react";
import From from "./from";
import Home from "./Auth/Home";
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { CookiesProvider } from "react-cookie";


function Hero(){
    return(
        <>
        <From/>
        </>
    );
};

export default Hero;