import {
  Box,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getWeather, getAllCountries } from '../services/api';
const Container = styled(Box)({
  padding: 13,
  borderRadius: '50px',
  display: 'flex',
  width: '70%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center'
});

const Form = ({ setResult, setValid }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const getWeatherInfo = async () => {
      if (selectedCity.trim() !== '') {
        console.log('selectedcity', selectedCity);
        let response = await getWeather(selectedCity, selectedCountry);
        console.log('response', response);
        if (response === -1) setValid(false);
        else {
          setResult(response);
          setValid(true);
        }
      }
    };
    getWeatherInfo();
  }, [selectedCity]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries_ = await getAllCountries();
      const alldata = countries_.data;
      console.log('countries', countries_);
      let allCountries = [];
      for (let i = 0; i < alldata.length; i++) {
        const country = alldata[i].country;
        const citiesData = alldata[i].cities;
        const cities = citiesData.map((city, index) => ({
          id: index,
          city: city
        }));

        allCountries.push({ id: i, country: country, cities: cities });
      }
      console.log('yohg', allCountries);
      setCountries(allCountries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const country = countries.find((c) => c.country === selectedCountry);
    if (country) {
      const cities = country.cities.map((city) => ({
        id: city.id,
        city: city.city
      }));

      console.log('aloo', cities);
      setCities(cities);
    }
    setSelectedCity('');
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  return (
    <Container>
      <FormControl
        variant="outlined"
        style={{ width: '30%' }}
      >
        <InputLabel
          id="country-label"
          style={{
            fontSize: '20px',
            color: 'white'
          }}
        >
          Country
        </InputLabel>
        <Select
          labelId="country-label"
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Country"
          style={{
            fontSize: '20px',
            color: 'white'
          }}
        >
          {countries.map((country) => (
            <MenuItem
              key={country.id}
              value={country.country}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        variant="outlined"
        style={{ width: '30%' }}
      >
        <InputLabel
          id="city-label"
          style={{
            fontSize: '20px',
            color: 'white'
          }}
        >
          City
        </InputLabel>
        <Select
          labelId="city-label"
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          label="City"
          disabled={!selectedCountry}
          style={{
            fontSize: '20px',
            color: 'white'
          }}
        >
          {cities.map((city) => (
            <MenuItem
              key={city.id}
              value={city.city}
            >
              {city.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default Form;
