import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom'; // Corrected import for Link
import Logo from '../../Icons/Logo';

const LandingBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#634E94",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
          height: "64px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
          />
          <IconButton component={Link} to="/" aria-label="home"> {/* Corrected usage of Link */}
            <Logo />
          </IconButton>
          <Box flexGrow={1} />
          <Stack spacing={2} direction="row">
            <Button  
              variant="contained"  
              onClick={() => navigate('/signIn')}
            >
              LOGIN
            </Button>
            <Button  
              variant="outlined"  
              color="inherit"  
              onClick={() => navigate('/signUp')}
            >
              REGISTER
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LandingBar;
