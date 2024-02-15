import { useState, useEffect } from "react";
import { useRegisterUserMutation } from "../api/shopApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegistrationForm = () => {
  const [newUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    isAdmin: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const newAccount = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!account.email || !account.password) {
      setMessage("Email and password are required.");
      return;
    }

    setLoading(true);
    const result = await newUser(account);
    setLoading(false);

    if (result.error) {
      setMessage(result.error.data.message);
      return;
    }

    navigate("/account");
  };

  useEffect(() => {
    if (token) navigate("/account");
  }, [token, navigate]);

  return (
    <div className>
      <form onSubmit={newAccount}>
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="address"
            placeholder="address"
            name="address"
            onChange={onChange}
            required
          />
        </div>
        <p>{message}</p>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div>
          <p>
            Have an account?{" "}
            <Link to="/login">
            Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;