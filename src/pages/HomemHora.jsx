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
    hours: {
      hour1: 2000,
      hour2: 0,
      hour3: 0,
      hour4: 0,
      hour5: 0,
      hour6: 0
    },
    totalHourValue: 2000
  },
  {
    id: 2,
    product: 'Cursos Finanças Já',
    hours: {
      hour1: 0,
      hour2: 0,
      hour3: 0,
      hour4: 0,
      hour5: 0,
      hour6: 0
    },
    totalHourValue: 0
  }
];

const HomemHora = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [rows, setRows] = useState(initialRows);
  const [newRow, setNewRow] = useState({
    product: '',
    hours: { hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0 }
  });
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [nextHourId, setNextHourId] = useState(7);

  const calculateTotal = (row) => {
    const hoursSum = Object.values(row.hours || {}).reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
    return {
      ...row,
      totalHourValue: parseFloat(hoursSum.toFixed(2))
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
      hours: { hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0 }
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('hour-')) {
      const hourKey = name.split('-')[1];
      setNewRow({
        ...newRow,
        hours: {
          ...newRow.hours,
          [hourKey]: parseFloat(value) || 0
        }
      });
    } else {
      setNewRow({
        ...newRow,
        [name]: value
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('hour-')) {
      const hourKey = name.split('-')[1];
      setEditRow({
        ...editRow,
        hours: {
          ...editRow.hours,
          [hourKey]: parseFloat(value) || 0
        }
      });
    } else {
      setEditRow({
        ...editRow,
        [name]: value
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

  const addHourField = () => {
    const newHourKey = `hour${nextHourId}`;
    setNextHourId(nextHourId + 1);
    
    setNewRow({
      ...newRow,
      hours: {
        ...newRow.hours,
        [newHourKey]: 0
      }
    });
  };

  const removeHourField = (hourKey) => {
    const newHours = { ...newRow.hours };
    delete newHours[hourKey];
    setNewRow({
      ...newRow,
      hours: newHours
    });
  };

  const getAllHourKeys = () => {
    const allKeys = new Set();
    rows.forEach(row => {
      if (row.hours) {
        Object.keys(row.hours).forEach(key => allKeys.add(key));
      }
    });
    if (newRow.hours) {
      Object.keys(newRow.hours).forEach(key => allKeys.add(key));
    }
    return Array.from(allKeys).sort((a, b) => {
      const numA = parseInt(a.replace('hour', ''));
      const numB = parseInt(b.replace('hour', ''));
      return numA - numB;
    });
  };

  const allHourKeys = getAllHourKeys();

  // Versão mobile simplificada
  const MobileRow = ({ row, index }) => (
    <Box key={row.id} mb={2} p={2} bgcolor={index % 2 === 0 ? colors.light : colors.secondary}>
      <Typography variant="subtitle1" fontWeight="bold">{row.product}</Typography>
      
      {allHourKeys.map(hourKey => (
        <Box key={hourKey} display="flex" justifyContent="space-between" mt={1}>
          <Typography>Hora {hourKey.replace('hour', '')}:</Typography>
          <Typography>{formatCurrency(row.hours?.[hourKey] || 0)}</Typography>
        </Box>
      ))}
      
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography fontWeight="bold">Total:</Typography>
        <Typography fontWeight="bold">{formatCurrency(row.totalHourValue)}</Typography>
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
            Precificação de Homem/Hora
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
              
              <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} flexWrap="wrap" gap={2}>
                {allHourKeys.map((hourKey) => (
                  <Box key={hourKey} display="flex" alignItems="center" gap={1}>
                    <TextField
                      label={`Hora ${hourKey.replace('hour', '')} (R$)`}
                      name={`hour-${hourKey}`}
                      type="number"
                      value={newRow.hours?.[hourKey] || 0}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: isSmallScreen ? '100%' : '150px' }}
                    />
                    {parseInt(hourKey.replace('hour', '')) > 6 && (
                      <IconButton
                        size="small"
                        onClick={() => removeHourField(hourKey)}
                        style={{ color: colors.error }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                <Button
                  variant="outlined"
                  onClick={addHourField}
                  startIcon={<Add />}
                  size="small"
                  sx={{ 
                    width: isSmallScreen ? '100%' : 'auto',
                    mt: isSmallScreen ? 1 : 0
                  }}
                >
                  Adicionar Hora
                </Button>
              </Box>
            </Box>
            
            <Box mt={2} display="flex" justifyContent="flex-start">
              <ActionButton
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRow}
                fullWidth={isSmallScreen}
              >
                Adicionar Produto
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
                    {allHourKeys.map(hourKey => (
                      <TableCell key={hourKey} align="right">
                        Hora {hourKey.replace('hour', '')}
                      </TableCell>
                    ))}
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
                          
                          {allHourKeys.map(hourKey => (
                            <TableCell key={`edit-${hourKey}`} align="right">
                              <TextField
                                name={`hour-${hourKey}`}
                                type="number"
                                value={editRow.hours?.[hourKey] || 0}
                                onChange={handleEditInputChange}
                                size="small"
                                sx={{ width: '80px' }}
                              />
                            </TableCell>
                          ))}
                          
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {formatCurrency(calculateTotal(editRow).totalHourValue)}
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
                          
                          {allHourKeys.map(hourKey => (
                            <TableCell key={`view-${hourKey}`} align="right">
                              {formatCurrency(row.hours?.[hourKey] || 0)}
                            </TableCell>
                          ))}
                          
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {formatCurrency(row.totalHourValue)}
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

export default HomemHora;