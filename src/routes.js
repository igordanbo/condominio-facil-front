import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/Template';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';
import Condominios from './pages/Condominios'; 
import Condominio from './pages/Condominio';
import EditarCondominio from './pages/Condominio/Editar';
import Menu from './components/Menu';
import Header from './components/Header';
import Usuarios from "./pages/Usuarios";
import Usuario from "./pages/Usuario"
import EditarUsuario from "./pages/Usuario/Editar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Header />
        <Routes>
          <Route path="/" element={<Template />}>
            <Route index element={<Dashboard />} />
            <Route path="condominios" element={<Condominios />} />
            <Route path="condominio/:id" element={<Condominio />} />
            <Route path="condominio/editar/:id" element={<EditarCondominio />} />
            <Route path="manutencoes" element={<div>Manutenções</div>} />
            <Route path="usuarios" element={<Usuarios/>} />
            <Route path="usuario/:id" element={<Usuario/>} />
            <Route path="usuario/editar/:id" element={<EditarUsuario/>}/>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
