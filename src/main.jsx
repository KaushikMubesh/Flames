import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import './index.css'
import App from './App.jsx'
import LoveOMeter from './LoveOMeter.jsx'
import DataBaseUi from './DataBaseUi.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

  <StrictMode>
  <Routes>
    <Route path="/" element={<LoveOMeter />} />
    <Route path="/data/database" element={<DataBaseUi />} />
  </Routes>   
   
  </StrictMode>
  </BrowserRouter>
)
