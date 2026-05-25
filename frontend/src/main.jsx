import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Insta from './Insta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Insta />
  </StrictMode>,
)
