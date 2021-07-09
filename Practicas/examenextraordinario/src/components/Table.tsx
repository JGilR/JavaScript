import React, { useState } from 'react'
import './Table.css'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) => 
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        }
    })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) => 
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        }
    })
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IData {
    cantidad: string,
    nombre: string,
    proyecto: string,
    vencimiento: string,
}

interface IRows {
    rows: IData[],
}

function createData(cantidad: string, nombre: string, proyecto: string, vencimiento: string) {
  return { cantidad, nombre, proyecto, vencimiento };
}



function DenseTable() {
  const classes = useStyles();

  const [state, setState] = useState<IRows>({rows: []});
  const [cantidad, setCantidad] = useState<string>();
  const [nombre, setNombre] = useState<string>();
  const [proyecto, setProyecto] = useState<string>();
  const [vencimiento, setVencimiento] = useState<string>();

  const addRow = () => {
      setState({
          rows: [...state.rows, createData(`${cantidad}`, `${nombre}`, `${proyecto}`, `${vencimiento}`)]
      })
  }

  const deleteRow = () => {
      setState({
          rows: []
      })
  }

  const { rows } = state;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cantidad($) </StyledTableCell>
            <StyledTableCell align="left">Nombre Empresa</StyledTableCell>
            <StyledTableCell align="left">Proyecto</StyledTableCell>
            <StyledTableCell align="left">Vencimiento</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.cantidad}>
              <StyledTableCell component="th" scope="row">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="left">{row.nombre}</StyledTableCell>
              <StyledTableCell align="left">{row.proyecto}</StyledTableCell>
              <StyledTableCell align="left">{row.vencimiento}</StyledTableCell>
              <button onClick={(e) => deleteRow()}>Borrar</button>
            </StyledTableRow>
            
          ))}
          
        </TableBody>
      </Table>
      <input type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
      <input type="text" placeholder="Nombre empresa" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
      <input type="text" placeholder="Proyecto" value={proyecto} onChange={(e) => setProyecto(e.target.value)}/>
      <input type="text" placeholder="Vencimiento" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)}/>
      <button onClick={addRow}>Añadir</button>
    </TableContainer>
  );
}

export default DenseTable
