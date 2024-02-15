import { useLoginUserMutation } from "../api/shopApi";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [login, {isLoading, isError}] = useLoginUserMutation();

  const formChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
    const result = await login(form);
    if (result.error) {
      setMessage(result.error.data.message);
    } else {
      setMessage("");
      navigate("/account");
      }
    } catch (error) {
      console.error('An unexpected error occured:', error);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}

      <form onSubmit={loginForm} className="form">
          <h1>Log into JJP Store</h1>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={formChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={formChange}
            />
          </div>
        <button type="submit">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {isError && <p className="text-danger">{message}</p>}
        <p>
          No account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;