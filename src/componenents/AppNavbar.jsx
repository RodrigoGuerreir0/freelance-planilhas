import { Container, Nav, Navbar } from "react-bootstrap";
import './styles/Navbars.css'; 

export const AppNavbar = () => {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto"> 
            <Nav.Link className="links-btn" href="/informacoes/empresa">Empresa</Nav.Link>
            <Nav.Link className="links-btn" href="/informacoes/socios">Sócios</Nav.Link>
            <Nav.Link className="links-btn" href="/informacoes/departamentos">Departamentos</Nav.Link>
            <Nav.Link className="links-btn" href="/informacoes/equipe">Equipes</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </> 
    );
}