import React, { useState } from 'react';
import {
  FundProjectionScreenOutlined,
  AppstoreOutlined,
  DollarOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
  SnippetsOutlined,
  FundOutlined
} from '@ant-design/icons';
import { Link } from 'react-router';

import './styles/Navbars.css'; 

const menuItems = [
  { label: 'Informações', route: '/', icon: <SnippetsOutlined  className="p-1" /> },
  { label: 'Modelagem', route: '/modelagem', icon: <FundProjectionScreenOutlined className="p-1" /> },
  { label: 'Estratégia', route: '/estrategia', icon: <FundOutlined  className="p-1" /> },
  { label: 'Marketing', route: '/marketing', icon: <AppstoreOutlined className="p-1" /> },
  { label: 'Preço', route: '/preco', icon: <DollarOutlined className="p-1" /> },
  { label: 'Finanças', route: '/financas', icon: <BarChartOutlined className="p-1" /> },
  { label: 'Relatórios', route: '/relatorios', icon: <PieChartOutlined className="p-1" /> },
  { label: 'Dashboards', route: '/dashboards', icon: <DashboardOutlined className="p-1" /> },
  { label: 'Sumário', route: '/sumario', icon: <FileTextOutlined className="p-1" /> },
  { label: 'Instruções', route: '/instrucoes', icon: <ReadOutlined className="p-1" /> }
];

function Sidebar() {
  const [activeRoute, setActiveRoute] = useState('Inicio');

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100vh', position: 'fixed' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Menu</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.route}>
            <Link
              to={item.route}
              className={`nav-link text-white ${activeRoute === item.label ? 'active-route' : ''}`}
              onClick={() => setActiveRoute(item.label)}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <UserOutlined className="p-1" />
          <strong>Usuário</strong>
        </a>
      </div>
      <style>
        {`
          .nav-link:hover {
            background-color: #0d6efd;
            color: white;
          }
          .active-route {
            background-color: #202f50;
            color: black;
          }
        `}
      </style>
    </div>
  );
}

export default Sidebar;
