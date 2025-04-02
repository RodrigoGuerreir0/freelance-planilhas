import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router";
import './styles/Navbars.css'; 

export const AppNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = {
        informacoes: [
            { path: "/informacoes/empresa", label: "Empresa" },
            { path: "/informacoes/socios", label: "Sócios" },
            { path: "/informacoes/departamentos", label: "Departamentos" },
            { path: "/informacoes/equipe", label: "Equipes" }
        ],
        modelagem: [
            { path: "/modelagem/canvas", label: "Canvas" },
            { path: "/modelagem/curva-de-valor", label: "Curva de Valor" }
        ],
        estrategia: [
            { path: "/estrategia/diretrizes", label: "Dretrizes" },
            { path: "/estrategia/forcas", label: "Forças" },
            { path: "/estrategia/swot", label: "SWOT" },
            { path: "/estrategia/metas", label: "Metas" },
            { path: "/estrategia/acose", label: "Acose" }
        ]
    };

    let activeNavItems = [];
    
    if (
        currentPath === "/" || 
        currentPath.startsWith("/informacoes") || 
        currentPath === "/informacoes"
    ) {
        activeNavItems = navItems.informacoes;
    } 
    else if (
        currentPath.startsWith("/modelagem") || 
        currentPath === "/modelagem"
    )
   
     {
        activeNavItems = navItems.modelagem;
    }
    else if (
        currentPath.startsWith("/estrategia") || 
        currentPath === "/estrategia"
    )
   
     {
        activeNavItems = navItems.estrategia;
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    {activeNavItems.map((item) => (
                        <Nav.Link 
                            key={item.path}
                            className="links-btn" 
                            href={item.path}
                            active={currentPath === item.path}
                        >
                            {item.label}
                        </Nav.Link>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
};