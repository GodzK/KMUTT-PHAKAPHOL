import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Content from './components/Content.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
  <Routes> 
  <Route path="/" element={<App/>} />
  <Route path="/content" element={<Content/>} />
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
