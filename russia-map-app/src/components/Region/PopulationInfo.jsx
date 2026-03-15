import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  LinearProgress,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';

const PopulationInfo = ({ demographics }) => {
  if (!demographics) return null;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon color="primary" />
          Население и народы
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Общая численность: {demographics.totalPopulation}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Плотность: {demographics.density} чел/км²
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PublicIcon fontSize="small" />
            Национальный состав
          </Typography>
          {demographics.nationalities.map((nationality, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{nationality.name}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {nationality.percent}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={nationality.percent}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: index === 0 ? 'primary.main' : 'secondary.main',
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" />
                Языки
              </Typography>
              <Typography variant="body2">
                {demographics.languages}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2, color: 'white' }}>
              <Typography variant="subtitle2" gutterBottom>
                Религии
              </Typography>
              <Typography variant="body2">
                {demographics.religions}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            💡 Данные основаны на последней переписи населения Российской Федерации
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PopulationInfo;
