import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalFare() {
  return (
    <React.Fragment>
      <Title>Total Fare</Title>
      <Typography component="p" variant="h4">
        LKR 48000
      </Typography>
    </React.Fragment>
  );
}