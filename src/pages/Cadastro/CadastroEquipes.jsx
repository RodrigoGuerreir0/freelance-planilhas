import React, { useState } from "react";

import { 
  Container, 
  Card, 
  Table, 
  Button, 
  Form, 
  Alert, 
  Badge,
  InputGroup,
  FloatingLabel,
  Row,
  Col
} from "react-bootstrap";


import { 
  Add, 
  Delete, 
  Clear,
  Groups,
  AttachMoney,
  People,
  TrendingUp,
  Work,
  Business
} from "@mui/icons-material";

import "./styles/CadastroEquipes.css"; // Create this CSS file for custom styles

const CadastroEquipes = () => {
  const [equipe, setEquipe] = useState({
    cargo: "",
    area: "",
    funcoes: "",
    salario: "",
    trabalhadores: "",
    reajuste: ""
  });
  const [equipes, setEquipes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipe(prev => ({ ...prev, [name]: value }));
  };

  const adicionarEquipe = () => {
    if (!equipe.cargo.trim() || !equipe.area.trim()) {
      setError("Cargo e Área são campos obrigatórios");
      setSuccess("");
      return;
    }
    
    setEquipes([...equipes, equipe]);
    setEquipe({ 
      cargo: "", 
      area: "", 
      funcoes: "", 
      salario: "", 
      trabalhadores: "", 
      reajuste: "" 
    });
    setError("");
    setSuccess("Equipe cadastrada com sucesso!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarEquipe();
  };

  const removerEquipe = (index) => {
    const novoArray = [...equipes];
    novoArray.splice(index, 1);
    setEquipes(novoArray);
    setSuccess("Equipe removida com sucesso");
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-oil text-white d-flex align-items-center">
          <Groups className="me-2" />
          <h4 className="mb-0">Cadastro de Equipes</h4>
          <Badge bg="light" text="dark" className="ms-auto">
            {equipes.length} registros
          </Badge>
        </Card.Header>
        
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" onClose={() => setSuccess("")} dismissible>
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-light">
                    <Work />
                  </InputGroup.Text>
                  <FloatingLabel controlId="cargo" label="Cargo">
                    <Form.Control
                      name="cargo"
                      type="text"
                      placeholder="Cargo"
                      value={equipe.cargo}
                      onChange={handleChange}
                      className="modern-input"
                      required
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={6}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-light">
                    <Business />
                  </InputGroup.Text>
                  <FloatingLabel controlId="area" label="Área">
                    <Form.Control
                      name="area"
                      type="text"
                      placeholder="Área"
                      value={equipe.area}
                      onChange={handleChange}
                      className="modern-input"
                      required
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={12}>
                <FloatingLabel controlId="funcoes" label="Funções Principais">
                  <Form.Control
                    name="funcoes"
                    as="textarea"
                    placeholder="Funções Principais"
                    value={equipe.funcoes}
                    onChange={handleChange}
                    className="modern-input"
                    style={{ height: '100px' }}
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-light">
                    <AttachMoney />
                  </InputGroup.Text>
                  <FloatingLabel controlId="salario" label="Salário">
                    <Form.Control
                      name="salario"
                      type="number"
                      placeholder="Salário"
                      value={equipe.salario}
                      onChange={handleChange}
                      className="modern-input"
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-light">
                    <People />
                  </InputGroup.Text>
                  <FloatingLabel controlId="trabalhadores" label="Quantidade de Trabalhadores">
                    <Form.Control
                      name="trabalhadores"
                      type="number"
                      placeholder="Quantidade"
                      value={equipe.trabalhadores}
                      onChange={handleChange}
                      className="modern-input"
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-light">
                    <TrendingUp />
                  </InputGroup.Text>
                  <FloatingLabel controlId="reajuste" label="Reajuste Anual (%)">
                    <Form.Control
                      name="reajuste"
                      type="number"
                      placeholder="Reajuste"
                      value={equipe.reajuste}
                      onChange={handleChange}
                      className="modern-input"
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>
            </Row>

            <div className="d-flex gap-2 mb-4">
              <Button variant="success" type="submit" className="d-flex align-items-center">
                <Add className="me-1" /> Adicionar Equipe
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => setEquipe({ 
                  cargo: "", 
                  area: "", 
                  funcoes: "", 
                  salario: "", 
                  trabalhadores: "", 
                  reajuste: "" 
                })}
                disabled={!Object.values(equipe).some(val => val)}
                className="d-flex align-items-center"
              >
                <Clear className="me-1" /> Limpar
              </Button>
            </div>
          </Form>

          {equipes.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="modern-table">
                <thead>
                  <tr className="bg-light">
                    <th width="5%">#</th>
                    <th width="20%">Cargo</th>
                    <th width="15%">Área</th>
                    <th>Funções</th>
                    <th width="10%">Salário</th>
                    <th width="10%">Qtd.</th>
                    <th width="10%">Reajuste</th>
                    <th width="10%">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {equipes.map((eq, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{eq.cargo}</td>
                      <td>{eq.area}</td>
                      <td className="text-muted">{eq.funcoes || "-"}</td>
                      <td className="text-success fw-bold">{eq.salario ? `R$ ${parseFloat(eq.salario).toLocaleString('pt-BR')}` : "-"}</td>
                      <td>{eq.trabalhadores || "-"}</td>
                      <td className={eq.reajuste ? "text-primary fw-bold" : ""}>
                        {eq.reajuste ? `${eq.reajuste}%` : "-"}
                      </td>
                      <td>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removerEquipe(index)}
                          className="d-flex align-items-center"
                        >
                          <Delete fontSize="small" /> 
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-4">
              <Groups className="text-muted" style={{ fontSize: '3rem' }} />
              <p className="text-muted mt-2">Nenhuma equipe cadastrada</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastroEquipes;