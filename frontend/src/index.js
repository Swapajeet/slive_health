
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Hero from './userPage/Hero';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './userPage/Auth/login';
import Signup from './userPage/Auth/Signup';
import { CookiesProvider } from "react-cookie";
import Home from "./userPage/Auth/Home"
import ProtectedRoute from "./userPage/Protected";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>

    <CookiesProvider>

      <BrowserRouter>

        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />

          <Route
            path='/signup'
            element={<Signup />}
          />

          <Route
            path='/'
            element={<Home/>}
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute><Hero/></ProtectedRoute>
            }
          />
      
        </Routes>
        


      </BrowserRouter>

    </CookiesProvider>

  </React.StrictMode>
);

reportWebVitals();

