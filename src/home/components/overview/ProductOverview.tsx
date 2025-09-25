import { Box, Button, Grid, Paper, Stack, Typography, Rating, Chip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useCallback, useMemo, useState } from 'react';
import { OptionButton } from "../../../common/components/buttons/OptionButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addItem } from "../../../cart/slice";
import { ScrollableThumbnails } from "../../../common/components/ScrollableThumbnails";
import { useCartAnimation } from "../../../home/hooks";
import { selectIsinWishlist, toggleWishlistItem } from "../../../wishlist/WishlistSlice";
import { useNavigate } from "react-router-dom";

export const ProductOverview = () => {
  // All your existing state and handlers remain the same
  const selectedProduct = useAppSelector(state => state.product.selectedProduct);
  const [selectedImage, setSelectedImage] = useState(selectedProduct?.imageUrl || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.availableSizes ? selectedProduct.availableSizes[0] : '');
  const [selectedFrame, setSelectedFrame] = useState('No Frame');
  const frameOptions = ['No Frame', 'Gallery Wrap', 'Black', 'White', 'Natural Wood'];
  const dispatch = useAppDispatch();
  const { triggerAnimation } = useCartAnimation();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.items);
  
  const isItemInCart = useMemo(() => {
    if (!selectedProduct) return false;
    return cartItems.some(item => 
      item.id === selectedProduct.id &&
      item.selectedSize === selectedSize &&
      item.selectedFrame === selectedFrame
    );
  }, [cartItems, selectedProduct, selectedSize, selectedFrame]);

  const isInWishlist = useAppSelector(selectIsinWishlist(selectedProduct?.id || ''));

  const handleToggleWishlist = () => { if (selectedProduct) dispatch(toggleWishlistItem(selectedProduct)); };
  
  const handleAddToCart = useCallback(() => {
    if (!selectedProduct) return;
    const itemToAdd = { ...selectedProduct, selectedSize, selectedFrame };
    dispatch(addItem(itemToAdd));
    triggerAnimation('add-to-cart-button');
  }, [dispatch, selectedFrame, selectedProduct, selectedSize, triggerAnimation]);

  const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

  const handleGoToCart = () => navigate('/shoppingCart');

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, backgroundColor: '#fff' }}>
      {/* This is the container that controls the layout */}
      <Grid container spacing={{ xs: 3, md: 6 }}>
        
        {/* === Image Column === */}
        {/* It takes full-width on mobile (xs=12) and 5/12 width on desktop (md=5) */}
        <Grid width={'400px'} spacing={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={selectedImage}
                alt={selectedProduct?.name}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px' }}
              />
            </Paper>
            {selectedProduct?.imageGallery && selectedProduct.imageGallery.length > 1 && (
              <ScrollableThumbnails
                imageGallery={selectedProduct.imageGallery}
                selectedImage={selectedImage}
                onThumbnailClick={handleImageSelect}
                canClick={true}
              />
            )}
          </Stack>
        </Grid>

        {/* === Details Column === */}
        {/* It takes full-width on mobile (xs=12) and 7/12 width on desktop (md=7) */}
        <Grid width={'700px'} spacing={{ xs: 12, md: 7 }}>
          <Stack spacing={2.5}>
            {/* ... All your product details ... */}
            <Box>
              <Chip label="10% OFF" size="small" sx={{ mb: 1, color: 'white', bgcolor: 'black' }} />
              <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
                {selectedProduct?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">Type: {selectedProduct?.category}</Typography>
            </Box>
            {selectedProduct?.price && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5" color="black" fontWeight={700} sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                    Rs. {selectedProduct?.price.toLocaleString()}
                </Typography>
                <Typography variant="h6" color="text.disabled" sx={{ textDecoration: 'line-through', fontSize: { xs: '1.0rem', md: '1.25rem' } }}>
                    {(selectedProduct?.price * 1.4).toLocaleString()}
                </Typography>
              </Stack>
            )}
            <Box>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>Size (In Inches): {selectedSize}</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {selectedProduct?.availableSizes?.map(size => (
                  <OptionButton key={size} label={size} selected={selectedSize === size} onClick={() => setSelectedSize(size)} />
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>Floating Frame: {selectedFrame}</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {frameOptions.map(frame => (
                  <OptionButton key={frame} label={frame} selected={selectedFrame === frame} onClick={() => setSelectedFrame(frame)} />
                ))}
              </Stack>
            </Box>
            <Typography variant="subtitle1">By <strong>{selectedProduct?.artist}</strong></Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {selectedProduct?.rating && <Rating name="read-only" value={selectedProduct?.rating} precision={0.5} readOnly />}
              <Typography variant="body2" color="text.secondary">(Based on 1,500+ reviews)</Typography>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9'}}>
              <Typography variant="body2" color="text.secondary" flexWrap="wrap">
                {selectedProduct?.description}
              </Typography>
            </Paper>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
            <Button variant="outlined" startIcon={isInWishlist ? <Favorite /> : <FavoriteBorder />} onClick={handleToggleWishlist} sx={{ width: '100%', py: 1.5, borderColor: '#000', color: '#000' }}>
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
            {isItemInCart ? (
              <Button variant="outlined" startIcon={<ShoppingCartCheckoutIcon />} onClick={handleGoToCart} sx={{ width: '100%', py: 1.5, borderColor: '#000', color: '#000' }}>
                Go to Cart
              </Button>
            ) : (
              <Button id="add-to-cart-button" variant="contained" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart} sx={{ width: '100%', py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}>
                Add to Cart
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};