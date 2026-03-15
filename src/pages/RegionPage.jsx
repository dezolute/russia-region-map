import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ImageList,
  ImageListItem,
  Divider,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FactoryIcon from '@mui/icons-material/Factory';
import WorkIcon from '@mui/icons-material/Work';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { getRegionById } from '../data/regionsData';
import RegionMap from '../components/Map/RegionMap';
import PopulationInfo from '../components/Region/PopulationInfo';

const RegionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const region = getRegionById(id);

  if (!region) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Регион не найден</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          На главную
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Назад к карте
      </Button>

      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        {region.name}
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        {region.description}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <RegionMap selectedRegion={region} enableScrollZoom={false} />
      </Box>


      {/* Основная статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Население</Typography>
              <Typography variant="h4" color="primary">
                {(region.population / 1000000).toFixed(2)} млн
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Площадь</Typography>
              <Typography variant="h4" color="primary">
                {region.area} км²
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Основан</Typography>
              <Typography variant="h4" color="primary">
                {region.founded}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Климат</Typography>
              <Typography variant="body1">
                {region.climate.type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Население */}
      <PopulationInfo demographics={region.demographics} />

      {/* Экономика */}
      {region.economy && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon color="primary" />
              Экономика
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AttachMoneyIcon />
                    <Typography variant="h6">ВВП</Typography>
                  </Box>
                  <Typography variant="h4">{region.economy.gdp}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <WorkIcon />
                    <Typography variant="h6">Средняя зарплата</Typography>
                  </Box>
                  <Typography variant="h4">{region.economy.avgSalary}</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FactoryIcon />
                Основные отрасли
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {region.economy.mainIndustries.map((industry, index) => (
                  <Chip key={index} label={industry} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Крупнейшие компании
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {region.economy.majorCompanies.map((company, index) => (
                  <Chip key={index} label={company} color="secondary" />
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Безработица:</strong> {region.economy.unemployment}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Достопримечательности и Климат */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlaceIcon color="primary" />
                Достопримечательности
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {region.attractions.map((attraction, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Chip label={index + 1} color="primary" size="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={attraction.split(' - ')[0]} 
                      secondary={attraction.split(' - ')[1]}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThermostatIcon color="secondary" />
                Климат
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Тип:</strong> {region.climate.type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Средняя температура зимой:</strong> {region.climate.avgTempWinter}°C
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Средняя температура летом:</strong> {region.climate.avgTempSummer}°C
                </Typography>
                <Typography variant="body1">
                  <strong>Осадки:</strong> {region.climate.precipitation} мм/год
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3 }}>
                <LightbulbIcon color="warning" />
                Интересные факты
              </Typography>
              <List>
                {region.facts.map((fact, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`💡 ${fact}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Образование и Транспорт */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolIcon color="primary" />
                Образование
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="h6" gutterBottom color="primary">
                {region.education.studentsCount}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Ведущие университеты:
              </Typography>
              <List>
                {region.education.universities.map((university, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={university} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <strong>Уровень грамотности:</strong> {region.education.literacy}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsBusIcon color="secondary" />
                Транспорт
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {region.transport.metro !== 'Отсутствует' && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    🚇 Метро
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {region.transport.metro}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  ✈️ Аэропорты
                </Typography>
                {region.transport.airports.map((airport, index) => (
                  <Chip key={index} label={airport} size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  🚂 Железнодорожные вокзалы
                </Typography>
                {region.transport.railway.map((station, index) => (
                  <Chip key={index} label={station} size="small" sx={{ mr: 1, mb: 1 }} color="secondary" />
                ))}
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  🚌 Общественный транспорт
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {region.transport.publicTransport}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Культура */}
      {region.culture && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TheaterComedyIcon color="primary" />
              Культура
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    🎭 {region.culture.theaters}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    🖼️ {region.culture.museums}
                  </Typography>
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                  Фестивали и мероприятия:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {region.culture.festivals.map((festival, index) => (
                    <Chip key={index} label={festival} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <RestaurantIcon color="secondary" />
                  <Typography variant="subtitle1">
                    Традиционная кухня:
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {region.culture.cuisine.map((dish, index) => (
                    <Chip key={index} label={dish} color="secondary" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Известные люди */}
      {region.famousPeople && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon color="warning" />
              Известные личности
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {region.famousPeople.map((person, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                    <Typography variant="body1">
                      <strong>{person.split(' - ')[0]}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {person.split(' - ')[1]}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Фотогалерея */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          📸 Фотогалерея
        </Typography>
        <ImageList sx={{ width: '100%', height: 400 }} cols={3} rowHeight={200}>
          {region.images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={`${image}?w=248&fit=crop&auto=format`}
                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`${region.name} ${index + 1}`}
                loading="lazy"
                style={{ objectFit: 'cover', height: '100%' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default RegionPage;