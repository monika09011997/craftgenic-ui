import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink, useParams } from 'react-router-dom';

export const OrderSuccessPage = () => {
  const { orderId } = useParams(); // Get orderId from URL

  return (
    <Box textAlign="center" my={10}>
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main' }} />
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Thank You For Your Order!
      </Typography>
      <Typography color="text.secondary">
        Your order has been placed successfully.
      </Typography>
      <Typography color="text.secondary">
        Order ID: <strong>{orderId}</strong>
      </Typography>
      <Button component={RouterLink} to="/myorders" variant="contained" sx={{ mt: 4 }}>
        View My Orders
      </Button>
    </Box>
  );
};