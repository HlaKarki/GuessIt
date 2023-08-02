import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App'
import './index.css'
import { PointsProvider } from "./PointsContext";

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <PointsProvider>
        <App />
    </PointsProvider>
);