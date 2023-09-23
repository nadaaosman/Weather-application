import { Box, styled, Alert } from '@mui/material';
//import Cover from '../assests/images/Clear.jpg';
import Form from '../components/Form';
import Data from '../components/Data';
import { useState } from 'react';

const Component = styled(Box)({
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  margin: '0 auto',
  width: '100%',
  position: 'relative',
  top: '0',
  left: '0'
});
const BackgroundContainer = styled(Box)(({ description }) => ({
  background: `url(${process.env.PUBLIC_URL}/assests/images/${description}.jpg)`, // Set the background image properties
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0)' // Adjust the alpha value (0.3) for transparency
}));

const Info = styled(Box)({
  width: '65%',
  height: '60%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const Home = () => {
  const [result, setResult] = useState({});
  const [description, setDescription] = useState('sunset');
  const [valid, setValid] = useState(true);
  return (
    <BackgroundContainer description={description}>
      <Component>
        <Info>
          <Form
            setResult={setResult}
            setValid={setValid}
          />
          {valid ? (
            <Data
              result={result}
              Description={setDescription}
            />
          ) : (
            <Alert severity="warning" style={{marginTop:'43%'}}>
              Sorry this city has no information!
            </Alert>
          )}
        </Info>
      </Component>
    </BackgroundContainer>
  );
};

export default Home;
