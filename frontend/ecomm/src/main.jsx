import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import MainContext from './context/MainContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <App />
    </React.StrictMode>
);
