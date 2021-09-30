import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TicketInspection() {
  return (
    <React.Fragment>
      <Title>Number of Inspections</Title>
      <Typography component="p" variant="h4">
        56
      </Typography>
      
    </React.Fragment>
  );
}