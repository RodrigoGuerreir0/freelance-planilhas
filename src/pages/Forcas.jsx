import React, { useState } from 'react';
import { Container, Card, Button, Table, Form, Collapse, Modal } from 'react-bootstrap';
import { 
  Business,
  People,
  LocalShipping,
  Store,
  SwapHoriz,
  Add,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Assessment,
  BarChart,
  ShowChart,
  TrendingUp,
  PieChart,
  Money,
  ShoppingCart,
  Work,
  Public,
  Star
} from '@mui/icons-material';

const AnaliseConcorrencia = () => {
  // Paleta de cores
  const colors = {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db',
    light: '#ecf0f1',
    background: '#f8f9fa',
    text: '#2c3e50',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    white: '#ffffff',
    black: '#000000'
  };

  // Opções de ícones
  const iconesDisponiveis = [
    { nome: 'Business', componente: <Business /> },
    { nome: 'People', componente: <People /> },
    { nome: 'LocalShipping', componente: <LocalShipping /> },
    { nome: 'Store', componente: <Store /> },
    { nome: 'SwapHoriz', componente: <SwapHoriz /> },
    { nome: 'Assessment', componente: <Assessment /> },
    { nome: 'BarChart', componente: <BarChart /> },
    { nome: 'ShowChart', componente: <ShowChart /> },
    { nome: 'TrendingUp', componente: <TrendingUp /> },
    { nome: 'PieChart', componente: <PieChart /> },
    { nome: 'Money', componente: <Money /> },
    { nome: 'ShoppingCart', componente: <ShoppingCart /> },
    { nome: 'Work', componente: <Work /> },
    { nome: 'Public', componente: <Public /> },
    { nome: 'Star', componente: <Star /> }
  ];

  // Opções fixas
  const opcoesResposta = [
    'Concordo Totalmente',
    'Concordo Parcialmente',
    'Não concordo e nem discordo',
    'Discordo Parcialmente',
    'Discordo Totalmente'
  ];

  const opcoesImportancia = [
    'Muito importante',
    'Importante',
    'Sem importância'
  ];

  // Estado para o modal de nova análise
  const [showModal, setShowModal] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [iconeSelecionado, setIconeSelecionado] = useState(iconesDisponiveis[0]);

  // Estado inicial com os dados das tabelas
  const [tabelas, setTabelas] = useState([
    {
      id: 1,
      titulo: 'Poder de negociação dos fornecedores',
      icone: <LocalShipping style={{ fontSize: '1.5rem' }} />,
      perguntas: [
        { id: 1, texto: 'Existem poucos fornecedores para os insumos do seu negócio?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 0 },
        { id: 2, texto: 'O preço dos insumos necessários para o seu negócio varia fortemente?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 4.5 },
        { id: 3, texto: 'O perfil profissional necessário para o seu negócio é fácil de ser encontrado?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 0 },
        { id: 4, texto: 'Há carência de formação de profissionais para o seu mercado de fornecedores?', resposta: 'Concordo Totalmente', importancia: 'Sem importância', pontuacao: 5 },
        { id: 5, texto: 'Você tem dificuldade em substituir seus insumos por outro tipo (qualidade, preço, etc)?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 3 },
        { id: 6, texto: 'Existem pesquisas para melhoria de tecnologia na área dos seus fornecedores?', resposta: 'Concordo Parcialmente', importancia: 'Sem importância', pontuacao: 4 }
      ],
      aberto: true
    },
    {
      id: 2,
      titulo: 'Ameaça de entrada de novos concorrentes',
      icone: <Business style={{ fontSize: '1.5rem' }} />,
      perguntas: [
        { id: 1, texto: 'O custo para começar um novo negócio dentro da sua indústria é baixo?', resposta: 'Discordo Totalmente', importancia: 'Sem importância', pontuacao: 0 },
        { id: 2, texto: 'Existe espaço para mais concorrentes fora os já estabelecidos?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 4.5 },
        { id: 3, texto: 'A indústria é de pequena escala?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 0 },
        { id: 4, texto: 'Os custos de troca para os clientes são baixos?', resposta: 'Discordo Totalmente', importancia: 'Sem importância', pontuacao: 0 },
        { id: 5, texto: 'Existe escassez de pontos de vendas para esse tipo de negócio?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 3 },
        { id: 6, texto: 'Existe o risco de novas tecnologias derrubarem as barreiras de entradas?', resposta: 'Concordo Parcialmente', importancia: 'Sem importância', pontuacao: 4 }
      ],
      aberto: true
    },
    {
      id: 3,
      titulo: 'Rivalidade entre os concorrentes',
      icone: <Store style={{ fontSize: '1.5rem' }} />,
      perguntas: [
        { id: 1, texto: 'Na indústria que você pretende entrar/já atua existem concorrentes estabelecidos?', resposta: 'Concordo Parcialmente', importancia: 'Muito Importante', pontuacao: 8 },
        { id: 2, texto: 'O(s) concorrente(s) atuais já conseguem atender a totalidade do mercado?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 4.5 },
        { id: 3, texto: 'Já existe uma competição explícita entre os concorrentes?', resposta: 'Discordo Totalmente', importancia: 'Muito Importante', pontuacao: 0 },
        { id: 4, texto: 'Você vai entrar no mesmo mercado que eles?', resposta: 'Concordo Totalmente', importancia: 'Sem Importância', pontuacao: 5 },
        { id: 5, texto: 'A diversidade desses concorrentes é alta?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 3 },
        { id: 6, texto: 'Existe uma guerra de preço ou de qualidade no setor pretendido?', resposta: 'Concordo Parcialmente', importancia: 'Muito Importante', pontuacao: 8 }
      ],
      aberto: true
    },
    {
      id: 4,
      titulo: 'Poder de negociação dos clientes',
      icone: <People style={{ fontSize: '1.5rem' }} />,
      perguntas: [
        { id: 1, texto: 'Seus clientes são sensíveis a mudanças de preço?', resposta: 'Concordo Totalmente', importancia: 'Muito Importante', pontuacao: 10 },
        { id: 2, texto: 'Existe escassez de clientes para o seu negócio em relação ao seu setor?', resposta: 'Concordo Parcialmente', importancia: 'Importante', pontuacao: 6 },
        { id: 3, texto: 'Você tem dificuldade em fidelizar os seus clientes?', resposta: 'Concordo Totalmente', importancia: 'Muito Importante', pontuacao: 10 },
        { id: 4, texto: 'O volume de compra dos seus clientes é alto?', resposta: 'Concordo Totalmente', importancia: 'Importante', pontuacao: 7.5 },
        { id: 5, texto: 'O custo para o cliente trocar de fornecedor é baixo?', resposta: 'Discordo Parcialmente', importancia: 'Muito Importante', pontuacao: 4 },
        { id: 6, texto: 'Existe a possibilidade do seu cliente fazer o próprio produto?', resposta: 'Concordo Parcialmente', importancia: 'Muito Importante', pontuacao: 8 }
      ],
      aberto: true
    },
    {
      id: 5,
      titulo: 'Ameaça de substitutos',
      icone: <SwapHoriz style={{ fontSize: '1.5rem' }} />,
      perguntas: [
        { id: 1, texto: 'Existem substitutos diretos ao seu produto/serviço?', resposta: 'Concordo Totalmente', importancia: 'Muito Importante', pontuacao: 10 },
        { id: 2, texto: 'Os produtos substitutos tem alto grau de inovação?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 4.5 },
        { id: 3, texto: 'Existe propensão dos seus clientes trocarem a sua oferta pelos substitutos?', resposta: 'Concordo Parcialmente', importancia: 'Muito Importante', pontuacao: 8 },
        { id: 4, texto: 'O custo de mudança dos seus clientes para o substituto é baixo?', resposta: 'Concordo Totalmente', importancia: 'Sem importância', pontuacao: 5 },
        { id: 5, texto: 'O preço dos produtos substitutos é inferior ao do seu produto ou serviço?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 3 },
        { id: 6, texto: 'A qualidade dos produtos substitutos é superior a qualidade do seu produto ou serviço?', resposta: 'Concordo Parcialmente', importancia: 'Muito Importante', pontuacao: 8 }
      ],
      aberto: true
    }
  ]);

  // Alternar estado de abertura/fechamento de uma tabela
  const toggleAbrirTabela = (tabelaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return { ...tabela, aberto: !tabela.aberto };
      }
      return tabela;
    }));
  };

  // Adicionar nova pergunta a uma tabela específica
  const adicionarPergunta = (tabelaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        const novaPerguntaId = tabela.perguntas.length > 0 
          ? Math.max(...tabela.perguntas.map(p => p.id)) + 1 
          : 1;
        
        return {
          ...tabela,
          perguntas: [
            ...tabela.perguntas,
            { 
              id: novaPerguntaId, 
              texto: '', 
              resposta: 'Não concordo e nem discordo', 
              importancia: 'Importante', 
              pontuacao: 5.0 
            }
          ]
        };
      }
      return tabela;
    }));
  };

  // Abrir modal para nova análise
  const abrirModalNovaAnalise = () => {
    setNovoTitulo('');
    setIconeSelecionado(iconesDisponiveis[0]);
    setShowModal(true);
  };

  // Adicionar nova tabela de análise
  const adicionarNovaAnalise = () => {
    if (!novoTitulo.trim()) return;
    
    const novoId = tabelas.length > 0 ? Math.max(...tabelas.map(t => t.id)) + 1 : 1;
    const novaTabela = {
      id: novoId,
      titulo: novoTitulo,
      icone: React.cloneElement(iconeSelecionado.componente, { style: { fontSize: '1.5rem' } }),
      perguntas: [
        { 
          id: 1, 
          texto: '', 
          resposta: 'Não concordo e nem discordo', 
          importancia: 'Importante', 
          pontuacao: 5.0 
        }
      ],
      aberto: true
    };
    setTabelas([...tabelas, novaTabela]);
    setShowModal(false);
  };

  // Remover pergunta de uma tabela específica
  const removerPergunta = (tabelaId, perguntaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return {
          ...tabela,
          perguntas: tabela.perguntas.filter(p => p.id !== perguntaId)
        };
      }
      return tabela;
    }));
  };

  // Atualizar uma pergunta específica
  const atualizarPergunta = (tabelaId, perguntaId, campo, valor) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return {
          ...tabela,
          perguntas: tabela.perguntas.map(pergunta => {
            if (pergunta.id === perguntaId) {
              // Formata a pontuação para ter .0 se necessário
              if (campo === 'pontuacao') {
                const num = parseFloat(valor);
                valor = isNaN(num) ? 0 : num;
              }
              return { ...pergunta, [campo]: valor };
            }
            return pergunta;
          })
        };
      }
      return tabela;
    }));
  };

  // Formatar pontuação para exibição (adiciona .0 se necessário)
  const formatarPontuacao = (valor) => {
    const num = parseFloat(valor);
    if (isNaN(num)) return '0.0';
    
    // Verifica se já tem casas decimais
    if (num % 1 === 0) {
      return num.toFixed(1); // Adiciona .0
    }
    return num.toString(); // Mantém como está
  };

  // Estilo para respostas
  const getRespostaStyle = (resposta) => {
    switch(resposta) {
      case 'Concordo Totalmente':
        return { backgroundColor: colors.success, color: colors.white };
      case 'Concordo Parcialmente':
        return { backgroundColor: colors.error, color: colors.white };
      case 'Não concordo e nem discordo':
        return { backgroundColor: colors.white, color: colors.black };
      case 'Discordo Parcialmente':
        return { backgroundColor: colors.warning, color: colors.white };
      case 'Discordo Totalmente':
        return { backgroundColor: colors.error, color: colors.white };
      default:
        return {};
    }
  };

  // Estilo para importância
  const getImportanciaStyle = (importancia) => {
    switch(importancia) {
      case 'Muito importante':
        return { backgroundColor: colors.success, color: colors.white };
      case 'Importante':
        return { backgroundColor: colors.warning, color: colors.white };
      case 'Sem importância':
        return { backgroundColor: colors.error, color: colors.white };
      default:
        return {};
    }
  };

  // Estilo para pontuação
  const getPontuacaoStyle = (pontuacao) => {
    const num = parseFloat(pontuacao);
    if (isNaN(num)) return { color: colors.black };
    
    if (num >= 8) return { color: colors.success, fontWeight: 'bold' };
    if (num >= 5) return { color: colors.warning, fontWeight: 'bold' };
    return { color: colors.error, fontWeight: 'bold' };
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '1200px' }}>
      <h3 style={{ 
        color: colors.primary,
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Business style={{ fontSize: '2rem' }} />
        Análise de Concorrência e Mercado
      </h3>

      {/* Renderizar cada tabela */}
      {tabelas.map(tabela => (
        <Card key={tabela.id} className="mb-4" style={{ 
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Card.Header 
            onClick={() => toggleAbrirTabela(tabela.id)}
            style={{ 
              backgroundColor: colors.primary,
              color: colors.white,
              borderBottom: `1px solid ${colors.secondary}`,
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {tabela.aberto ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              {tabela.icone}
              <h5 style={{ margin: 0, fontWeight: 500 }}>{tabela.titulo}</h5>
            </div>
            <Button 
              variant="light" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                adicionarPergunta(tabela.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Add fontSize="small" /> Adicionar Pergunta
            </Button>
          </Card.Header>
          
          <Collapse in={tabela.aberto}>
            <div>
              <Card.Body style={{ padding: '1rem' }}>
                <div style={{ overflowX: 'auto' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: colors.secondary, color: colors.white, width: '40%' }}>Pergunta</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.white, width: '15%' }}>Resposta</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.white, width: '15%' }}>Importância</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.white, width: '10%' }}>Pontuação</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.white, width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabela.perguntas.map((pergunta) => (
                        <tr key={pergunta.id}>
                          <td>
                            <Form.Control
                              type="text"
                              value={pergunta.texto}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'texto', e.target.value)}
                              placeholder="Digite a pergunta"
                            />
                          </td>
                          <td style={getRespostaStyle(pergunta.resposta)}>
                            <Form.Select
                              value={pergunta.resposta}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'resposta', e.target.value)}
                              style={getRespostaStyle(pergunta.resposta)}
                            >
                              {opcoesResposta.map((opcao, index) => (
                                <option key={index} value={opcao} style={getRespostaStyle(opcao)}>
                                  {opcao}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                          <td style={getImportanciaStyle(pergunta.importancia)}>
                            <Form.Select
                              value={pergunta.importancia}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'importancia', e.target.value)}
                              style={getImportanciaStyle(pergunta.importancia)}
                            >
                              {opcoesImportancia.map((opcao, index) => (
                                <option key={index} value={opcao} style={getImportanciaStyle(opcao)}>
                                  {opcao}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              value={pergunta.pontuacao}
                              onChange={(e) => {
                                let valor = e.target.value;
                                // Adiciona .0 se for um número inteiro
                                if (valor && !valor.includes('.')) {
                                  valor = parseFloat(valor).toFixed(1);
                                }
                                atualizarPergunta(tabela.id, pergunta.id, 'pontuacao', valor);
                              }}
                              style={{
                                textAlign: 'center',
                                ...getPontuacaoStyle(pergunta.pontuacao)
                              }}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removerPergunta(tabela.id, pergunta.id)}
                              style={{ padding: '0.25rem' }}
                            >
                              <Delete fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}

      {/* Botão para adicionar nova tabela */}
      <div className="text-center mb-4">
        <Button 
          variant="primary" 
          onClick={abrirModalNovaAnalise}
          style={{ 
            backgroundColor: colors.primary,
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Add /> Adicionar Nova Análise
        </Button>
      </div>

      {/* Modal para nova análise */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: colors.primary, color: colors.white }}>
          <Modal.Title>Criar Nova Análise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Análise</Form.Label>
            <Form.Control
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="Digite o nome da análise"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Ícone</Form.Label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              marginTop: '10px'
            }}>
              {iconesDisponiveis.map((icone, index) => (
                <Button
                  key={index}
                  variant={icone.nome === iconeSelecionado.nome ? 'primary' : 'outline-secondary'}
                  onClick={() => setIconeSelecionado(icone)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px'
                  }}
                >
                  {React.cloneElement(icone.componente, { style: { fontSize: '1.5rem' } })}
                  <span style={{ fontSize: '0.7rem', marginTop: '5px' }}>{icone.nome}</span>
                </Button>
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={adicionarNovaAnalise}
            disabled={!novoTitulo.trim()}
          >
            Criar Análise
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AnaliseConcorrencia;