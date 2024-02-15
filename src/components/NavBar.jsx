import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JJP Store
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/Register">
          Register
        </Button>
        {token && (
          <Button color="inherit" component={Link} to="/Account">
          Account
        </Button>
        )}
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;