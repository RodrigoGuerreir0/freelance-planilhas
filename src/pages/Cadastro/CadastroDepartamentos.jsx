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
    FloatingLabel 
  } from "react-bootstrap";
  import { 
    Add, 
    Delete, 
    Clear,
    Business 
  } from "@mui/icons-material";
  import { TextField } from "@mui/material";
  import "./styles/CadastroDepartamentos.css"; // Create this CSS file for custom styles

  const CadastroDepartamentos = () => {
    const [departamento, setDepartamento] = useState("");
    const [departamentos, setDepartamentos] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      adicionarDepartamento();
    };

    const adicionarDepartamento = () => {
      if (departamento.trim() === "") {
        setError("Por favor, insira um nome válido para o departamento");
        setSuccess("");
        return;
      }

      if (departamentos.includes(departamento)) {
        setError("Este departamento já está cadastrado");
        setSuccess("");
        return;
      }

      setDepartamentos([...departamentos, departamento]);
      setDepartamento("");
      setError("");
      setSuccess(`Departamento "${departamento}" cadastrado com sucesso!`);
    };

    const removerDepartamento = (index) => {
      const novoArray = [...departamentos];
      novoArray.splice(index, 1);
      setDepartamentos(novoArray);
      setSuccess("Departamento removido com sucesso");
    };

    return (
      <Container className="my-4">
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-oil text-white d-flex align-items-center">
            <Business className="me-2" />
            <h4 className="mb-0">Cadastro de Departamentos</h4>
            <Badge bg="light" text="dark" className="ms-auto">
              {departamentos.length} registros
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
              <FloatingLabel controlId="floatingInput" label="Nome do Departamento" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nome do Departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="modern-input"
                />
              </FloatingLabel>

              <div className="d-flex gap-2 mb-4">
                <Button variant="success" type="submit" className="d-flex align-items-center">
                  <Add className="me-1" /> Adicionar
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setDepartamento("")}
                  disabled={!departamento}
                  className="d-flex align-items-center"
                >
                  <Clear className="me-1" /> Limpar
                </Button>
              </div>
            </Form>

            {departamentos.length > 0 ? (
              <div className="table-responsive">
                <Table hover className="modern-table">
                  <thead>
                    <tr className="bg-light">
                      <th width="10%">#</th>
                      <th>Departamento</th>
                      <th width="15%">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.map((dep, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{dep}</td>
                        <td>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removerDepartamento(index)}
                            className="d-flex align-items-center"
                          >
                            <Delete fontSize="small" className="me-1" /> Remover
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4">
                <Business className="text-muted" style={{ fontSize: '3rem' }} />
                <p className="text-muted mt-2">Nenhum departamento cadastrado</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  };

  export default CadastroDepartamentos;