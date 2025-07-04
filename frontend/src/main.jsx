import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom' // Impor RouterProvider
import router from './router' // Impor router kita

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Ganti App dengan RouterProvider */}
  </React.StrictMode>,
)