import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Background from './components/Background/Background';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Background />
    <App />
    <Toaster />
  </>
);

