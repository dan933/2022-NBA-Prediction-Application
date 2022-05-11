import * as React from 'react';
import Container from '@mui/material/Container';

import PredictionPageContentLoader from './PredictionPageContentLoader';


function PredictionPage() {
    return (
        <Container maxWidth={false} sx={{ mt:4, mb: 4, "minHeight": '600px' }}>
          {/* Chart */}
         <PredictionPageContentLoader></PredictionPageContentLoader>
        </Container>
      );
    }
    
  export default PredictionPage;
  