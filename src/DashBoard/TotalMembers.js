import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalMembers() {
  return (
    <React.Fragment>
      <Title>Total Members</Title>
      <Typography component="p" variant="h4">
        2800
      </Typography>
      
    </React.Fragment>
  );
}