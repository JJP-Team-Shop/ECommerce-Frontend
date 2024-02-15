/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const StyledCard = ({ children, image, title }) => {
  return (
    <Card
      className="product-card"
      variant="outlined"
      sx={{ minWidth: 250, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
    >
      <CardContent>
        <img className="product-img" src={image} alt={title} />
        <h1>{title}</h1>
        {children}
      </CardContent>
    </Card>
  );
};

export default StyledCard;
