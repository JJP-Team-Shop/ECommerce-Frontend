import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } from "../api/shopApi";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setUserInfo } from "../slice/userSlice";
import { TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
const Account = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    id: 123, // Replace with the ID of the user to update
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    isAdmin: false,
  });
  
  const [deleteUserMutation] = useDeleteUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  
  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);
  const fetchUserData = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch user data. Status:", response.status);
        const responseBody = await response.text();
        console.error("Response body:", responseBody);
        return;
      }
      const userData = await response.json();
      console.log("User data:", userData);
      dispatch && dispatch(setUserInfo(userData));
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [dispatch, getToken]);
  const { data, error, isLoading } = useGetUserQuery(userid, {
    queryFn: fetchUserData,
  });
  useEffect(() => {
    if (getToken()) {
      fetchUserData();
    }
  }, [fetchUserData, getToken, userid]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  if (!data) {
    return <h1>No data available</h1>;
  }

  const HandleUpdateUser = async () => {
    try {
      const response = await updateUserMutation(userid, formData);
      if (response.data) {
        setUserData(response.data);
        console.log("User updated successfully:", response.data);
      } else {
        console.error("User update failed:", response.error);
      }
    } catch (error) {
      if (error.status === 404) {
        console.error("User not found. Please check the user ID.");
      } else {
        console.error("User update failed:", error);
      }
    }
  };
  
//try passing in id the route for delete on backend is undefined insted of the user id!!!!!!!!!
  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUserMutation(userId);
      if (response.data) {
        setUserData(null); // Reset userData state after deletion
        console.log("User deleted successfully");
      } else {
        console.error("User deletion failed:", response.error);
      }
    } catch (error) {
      console.error("User deletion failed:", error);
    }
  };
  const handleChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };
  return (
    <>
      <Accordion>
        {/* Section for updating/deleting user information */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="update-delete-content" id="update-delete-header">
          Update/Delete User
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <form onSubmit={(e) => { e.preventDefault(); HandleUpdateUser(); }}>
              <TextField
                required
                label="First Name"
                value={userData?.firstName || ''}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              <TextField
                required
                label="Last Name"
                value={userData?.lastName || ''}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              <TextField
                required
                label="Email"
                value={userData?.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <TextField
                required
                label="Password"
                value={userData?.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <TextField
                required
                label="Address"
                value={userData?.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              {/* Other form fields for updating user information */}
              <Button onClick={() => HandleUpdateUser(userData.id)} type="submit" variant="contained">Update</Button>
            </form>
            <Button onClick={() => handleDeleteUser(userData.id)} variant="contained" color="error">Delete Account</Button>
          </div>
        </AccordionDetails>
        {/* Section for displaying cart history */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="cart-history-content" id="cart-history-header">
          Cart History
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {/* Render cart history content */}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default Account;