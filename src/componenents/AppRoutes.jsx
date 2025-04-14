import { Route, Routes } from "react-router";
import App from "../App";
import { Modelagem } from "../pages/Modelagem";
import { Pedidos } from "../pages/Pedidos";
import { Produtos } from "../pages/Produtos";
import { Clientes } from "../pages/Clientes";
import { Login } from "@mui/icons-material";

import CadastroDepartamentos from "../pages/Cadastro/CadastroDepartamentos";
import CadastroEquipes from "../pages/Cadastro/CadastroEquipes";
import CadastroEmpresa from "../pages/Cadastro/CadastroEmpresa";
import CadastroSocios from "../pages/Cadastro/CadastroSocios";
import { CurvaDeValores } from "../pages/CurvaDeValores";
import { Canvas } from "../pages/Canvas";
import { Estrategia } from "../pages/Estrategia";
import CadastroDiretrizesEmpresa from "../pages/Diretrizes";
import Forcas from "../pages/Forcas";
import { Informacoes } from "../pages/informacoes";
import { Metas } from "../pages/Metas";
import AnaliseSWOT from "../pages/Swot";
import MetasPlanosAcao from "../pages/Acoes";


export const AppRoutes = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login" element={<Login />} />

        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/informacoes/empresa" element={<CadastroEmpresa />} />
        <Route path="/informacoes/socios" element={<CadastroSocios />} />
        <Route path="/informacoes/departamentos" element={<CadastroDepartamentos />} />
        <Route path="/informacoes/equipe" element={<CadastroEquipes />} />

        <Route path="/modelagem" element={<Modelagem />} />
        <Route path="/modelagem/canvas" element={<Canvas />} />
        <Route path="/modelagem/curva-de-valor" element={<CurvaDeValores />} />

        <Route path="/estrategia" element={<Estrategia />} />
        <Route path="/estrategia/diretrizes" element={<CadastroDiretrizesEmpresa />} />
        <Route path="/estrategia/forcas" element={<Forcas />} />
        <Route path="/estrategia/swot" element={<AnaliseSWOT />} />
        <Route path="/estrategia/metas" element={<Metas />} />
        <Route path="/estrategia/acoes" element={<MetasPlanosAcao />} />

      </Routes>
    </>
  );
};
