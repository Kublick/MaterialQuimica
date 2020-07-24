import React from 'react';
import { Typography } from '@material-ui/core';
import Layout from './Layout';

const Landing = () => {
  return (
    <Layout>
      <div>
        <Typography variant="h4" style={{ margin: '12px 140px' }}>
          Seleccione una opción
        </Typography>
      </div>
    </Layout>
  );
};

export default Landing;
