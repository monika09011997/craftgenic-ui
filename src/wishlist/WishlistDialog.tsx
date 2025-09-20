import { Box, Dialog, DialogTitle, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

// Import actions and selectors
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { selectWishlistItems, toggleWishlistItem } from './WishlistSlice';
import { ProductListItem } from '../home/types';
import { addItem } from '../cart/slice';

interface WishlistDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WishlistDialog = ({ open, onClose }: WishlistDialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleMoveToCart = (product: ProductListItem) => {
    dispatch(addItem(product)); // Add to cart
    dispatch(toggleWishlistItem(product)); // Remove from wishlist
  };

  const handleNavigate = (product: ProductListItem) => {
    // You might need to dispatch setSelectProduct here if your overview page depends on it
    navigate(`/product/${btoa(product.id)}`);
    onClose(); // Close the dialog after navigating
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={700}>Your Wishlist</DialogTitle>
      <DialogContent dividers>
        {wishlistItems.length > 0 ? (
          <Stack spacing={2}>
            {wishlistItems.map(item => (
              <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.name}
                  sx={{ width: 80, height: 80, borderRadius: 1, cursor: 'pointer' }}
                  onClick={() => handleNavigate(item)}
                />
                <Stack flexGrow={1} onClick={() => handleNavigate(item)} sx={{cursor: 'pointer'}}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs. {item.price.toLocaleString()}
                  </Typography>
                </Stack>
                <IconButton title="Move to Cart" onClick={() => handleMoveToCart(item)}>
                  <AddShoppingCartIcon />
                </IconButton>
                <IconButton title="Remove from Wishlist" onClick={() => dispatch(toggleWishlistItem(item))}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Typography textAlign="center" sx={{ py: 4 }}>
            Your wishlist is empty.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};