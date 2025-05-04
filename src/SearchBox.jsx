import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_URL= "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                temp_min: jsonResponse.main.temp_min,
                temp_max: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        } catch (err) {
            console.log("Error: " + err);
            throw err;
        }
    }

    let handleChange = (event) => {
        setCity(event.target.value);
        // Reset error when user starts typing again
        if (error) {
            setError(false);
        }
    };

    let handleSubmit = async(event) => {
        try{
            event.preventDefault();
            console.log("City name is: " + city);
            // Reset error state at the beginning of new submission
            setError(false);
            
            // Set loading state to true
            setLoading(true);
            
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            console.log("Error: " + err);
            setError(true);
        } finally {
            // Set loading state to false regardless of outcome
            setLoading(false);
        }
    };

    return (
        <div className='SearchBox'>
    <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            borderRadius: '30px',
            padding: '5px 15px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
    >
        <TextField 
            id="city" 
            label="Search for a city" 
            variant="standard"
            fullWidth
            required 
            value={city}
            onChange={handleChange}
            error={error}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                )
            }}
            sx={{
                '& .MuiInputBase-root': {
                    height: '50px',
                }
            }}
        />
        <Box sx={{ ml: 1 }}>
            <Button 
                variant="contained" 
                type='submit'
                disabled={loading}
                sx={{
                    borderRadius: '24px',
                    minWidth: '100px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    textTransform: 'none',
                    fontWeight: 'bold'
                }}
            >
                {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
        </Box>
    </Paper>

    {/* Error message below the search bar */}
    {error && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <span style={{ color: '#d32f2f', fontWeight: '500' }}>
                ❌ Place not found. Please try again!
            </span>
        </Box>
    )}
</div>

    );
}