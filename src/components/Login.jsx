import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLoginUserMutation } from "../api/shopApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Account from "./Account";
import StyledButton from "../design/StyledButton";
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function Login() {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [authToken, setAuthToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);
      const token = response.data.token;
      handleLoginSuccess(token);
      console.log(token)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loginStatus", isLoggedIn);
      navigate("/");
    } else {
      localStorage.setItem("loginStatus", isLoggedIn);
    }
  }, [isLoggedIn]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {isLoggedIn && localStorage.getItem("authToken")}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to="users/register">
                <StyledButton>Sign Up Here!</StyledButton>
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
