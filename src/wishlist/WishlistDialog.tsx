import { Box, Dialog, DialogTitle, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

// Import actions and selectors
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { selectWishlistItems, toggleWishlistItem } from './WishlistSlice';
import { ProductListItem } from '../home/types';
import { setSelectProduct } from '../common/productSlice';

interface WishlistDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WishlistDialog = ({ open, onClose }: WishlistDialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlistItems = useAppSelector(selectWishlistItems);

  // This function now handles all navigation from the dialog
  const handleNavigateToProduct = (product: ProductListItem) => {
    // 1. Dispatch the product to the Redux store so the overview page knows what to display
    dispatch(setSelectProduct(product));
        dispatch(toggleWishlistItem(product)); // Remove from wishlist
    // 2. Navigate to the product's detail page
    navigate(`/product/${btoa(product.id)}`);
    onClose(); // Close the dialog after navigating
  };

  const handleRemoveFromWishlist = (product: ProductListItem) => {
    dispatch(toggleWishlistItem(product));
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
                  onClick={() => handleNavigateToProduct(item)}
                />
                <Stack flexGrow={1} onClick={() => handleNavigateToProduct(item)} sx={{cursor: 'pointer'}}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs. {item.price.toLocaleString()}
                  </Typography>
                </Stack>
                
                {/* 3. This button now navigates the user to select options */}
                <IconButton title="Select Options to Add" onClick={() => handleNavigateToProduct(item)}>
                  <AddShoppingCartIcon />
                </IconButton>
                <IconButton title="Remove from Wishlist" onClick={() => handleRemoveFromWishlist(item)}>
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