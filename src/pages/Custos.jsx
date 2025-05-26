import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  TableContainer,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add, Delete, Edit, Save, Cancel } from '@mui/icons-material';

const colors = {
  primary: '#1976d2',
  secondary: '#f5f5f5',
  accent: '#64b5f6',
  light: '#ffffff',
  background: '#fafafa',
  text: '#424242',
  success: '#81C784',
  warning: '#FFB74D',
  error: '#E57373',
  white: '#ffffff',
  black: '#212121'
};

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  paddingLeft: '300px',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '240px'
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: '180px'
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%'
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: colors.light,
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  margin: theme.spacing(2, 0),
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    padding: theme.spacing(1)
  }
}));

const StyledTableHead = styled(TableHead)({
  backgroundColor: colors.primary,
  '& th': {
    color: colors.white,
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }
});

const StyledTableRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? colors.light : colors.secondary,
  '&:hover': {
    backgroundColor: colors.accent,
    opacity: 0.9
  }
}));

const ActionButton = styled(Button)({
  margin: '0 4px',
  backgroundColor: colors.primary,
  color: colors.white,
  '&:hover': {
    backgroundColor: colors.accent
  }
});

const initialRows = [
  {
    id: 1,
    product: 'Consultoria Financeira',
    cost1: 500,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {},
    otherCosts: 0,
    totalCost: 500
  },
  {
    id: 2,
    product: 'Cursos Finanças Já',
    cost1: 300,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {},
    otherCosts: 0,
    totalCost: 300
  }
];

