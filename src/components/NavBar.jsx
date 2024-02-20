import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUser } from '../slice/userSlice';
const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token from localStorage and from the Redux store
    localStorage.removeItem('authToken');
    dispatch(LogoutUser());
  };

  return (
    <AppBar   position="static" sx={{ width: '80vw', margin: '0 auto', backgroundColor: "black"}}>
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
        <Button color="inherit" component={Link} to="/Cart">
          Cart
        </Button>
        
          <Button color="inherit" component={Link} to="/Account">
          Account
        </Button>

        <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
        
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;