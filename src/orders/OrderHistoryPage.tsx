import { Box, Typography, Paper, Stack, Divider, Button, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useFetchOrders } from './hooks';

// A small component for the loading state
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress />
  </Box>
);

// A component for the empty state
const EmptyOrders = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ height: '50vh', textAlign: 'center' }}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      You haven't placed any orders yet.
    </Typography>
    <Button 
      component={RouterLink} 
      to="/" 
      variant="contained" 
      size="large" 
      sx={{ backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
    >
      Start Shopping
    </Button>
  </Stack>
);


export const OrderHistoryPage = () => {
  const { orderList, orderLoadingStatus } = useFetchOrders();

  // 1. Show a loading spinner while fetching
  if (orderLoadingStatus) {
    return <LoadingSpinner />;
  }

  // 2. Show an "empty orders" message if the list is empty
  if (!orderList || orderList.length === 0) {
    return <EmptyOrders />;
  }

  // 3. Show the order list if orders exist
  return (
    <Box sx={{ p: 4, maxWidth: '100%' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Orders
      </Typography>
      <Stack spacing={3}>
        {orderList.map(order => (
          <Paper key={order.orderId} elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography fontWeight={600}>Order ID: {order.orderId}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Total: Rs. {order.totalAmount.toLocaleString()}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};