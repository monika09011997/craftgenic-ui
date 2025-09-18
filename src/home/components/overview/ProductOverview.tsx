import { Box, Button, Grid, Paper, Stack, Typography, Rating, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useCallback, useState } from 'react';
import { OptionButton } from "../../../common/components/buttons/OptionButton";
import { Favorite } from "@mui/icons-material";
import { addItem } from "../../../cart/slice";
import { ScrollableThumbnails } from "../../../common/components/ScrollableThumbnails";

export const ProductOverview = () => {
  // Get the 'id' from the URL, e.g., /product/123
  const { id } = useParams();
  const selectedProduct = useAppSelector(state => state.product.selectedProduct);
  const [selectedImage, setSelectedImage] = useState(selectedProduct?.imageUrl || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.availableSizes ? selectedProduct.availableSizes[0] : '');
  const [selectedFrame, setSelectedFrame] = useState('No Frame');

  const frameOptions = ['No Frame', 'Gallery Wrap',
    'Black', 'White', 'Natural Wood'];

    const dispatch = useAppDispatch();


  const handleAddToCart = useCallback(() => {
    if (!selectedProduct) return; // Guard clause

      const itemToAdd = {
    ...selectedProduct, // Copy all original product properties
    selectedSize: selectedSize,   // Add the selected size from state
    selectedFrame: selectedFrame, // Add the selected frame from state
    // Generate a unique ID for the cart item if size/frame change it
      }
    
    // Implement your add to cart logic here
      dispatch(addItem(itemToAdd));

  }, [selectedProduct]); // The dependency is the product from the state

  const handleWishlist = useCallback(() => {
    if (!selectedProduct) return; // Guard clause
    
    // Implement your add to wishlist logic here
    alert(`Added ${selectedProduct.name} to wishlist!`);
  }, [selectedProduct]); // The dependency is the product from the state

   // This is the specific logic that the parent component wants to run
  const handleImageSelect = (imageUrl: string) => {
    console.log(`Thumbnail clicked: ${imageUrl}`);
    setSelectedImage(imageUrl);
  };


  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#fff' }}>
      <Grid container spacing={6}>
        {/* 1. Thumbnail Column */}
        <Grid width={'40%'} sx={{ xs: 12, sm: 2 }}>
          <Stack spacing={2}>
            {/* Main Image */}
            <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', height: 'auto' }}>
              <img
                src={selectedImage}
                alt={selectedProduct?.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px', // Slightly rounded corners for the main image
                }}
              />
            </Paper>

            {/* Horizontal Scrollable Thumbnails */}
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

        {/* 3. Details Column */}
        <Grid width={'50%'} sx={{ xs: 12, sm: 6 }}>
          <Stack spacing={2.5}>
            <Box>
              <Chip label="10% OFF" size="small" sx={{ mb: 1, color: 'white', bgcolor: 'black'}}/>
              <Typography variant="h4" fontWeight={600}>{selectedProduct?.name}</Typography>
              <Typography variant="body1" color="text.secondary">Type: {selectedProduct?.category}</Typography>
            </Box>

            { selectedProduct?.price &&
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5" color="black" fontWeight={700}>Rs. {selectedProduct?.price.toLocaleString()}</Typography>
              <Typography variant="h6" color="text.disabled" sx={{ textDecoration: 'line-through' }}>{(selectedProduct?.price * 1.4).toLocaleString()}</Typography>
            </Stack>
    }

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
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9', width: '600px' }}>
               <Typography variant="body2" color="text.secondary" flexWrap="wrap">
                {selectedProduct?.description}
               </Typography>
            </Paper>
          </Stack>
          <Stack direction="row" spacing={2} mt={3}>
             <Button variant="outlined"  startIcon={<Favorite />}  onClick={() => alert('Buy now clicked!')} sx={{ width: '30%', py: 1.5, borderColor: '#000', color: '#000', '&:hover': { backgroundColor: '#f0f0f0', borderColor: '#333'} }}>
              WishList
            </Button> 
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart} sx={{ width: '70%', py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}>
              Add to Cart
            </Button>           
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
;