const Custos = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [rows, setRows] = useState(initialRows);
  const [newRow, setNewRow] = useState({
    product: '',
    cost1: 0,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {},
    otherCosts: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [nextExtraCostId, setNextExtraCostId] = useState(1);

  const calculateTotal = (row) => {
    const fixedCosts = row.cost1 + row.cost2 + row.cost3 + row.cost4 + row.cost5;
    const extraCostsSum = Object.values(row.extraCosts || {}).reduce((sum, cost) => sum + (parseFloat(cost) || 0), 0);
    const total = fixedCosts + extraCostsSum + row.otherCosts;
    return {
      ...row,
      totalCost: parseFloat(total.toFixed(2))
    };
  };

  const handleAddRow = () => {
    if (!newRow.product) return;
    
    const calculatedRow = calculateTotal({
      ...newRow,
      id: Date.now()
    });
    setRows([...rows, calculatedRow]);
    setNewRow({
      product: '',
      cost1: 0,
      cost2: 0,
      cost3: 0,
      cost4: 0,
      cost5: 0,
      extraCosts: {},
      otherCosts: 0
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('extraCost-')) {
      const extraCostKey = name.split('-')[1];
      setNewRow({
        ...newRow,
        extraCosts: {
          ...newRow.extraCosts,
          [extraCostKey]: parseFloat(value) || 0
        }
      });
    } else {
      setNewRow({
        ...newRow,
        [name]: name === 'product' ? value : parseFloat(value) || 0
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('extraCost-')) {
      const extraCostKey = name.split('-')[1];
      setEditRow({
        ...editRow,
        extraCosts: {
          ...editRow.extraCosts,
          [extraCostKey]: parseFloat(value) || 0
        }
      });
    } else {
      setEditRow({
        ...editRow,
        [name]: name === 'product' ? value : parseFloat(value) || 0
      });
    }
  };

  const handleEditRow = (row) => {
    setEditingId(row.id);
    setEditRow({ ...row });
  };

  const handleSaveRow = () => {
    const calculatedRow = calculateTotal(editRow);
    setRows(rows.map(row => row.id === editingId ? calculatedRow : row));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const addExtraCostField = () => {
    const newExtraCostKey = `extra${nextExtraCostId}`;
    setNextExtraCostId(nextExtraCostId + 1);
    
    setNewRow({
      ...newRow,
      extraCosts: {
        ...newRow.extraCosts,
        [newExtraCostKey]: 0
      }
    });
  };

  const removeExtraCostField = (extraCostKey) => {
    const newExtraCosts = { ...newRow.extraCosts };
    delete newExtraCosts[extraCostKey];
    setNewRow({
      ...newRow,
      extraCosts: newExtraCosts
    });
  };

  const getAllExtraCostKeys = () => {
    const allKeys = new Set();
    rows.forEach(row => {
      if (row.extraCosts) {
        Object.keys(row.extraCosts).forEach(key => allKeys.add(key));
      }
    });
    if (newRow.extraCosts) {
      Object.keys(newRow.extraCosts).forEach(key => allKeys.add(key));
    }
    return Array.from(allKeys);
  };

  const allExtraCostKeys = getAllExtraCostKeys();

  // Versão simplificada para mobile
  const MobileRow = ({ row, index }) => (
    <Box key={row.id} mb={2} p={2} bgcolor={index % 2 === 0 ? colors.light : colors.secondary}>
      <Typography variant="subtitle1" fontWeight="bold">{row.product}</Typography>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Custo 1:</Typography>
        <Typography>{formatCurrency(row.cost1)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Custo 2:</Typography>
        <Typography>{formatCurrency(row.cost2)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Custo 3:</Typography>
        <Typography>{formatCurrency(row.cost3)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Custo 4:</Typography>
        <Typography>{formatCurrency(row.cost4)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Custo 5:</Typography>
        <Typography>{formatCurrency(row.cost5)}</Typography>
      </Box>
      
      {allExtraCostKeys.map(extraCostKey => (
        <Box key={extraCostKey} display="flex" justifyContent="space-between">
          <Typography>Extra {extraCostKey.replace('extra', '')}:</Typography>
          <Typography>{formatCurrency(row.extraCosts?.[extraCostKey] || 0)}</Typography>
        </Box>
      ))}
      
      <Box display="flex" justifyContent="space-between">
        <Typography>Outros Custos:</Typography>
        <Typography>{formatCurrency(row.otherCosts)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography fontWeight="bold">Total:</Typography>
        <Typography fontWeight="bold">{formatCurrency(row.totalCost)}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <IconButton
          aria-label="edit"
          onClick={() => handleEditRow(row)}
          style={{ color: colors.primary }}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteRow(row.id)}
          style={{ color: colors.error }}
        >
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <PageContainer>
      <ContentContainer>
        <StyledTableContainer component={Paper}>
          <Typography variant="h4" gutterBottom style={{ 
            color: colors.primary, 
            textAlign: 'left', 
            padding: theme.spacing(2),
            fontSize: isSmallScreen ? '1.5rem' : '2rem'
          }}>
            Tabela de Custos
          </Typography>
          
          <Box mb={4} p={2} style={{ backgroundColor: colors.background, borderRadius: '4px' }}>
            <Typography variant="h6" gutterBottom style={{ color: colors.text }}>
              Adicionar Novo Produto/Serviço
            </Typography>
            <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} flexWrap="wrap" gap={2}>
              <TextField
                label="Produto ou Serviço"
                name="product"
                value={newRow.product}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth={isSmallScreen}
              />
              <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} gap={2} width={isSmallScreen ? '100%' : 'auto'}>
                {[1, 2, 3, 4, 5].map(num => (
                  <TextField
                    key={`cost${num}`}
                    label={`Custo ${num} (R$)`}
                    name={`cost${num}`}
                    type="number"
                    value={newRow[`cost${num}`]}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: isSmallScreen ? '100%' : '120px' }}
                  />
                ))}
              </Box>
              
              {/* Campos de custos extras */}
              <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} flexWrap="wrap" gap={2}>
                {allExtraCostKeys.map((extraCostKey) => (
                  <Box key={extraCostKey} display="flex" alignItems="center" gap={1}>
                    <TextField
                      label={`Extra ${extraCostKey.replace('extra', '')} (R$)`}
                      name={`extraCost-${extraCostKey}`}
                      type="number"
                      value={newRow.extraCosts?.[extraCostKey] || 0}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: isSmallScreen ? '100%' : '150px' }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeExtraCostField(extraCostKey)}
                      style={{ color: colors.error }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  variant="outlined"
                  onClick={addExtraCostField}
                  startIcon={<Add />}
                  size="small"
                  sx={{ 
                    width: isSmallScreen ? '100%' : 'auto',
                    mt: isSmallScreen ? 1 : 0
                  }}
                >
                  Adicionar Custo Extra
                </Button>
              </Box>
              
              <TextField
                label="Outros Custos (R$)"
                name="otherCosts"
                type="number"
                value={newRow.otherCosts}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                sx={{ minWidth: isSmallScreen ? '100%' : '150px' }}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-start">
              <ActionButton
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRow}
                fullWidth={isSmallScreen}
              >
                Adicionar
              </ActionButton>
            </Box>
          </Box>

          {isSmallScreen ? (
            <Box>
              {rows.map((row, index) => (
                <MobileRow key={row.id} row={row} index={index} />
              ))}
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size={isMediumScreen ? 'small' : 'medium'}>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Produto/Serviço</TableCell>
                    <TableCell align="right">Custo 1</TableCell>
                    <TableCell align="right">Custo 2</TableCell>
                    <TableCell align="right">Custo 3</TableCell>
                    <TableCell align="right">Custo 4</TableCell>
                    <TableCell align="right">Custo 5</TableCell>
                    
                    {allExtraCostKeys.map(extraCostKey => (
                      <TableCell key={extraCostKey} align="right">
                        Extra {extraCostKey.replace('extra', '')}
                      </TableCell>
                    ))}
                    
                    <TableCell align="right">Outros Custos</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <StyledTableRow key={row.id} index={index}>
                      {editingId === row.id ? (
                        <>
                          <TableCell>
                            <TextField
                              name="product"
                              value={editRow.product}
                              onChange={handleEditInputChange}
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          {[1, 2, 3, 4, 5].map(num => (
                            <TableCell key={`edit-cost${num}`} align="right">
                              <TextField
                                name={`cost${num}`}
                                type="number"
                                value={editRow[`cost${num}`]}
                                onChange={handleEditInputChange}
                                size="small"
                                sx={{ width: '80px' }}
                              />
                            </TableCell>
                          ))}
                          
                          {allExtraCostKeys.map(extraCostKey => (
                            <TableCell key={`edit-${extraCostKey}`} align="right">
                              <TextField
                                name={`extraCost-${extraCostKey}`}
                                type="number"
                                value={editRow.extraCosts?.[extraCostKey] || 0}
                                onChange={handleEditInputChange}
                                size="small"
                                sx={{ width: '80px' }}
                              />
                            </TableCell>
                          ))}
                          
                          <TableCell align="right">
                            <TextField
                              name="otherCosts"
                              type="number"
                              value={editRow.otherCosts}
                              onChange={handleEditInputChange}
                              size="small"
                              sx={{ width: '80px' }}
                            />
                          </TableCell>
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {formatCurrency(calculateTotal(editRow).totalCost)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="save"
                              onClick={handleSaveRow}
                              style={{ color: colors.success }}
                            >
                              <Save />
                            </IconButton>
                            <IconButton
                              aria-label="cancel"
                              onClick={handleCancelEdit}
                              style={{ color: colors.warning }}
                            >
                              <Cancel />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{row.product}</TableCell>
                          <TableCell align="right">{formatCurrency(row.cost1)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.cost2)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.cost3)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.cost4)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.cost5)}</TableCell>
                          
                          {allExtraCostKeys.map(extraCostKey => (
                            <TableCell key={`view-${extraCostKey}`} align="right">
                              {formatCurrency(row.extraCosts?.[extraCostKey] || 0)}
                            </TableCell>
                          ))}
                          
                          <TableCell align="right">{formatCurrency(row.otherCosts)}</TableCell>
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {formatCurrency(row.totalCost)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEditRow(row)}
                              style={{ color: colors.primary }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteRow(row.id)}
                              style={{ color: colors.error }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </StyledTableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Custos;