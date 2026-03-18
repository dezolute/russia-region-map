import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegionMap from '../components/Map/RegionMap';
import { regionsData } from '../data/regionsData';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          🗺️ Интерактивная карта России
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Исследуйте регионы России: культура, достопримечательности и население
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
          <Chip label="15 регионов" color="primary" />
          <Chip label="Интерактивная карта" color="secondary" />
          <Chip label="Статистика населения" />
          <Chip label="Достопримечательности" />
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <RegionMap enableScrollZoom={false} />
      </Box>


      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <LocationCityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Регионы России
      </Typography>

      <Grid container spacing={3}>
        {regionsData.map((region) => (
          <Grid item xs={12} sm={6} md={4} key={region.id}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardActionArea onClick={() => navigate(`/region/${region.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={region.images[0]}
                  alt={region.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {region.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {region.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`${(region.population / 1000000).toFixed(1)} млн`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={`Основан: ${region.founded}`} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
