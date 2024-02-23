import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../api/shopApi";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;

  const { data: userData } = useGetUserQuery(userId);
  // const user = useSelector((state) => state.user);
  // console.log(data);
  const isAdmin = userData && userData.isAdmin;
  console.log(userData);
  console.log(token);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(LogoutUser());
    navigate("/");
  };
  const handleCartClick = () => {
    navigate("/Cart");
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{ width: "80vw", margin: "0 auto", backgroundColor: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JJP Store
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {token ? (
          <>
            <Button color="inherit" onClick={handleCartClick}>
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/Account">
              Account
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>

            {isAdmin && (
              <Button color="inherit" component={Link} to="/AdminDashboard">
                Admin Dashboard
              </Button>
            )}
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/Login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/Register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
