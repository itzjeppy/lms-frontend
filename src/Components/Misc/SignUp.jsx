import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LandingBar from './LandingBar';
import { MuiTelInput } from 'mui-tel-input';
import PartnerService from '../Services/PartnerService';
 
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));
 
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));
 
export default function SignUp(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [contactError, setContactError] = React.useState(false);
  const [contactErrorMessage, setContactErrorMessage] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
 
  const validateInputs = () => {
    let isValid = true;
 
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
 
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
 
    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
 
    if (!contactNumber || contactNumber.length < 10) {
      setContactError(true);
      setContactErrorMessage('Please enter a valid contact number.');
      isValid = false;
    } else {
      setContactError(false);
      setContactErrorMessage('');
    }
 
    return isValid;
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const partner = {
      name,
      email,
      password,
      contactNumber,
      countryCode,
    }

    PartnerService.registerPartner(partner)
    .then((response) => {
      console.log("Created offers:", response.data);
      // navigate(-1);
    })
    .catch((error) => {
      console.error("Error creating offers", error);
    })

  };
 
  const handleContactChange = (value, info) => {
    setContactNumber(value);
    setCountryCode(info.countryCallingCode);
  };
 
  return (
    <div position="fixed">
      <LandingBar />
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="img"
            alignSelf="center"
            sx={{
              height: '75%',
              width: '75%',
            }}
            src="/final.png"
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                id="name"
                placeholder="Enter your name"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Enter your email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="contact">Contact Number</FormLabel>
              <MuiTelInput
                value={contactNumber}
                onChange={handleContactChange}
                required
                fullWidth
                error={contactError}
                helperText={contactErrorMessage}
                color={contactError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/signIn" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </div>
  );
}