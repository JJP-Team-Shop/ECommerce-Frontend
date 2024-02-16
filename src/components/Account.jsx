import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation, useDeleteUserMutation, useGetUserQuery } from '../api/shopApi';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const Account = () => {
  const { token, user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const { data, error, isLoading } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const response = await updateUser(updatedUserData);
      if (response.data) {
        setUserData(response.data)
        console.log("User updated successfully:", response.data);
      } else {
        console.error("User update failed:", response.error);
      }
    } catch (error) {
      console.error("User update failed:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();
      if (response.data) {
        setUserData();
        console.log("User deleted successfully");
      } else {
        console.error("User deletion failed:", response.error);
      }
    } catch (error) {
      console.error("User deletion failed:", error);
    }
  };

  return (
    <Accordion>
      {/* Section for updating/deleting user information */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="update-delete-content" id="update-delete-header">
        Update/Delete User
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {userData ? (
            <div>
              <UpdateUserInfoForm userData={userData} onUpdate={handleUpdateUser} />
              <Button onClick={handleDeleteUser} variant="contained" color="error">Delete Account</Button>
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </div>
      </AccordionDetails>
      
      {/* Section for displaying cart history */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="cart-history-content" id="cart-history-header">
        Cart History
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {userData && userData.cartHistory.length > 0 ? (
            <ul>
              {userData.cartHistory.map((cart) => (
                <li key={cart.id}>
                  Cart ID: {cart.id}, Date: {cart.date}, Total: ${cart.total}
                </li>
              ))}
            </ul>
          ) : (
            <p>No cart history found.</p>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default Account;
