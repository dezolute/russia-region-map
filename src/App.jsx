import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { theme } from './theme/theme';
import HomePage from './pages/HomePage';
import RegionPage from './pages/RegionPage';
import MapIcon from '@mui/icons-material/Map';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <MapIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Карта России
              </Typography>
            </Toolbar>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/region/:id" element={<RegionPage />} />
            </Routes>
          </Box>

          <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'primary.main', color: 'white' }}>
            <Container maxWidth="xl">
              <Typography variant="body2" align="center">
                © 2026 Интерактивная карта России. Все права защищены.
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
