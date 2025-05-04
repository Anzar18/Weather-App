import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function InfoBox({ info }) {
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1584747050502-de66df1f348c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAIN_URL = "https://images.unsplash.com/photo-1525673617815-988a5db3e1e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const CLEAR_URL = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    // Function to determine which image URL to display based on weather conditions
    const getWeatherImage = () => {
      if (info.humidity > 80) return RAIN_URL;
      if (info.temp < 15) return COLD_URL;
      if (info.temp >= 15 && info.temp <= 30) return CLEAR_URL;
      return HOT_URL; // temp > 30
    };
    
    // Function to determine which weather icon to display
    const getWeatherIcon = () => {
      if (info.humidity > 80) return <ThunderstormIcon fontSize="large" sx={{ color: '#64b5f6' }} />;
      if (info.temp < 15) return <AcUnitIcon fontSize="large" sx={{ color: '#90caf9' }} />;
      if (info.temp >= 15 && info.temp <= 30) return <WbSunnyIcon fontSize="large" sx={{ color: '#ffb74d' }} />;
      return <SunnyIcon fontSize="large" sx={{ color: '#ff9800' }} />; // temp > 30
    };

    // Function to get date
    const getCurrentDate = () => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString(undefined, options);
    };
    
  return (
    <div className="InfoBox">
      <Card sx={{ 
        maxWidth: 450,
        margin: '0 auto',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <CardMedia
          sx={{ height: 200 }}
          image={getWeatherImage()}
          title="Weather condition"
        />
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 1,
                fontWeight: 'bold',
                color: '#1e3c72'
              }}
            >
              {info.city} {getWeatherIcon()}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {getCurrentDate()}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
              {Math.round(info.temp)}°C
            </Typography>
            <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
              {info.weather}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Feels like {Math.round(info.feelsLike)}°C
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(144, 202, 249, 0.2)', 
                p: 1.5, 
                borderRadius: '12px' 
              }}>
                <OpacityIcon sx={{ mr: 1, color: '#1976d2' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Humidity
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {info.humidity}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255, 183, 77, 0.2)', 
                p: 1.5, 
                borderRadius: '12px' 
              }}>
                <ThermostatIcon sx={{ mr: 1, color: '#ed6c02' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Feels Like
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {Math.round(info.feelsLike)}°C
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(129, 199, 132, 0.2)', 
                p: 1.5, 
                borderRadius: '12px' 
              }}>
                <KeyboardArrowUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Max Temp
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {Math.round(info.temp_max)}°C
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(229, 115, 115, 0.2)', 
                p: 1.5, 
                borderRadius: '12px' 
              }}>
                <KeyboardArrowDownIcon sx={{ mr: 1, color: '#d32f2f' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Min Temp
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {Math.round(info.temp_min)}°C
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}