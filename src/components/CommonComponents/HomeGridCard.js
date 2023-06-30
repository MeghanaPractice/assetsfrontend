import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function HomeGridCard({ link, name, height }){
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <Grid item md={6}>
      <Card onClick={handleCardClick} sx={{ backgroundColor: 'teal', height: height||'180%' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'white' }}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
