import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/Template';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';
import Condominios from './pages/Condominios'; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Template />}>
            <Route index element={<Dashboard />} />
            <Route path="condominios" element={<Condominios />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
   
  
  );
}

export default App;
