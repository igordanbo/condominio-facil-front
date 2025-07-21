import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/Template';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';
import Condominios from './pages/Condominios'; 
import Condominio from './pages/Condominio';
import EditarCondominio from './pages/Condominio/Editar';
import Usuarios from "./pages/Usuarios";
import Usuario from "./pages/Usuario"
import EditarUsuario from "./pages/Usuario/Editar";
import TiposManutencoes from "./pages/TiposManutencoes";
import TipoManutencao from "./pages/TipoManutencao";
import CadastrarTipoManutencao from "./pages/TipoManutencao/Cadastrar";
import EditarTipoManutencao from "./pages/TipoManutencao/Editar";
import Manutencoes from "./pages/Manutencoes";

function App() {
  return (
<>
  <BrowserRouter>

    <Routes>
      {/* Rotas com Template */}
      <Route path="/" element={<Template />}>
        <Route index element={<Dashboard />} />
        <Route path="condominios" element={<Condominios />} />
        <Route path="condominio/:id" element={<Condominio />} />
        <Route path="condominio/editar/:id" element={<EditarCondominio />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuario/:id" element={<Usuario />} />
        <Route path="usuario/editar/:id" element={<EditarUsuario />} />
        <Route path="manutencoes" element={<Manutencoes />} />
        <Route path="tipos-manutencoes" element={<TiposManutencoes />} />
        <Route path="tipo-manutencao/:id" element={<TipoManutencao />} />
        <Route path="tipo-manutencao/editar/:id" element={<EditarTipoManutencao />} />
        <Route path="tipo-manutencao/cadastrar" element={<CadastrarTipoManutencao />} />
      </Route>

      {/* 404 fora do Template */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
</>
  );
}

export default App;
