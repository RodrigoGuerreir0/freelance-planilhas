import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from 'react';
import './Canvas.css';

const CanvasItem = ({ title, icon, items, color, onUpdateItems }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [currentItems, setCurrentItems] = useState(items);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...currentItems, newItem];
      setCurrentItems(updatedItems);
      onUpdateItems(updatedItems);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = currentItems.filter((_, i) => i !== index);
    setCurrentItems(updatedItems);
    onUpdateItems(updatedItems);
  };

  return (
    <Card className="canvas-card border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="canvas-item-title m-0">{title}</Card.Title>
          <span className="canvas-icon" style={{ color: `var(--bs-${color})` }}>{icon}</span>
        </div>
        
        <ul className="canvas-list mb-3">
          {currentItems.map((item, index) => (
            <li key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="canvas-item-text">{item}</span>
                <Button 
                  variant="link" 
                  className="canvas-remove-btn"
                  onClick={() => handleRemoveItem(index)}
                >
                  ×
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {isEditing && (
          <div className="mt-auto d-flex align-items-center">
            <input
              type="text"
              className="form-control canvas-input me-2"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Novo item"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <Button 
              variant="primary" 
              className="canvas-add-btn"
              onClick={handleAddItem}
              disabled={!newItem.trim()}
            >
              +
            </Button>
          </div>
        )}

        <Button 
          variant={isEditing ? 'outline-secondary' : 'outline-primary'} 
          size="sm" 
          className="canvas-edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Fechar' : 'Editar'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export function Canvas() {
  const [canvasData, setCanvasData] = useState({
    partnerships: ['Academias de Consultor'],
    activities: ['Consultoria', 'Vendas'],
    value: ['Consultoria Financeira'],
    relationships: ['-'],
    customers: ['Pequenas Empresas', 'Médias Empresas', 'Sistemas e Inventariadores'],
    costs: ['Salários', 'Custos com projetos'],
    revenue: ['Projetos de consultoria financeira', 'Cursos online e produtos digitais'],
    channels: ['Site', 'Redes Sociais', 'Parcerias'],
    resources: ['Equipe especializada', 'Software de gestão', 'Conteúdo educativo']
  });

  const updateItems = (section, items) => {
    setCanvasData(prev => ({ ...prev, [section]: items }));
  };

  return (
    <div className="canvas-wrapper">
      <Container fluid="lg" className="canvas-container">
        {/* Cabeçalho */}
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="canvas-title">Business Model Canvas</h1>
            <p className="canvas-subtitle">Visualize e edite seu modelo de negócios</p>
          </Col>
        </Row>

        {/* Primeira Linha */}
        <Row className="g-3 mb-4">
          <Col xs={12} sm={6} lg={3}>
            <CanvasItem 
              title="Parcerias"
              icon="🤝"
              items={canvasData.partnerships}
              color="primary"
              onUpdateItems={(items) => updateItems('partnerships', items)}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CanvasItem 
              title="Atividades Chave"
              icon="⚙️"
              items={canvasData.activities}
              color="success"
              onUpdateItems={(items) => updateItems('activities', items)}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CanvasItem 
              title="Oferta de Valor"
              icon="💎"
              items={canvasData.value}
              color="warning"
              onUpdateItems={(items) => updateItems('value', items)}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <CanvasItem 
              title="Relacionamento"
              icon="💬"
              items={canvasData.relationships}
              color="info"
              onUpdateItems={(items) => updateItems('relationships', items)}
            />
          </Col>
        </Row>

        {/* Segunda Linha */}
        <Row className="g-3 mb-4">
          <Col xs={12} md={6} lg={4}>
            <CanvasItem 
              title="Segmento de Clientes"
              icon="👥"
              items={canvasData.customers}
              color="primary"
              onUpdateItems={(items) => updateItems('customers', items)}
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <CanvasItem 
              title="Canais de Distribuição"
              icon="📦"
              items={canvasData.channels}
              color="secondary"
              onUpdateItems={(items) => updateItems('channels', items)}
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <CanvasItem 
              title="Recursos Chave"
              icon="🔑"
              items={canvasData.resources}
              color="warning"
              onUpdateItems={(items) => updateItems('resources', items)}
            />
          </Col>
        </Row>

        {/* Terceira Linha */}
        <Row className="g-3">
          <Col xs={12} lg={6}>
            <CanvasItem 
              title="Estrutura de Custos"
              icon="📉"
              items={canvasData.costs}
              color="danger"
              onUpdateItems={(items) => updateItems('costs', items)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CanvasItem 
              title="Fontes de Receitas"
              icon="💰"
              items={canvasData.revenue}
              color="success"
              onUpdateItems={(items) => updateItems('revenue', items)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Canvas;