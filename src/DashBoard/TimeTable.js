import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '172',
    ' Kottawa',
    'Pitakotuwa',
    '07.10 AM',
    '08.10 AM',
  ),
  createData(
    1,
    '192',
    'Kottawa',
    'Malabe',
    '06.00 AM',
    '07.00 AM',
  ),
  createData(2, '16', 'Maharagama', 'Pitakotuwa', '12.30 PM', '01.30 PM'),
  createData(
    3,
    '172',
    'Kaduwela',
    'Pitakotuwa',
    '02.30 PM',
    '03.30 PM',
  ),
  createData(
    4,
    '192',
    'Malabe',
    'Maharagama',
    '08.20 AM',
    '09.30 AM',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Time Table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Route No</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Deparcher Time</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}