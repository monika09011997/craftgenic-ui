import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography, createTheme, ThemeProvider } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../hooks';

// Import actions and selectors from the slice
import { incrementQuantity, decrementQuantity, removeItem, selectCartTotal, selectCartItems } from "./slice";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { selectCurrentUser } from "../common/userSlice";
import { OrderPayload } from "../orders/types";
import { useCreateOrders } from "../orders/hooks";

// View for when the cart has items
export const CartWithItems = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const cartTotal = useAppSelector(selectCartTotal);
  const user = useAppSelector(selectCurrentUser);

  const { checkout } = useCreateOrders();

  const handleCheckout = async () => {
  if (!user) {
    alert('Please log in to check out.');
    navigate('/login');
    return;
  }
  const orderPayload: OrderPayload = {
    items: cartItems,
    totalAmount: cartTotal,
    userId: user.identifier,
  }
console.log(orderPayload)
  checkout(orderPayload);

}

  return (
    <Box sx={{ p: 4, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Your cart</Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack  spacing={3}>
        {cartItems.map(item => (
          <Grid container key={item.id} alignItems="center" spacing={2}>
            <Grid width={'30%'}  sx={{ xs: 2, sm: 1 }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '30%', borderRadius: '8px' }} />
            </Grid>
            <Grid width={'30%'} sx={{ xs: 10, sm: 5 }}>
              <Typography fontWeight={600}>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">Rs. {item.price.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary">Type: {item.category}</Typography>
              <Typography variant="body2" color="text.secondary">Size: {item.selectedSize}</Typography>
              <Typography variant="body2" color="text.secondary">Frame: {item.selectedFrame}</Typography>
              {/* You can add size/frame details here if they are part of the CartItem type */}
            </Grid>
            <Grid width={'25%'} sx={{ xs: 6, sm: 3 }}>
              <Stack direction="row" alignItems="center" sx={{ border: '1px solid grey', borderRadius: '4px', display: 'inline-flex' }}>
                <IconButton size="small" onClick={() => dispatch(decrementQuantity(item.id))}><RemoveIcon /></IconButton>
                <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => dispatch(incrementQuantity(item.id))}><AddIcon /></IconButton>
              </Stack>
              <IconButton sx={{ ml: 1 }} onClick={() => dispatch(removeItem(item.id))}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
            <Grid sx={{ textAlign: 'right', xs: 6, sm: 3 }}>
              <Typography fontWeight={600}>Rs. {(item.price * item.quantity).toLocaleString()}</Typography>
            </Grid>
          </Grid>
        ))}
      </Stack>
      
      <Divider sx={{ my: 4 }} />

      <Stack alignItems="flex-end" spacing={2}>
        <Typography variant="h6">Estimated total: <span style={{ fontWeight: 700 }}>Rs. {cartTotal.toLocaleString()}</span></Typography>
        <Button onClick={handleCheckout} variant="contained" size="large" sx={{ width: '20%', py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' }}}>
          Check out
        </Button>
      </Stack>
    </Box>
  );
};

// View for when the cart is empty
const EmptyCart = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ height: '40vh' }}>
    <Typography variant="h4" sx={{ mb: 2 }}>Your cart is empty</Typography>
    <Button component={RouterLink} to="/" variant="contained" size="large" sx={{ width: '20%', py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}>
      Continue shopping
    </Button>
  </Stack>
);

// Main component that decides which view to show
export const ShoppingCart = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
      <Paper sx={{ minHeight: 'auto' }} elevation={0} square>
        {cartItems.length > 0 ? <CartWithItems /> : <EmptyCart />}
      </Paper>
  );
};