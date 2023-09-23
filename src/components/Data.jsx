import { Box, Typography, styled } from '@mui/material';
import {
  LocationOn,
  Opacity,
  Brightness5,
  Brightness6,
  Storm,
  ThermostatAuto
} from '@mui/icons-material';
const Row = styled(Typography)({
  padding: 10,
  fontSize: 25,
  color: 'white',
  letterSpacing: 2,
  '&>svg': {
    marginRight: 10
  }
});
const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});
const Data = ({ result, Description }) => {
  console.log('result', result);
  console.log(Object.keys(result).length);
  if (result && Object.keys(result).length > 0)
    Description(result.weather[0].main);

  return result && Object.keys(result).length > 0 ? (
    <Container>
      <Box style={{ margin: '30px 60px' }}>
        <Row>
          <LocationOn /> {result.name},{result.sys.country}
        </Row>
        <Row style={{ fontSize: '50px' }}>{Math.round(result.main.temp)}℃</Row>
        <Row style={{ fontSize: '30px'}}>
          {' '}
          {result.weather[0].main}
        </Row>

        <Box style={{ display: 'flex' }}>
          <Row>
            <Brightness5 />
            Sun Rise:{new Date(result.sys.sunrise * 1000).toLocaleTimeString()}
          </Row>
          <Row>
            <Brightness6 />
            Sun Set:{new Date(result.sys.sunset * 1000).toLocaleTimeString()}
          </Row>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor:'rgb(0,0,0,0.4)', borderRadius:'20px'}}>
          <Row>
            <ThermostatAuto />
            Feels like:{Math.round(result.main.feels_like)}℃
          </Row>
          <Row>
            <Opacity />
            Humidity:{result.main.humidity}%
          </Row>
          <Row>
            <Storm />
            Wind speed:{Math.round(result.wind.speed * 3.6)}km/hr
          </Row>
        </Box>
      </Box>
    </Container>
  ) : null;
};

export default Data;
