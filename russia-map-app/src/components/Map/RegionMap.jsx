import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { regionsData } from '../../data/regionsData';

// Фикс иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

const RegionMap = ({ selectedRegion = null, enableScrollZoom = true }) => {
  const navigate = useNavigate();
  
  const defaultCenter = [61.5240, 105.3188]; // Центр России
  const defaultZoom = 4;
  
  const mapCenter = selectedRegion 
    ? selectedRegion.coordinates 
    : defaultCenter;
  const mapZoom = selectedRegion ? 10 : defaultZoom;

  return (
    <Box sx={{ height: '600px', width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={enableScrollZoom}  // Управляется через проп
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regionsData.map((region) => (
          <Marker
            key={region.id}
            position={region.coordinates}
            eventHandlers={{
              click: () => {
                navigate(`/region/${region.id}`);
              },
            }}
          >
            <Popup>
              <Box sx={{ p: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {region.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {region.description}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/region/${region.id}`)}
                >
                  Подробнее
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default RegionMap;
