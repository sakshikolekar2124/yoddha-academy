import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
window.API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? ''
  : 'https://yoddha-academy.onrender.com';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
