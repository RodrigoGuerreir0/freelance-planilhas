import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx'
import Sidebar from './componenents/Sidebar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Modelagem } from './pages/Modelagem.jsx'
import { Pedidos } from './pages/Pedidos.jsx'
import { Produtos } from './pages/Produtos.jsx'
import { Clientes } from './pages/Clientes.jsx'
import { AppNavbar } from './componenents/AppNavbar.jsx';
import { Equipe } from './pages/Equipe.jsx';
import { Empresa } from './pages/Empresa.jsx';
import { Socios } from './pages/Socios.jsx';
import { Areas } from './pages/Areas.jsx';
import { CadastrpEpresas } from './pages/CadastroEmpresas.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Sidebar />
    <AppNavbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/modelagem" element={<Modelagem />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/informacoes/empresa" element={<Empresa />} />
      <Route path="/informacoes/socios" element={<Socios />} />
      <Route path="/informacoes/areas" element={<Areas />} />
      <Route path="/informacoes/equipe" element={<Equipe />} />
      <Route path="/informacoes/cadastroempresas" element={<CadastrpEpresas />} />
    </Routes>
  </BrowserRouter>
);
