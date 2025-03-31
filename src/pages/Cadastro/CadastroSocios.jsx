import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Table } from 'react-bootstrap';
import { TextField, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PercentIcon from '@mui/icons-material/Percent';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CadastroSocios = () => {
  const [socios, setSocios] = useState([
    {
      id: 1,
      nome: '',
      documento: '',
      percentual: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      formacao: '',
      responsabilidade: '',
      observacoes: ''
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setSocios(socios.map(socio => 
      socio.id === id ? { ...socio, [name]: value } : socio
    ));
  };

  const validate = (socio) => {
    const newErrors = {};
    if (!socio.nome) newErrors.nome = 'Nome é obrigatório';
    if (!socio.documento) newErrors.documento = 'CPF/CNPJ é obrigatório';
    if (!socio.percentual) newErrors.percentual = 'Percentual é obrigatório';
    return newErrors;
  };

  const handleAddSocio = () => {
    const newId = socios.length > 0 ? Math.max(...socios.map(s => s.id)) + 1 : 1;
    setSocios([...socios, {
      id: newId,
      nome: '',
      documento: '',
      percentual: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      formacao: '',
      responsabilidade: '',
      observacoes: ''
    }]);
    setEditingId(newId);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    const socio = socios.find(s => s.id === id);
    const validationErrors = validate(socio);
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setEditingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRemove = (id) => {
    setSocios(socios.filter(socio => socio.id !== id));
  };

  // Paleta de cores elegante
  const colors = {
    primary: '#2c3e50',
    secondary: '#34495e',
    light: '#ecf0f1',
    background: '#f8f9fa',
    text: '#2c3e50',
    success: '#27ae60'
  };

  return (
    <Container className="mt-3" style={{ maxWidth: '1000px' }}>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="border-0" style={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <Card.Header style={{ 
              backgroundColor: colors.primary,
              borderBottom: `1px solid ${colors.secondary}`,
              padding: '0.75rem 1.25rem'
            }}>
              <div className="d-flex align-items-center">
                <PersonIcon style={{ color: '#fff', marginRight: '10px' }} fontSize="small" />
                <h5 style={{ 
                  color: '#fff',
                  margin: 0,
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  Cadastro de Sócios
                </h5>
              </div>
            </Card.Header>
            
            <Card.Body style={{ 
              backgroundColor: colors.background,
              padding: '1.25rem'
            }}>
              {success && (
                <Alert variant="success" style={{
                  backgroundColor: colors.success,
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px'
                }} dismissible onClose={() => setSuccess(false)}>
                  Sócio salvo com sucesso!
                </Alert>
              )}

              <Table hover responsive className="mb-4">
                <thead>
                  <tr>
                    <th>Sócio</th>
                    <th>CPF/CNPJ</th>
                    <th>%</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map(socio => (
                    <tr key={socio.id}>
                      <td>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="nome"
                            value={socio.nome}
                            onChange={(e) => handleChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.nome}
                            helperText={errors.nome}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon fontSize="small" style={{ color: colors.primary }} />
                                </InputAdornment>
                              ),
                              style: {
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                border: '1px solid #dfe6e9'
                              }
                            }}
                          />
                        ) : (
                          socio.nome || <span className="text-muted">Novo sócio</span>
                        )}
                      </td>
                      <td>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="documento"
                            value={socio.documento}
                            onChange={(e) => handleChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.documento}
                            helperText={errors.documento}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon fontSize="small" style={{ color: colors.primary }} />
                                </InputAdornment>
                              ),
                              style: {
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                border: '1px solid #dfe6e9'
                              }
                            }}
                          />
                        ) : (
                          socio.documento || '-'
                        )}
                      </td>
                      <td>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="percentual"
                            value={socio.percentual}
                            onChange={(e) => handleChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.percentual}
                            helperText={errors.percentual}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PercentIcon fontSize="small" style={{ color: colors.primary }} />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              style: {
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                border: '1px solid #dfe6e9'
                              }
                            }}
                          />
                        ) : (
                          socio.percentual ? `${socio.percentual}%` : '-'
                        )}
                      </td>
                      <td>
                        {editingId === socio.id ? (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleSave(socio.id)}
                            style={{ marginRight: '5px' }}
                          >
                            Salvar
                          </Button>
                        ) : (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(socio.id)}
                            style={{ marginRight: '5px' }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(socio.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {editingId && socios.find(s => s.id === editingId) && (
                <Card className="mb-4" style={{ borderColor: '#dfe6e9' }}>
                  <Card.Body>
                    <h6 className="mb-3">Detalhes do Sócio</h6>
                    <Row>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Data de Nascimento"
                          name="data_nascimento"
                          type="date"
                          value={socios.find(s => s.id === editingId).data_nascimento}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CakeIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Telefone"
                          name="telefone"
                          value={socios.find(s => s.id === editingId).telefone}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={socios.find(s => s.id === editingId).email}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Formação"
                          name="formacao"
                          value={socios.find(s => s.id === editingId).formacao}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SchoolIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Responsabilidade"
                          name="responsabilidade"
                          value={socios.find(s => s.id === editingId).responsabilidade}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WorkIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                      <Col md={12} className="mb-3">
                        <TextField
                          fullWidth
                          label="Observações"
                          name="observacoes"
                          value={socios.find(s => s.id === editingId).observacoes}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          multiline
                          rows={2}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <NotesIcon fontSize="small" style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: '#fff',
                              borderRadius: '6px',
                              border: '1px solid #dfe6e9'
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}

              <div className="d-flex justify-content-end">
                <Button 
                  variant="primary"
                  onClick={handleAddSocio}
                  style={{
                    backgroundColor: colors.primary,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}
                >
                  <AddIcon fontSize="small" style={{ marginRight: '5px' }} />
                  Adicionar Sócio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroSocios;