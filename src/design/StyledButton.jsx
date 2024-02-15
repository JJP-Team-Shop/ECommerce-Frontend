import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const StyledButton = ({ children, to, onClick }) => {
  if (to) {
    return (
      <Link to={to}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(18, 18, 18)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            },
          }}
        >
          {children}
        </Button>
      </Link>
    );
  } else {
    return (
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          backgroundColor: "rgba(18, 18, 18)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.16)",
          },
        }}
      >
        {children}
      </Button>
    );
  }
};

export default StyledButton;