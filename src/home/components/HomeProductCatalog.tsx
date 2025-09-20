import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ProductListItem } from "../types";
import { useFetchProductList } from "../hooks";
import { useMemo } from "react";
import { selectSelectedNavItem, setSelectProduct } from '../../common/productSlice';
import { useNavigate } from "react-router-dom";


export const HomeProductCatalog = () => {

  const { productList, isProductListLoading } = useFetchProductList();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const selectedNavItem = useAppSelector(selectSelectedNavItem);

  const productListMemo = useMemo(() => {
    // If the list is still loading or doesn't exist, return an empty array immediately
    if (!productList) {
      return [];
    }

    // Now we know productList is an array, we can filter it
    if (selectedNavItem === 'HOME') {
      return productList;
    }

    if (selectedNavItem === 'ABSTRACT ART') {
      return productList.filter(product => product.category === 'Abstract Art');
    }

    if (selectedNavItem === 'TEXTURED ART') {
      return productList.filter(product => product.category === 'Textured Art');
    }

    // As a fallback, return the full list or an empty array
    return productList;
  }, [productList, selectedNavItem]);

  // FIX: Check the loading status from your fetch hook, not the memoized list
  if (isProductListLoading) {
    return <Typography>Loading products...</Typography>;
  }

  const handleProductClick = (product: ProductListItem) => {
    dispatch(setSelectProduct(product));

    // 1. Encode the product ID
    const encodedId = btoa(product.id);


    // 2. Navigate to the product overview page
    navigate(`/product/${encodedId}`);
  };

  if (isProductListLoading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3} justifyContent="center"> {/* Reduced spacing */}
          {productListMemo.map((product, index) => (
            // Add 'item' prop and a unique 'key' to the Grid item
            <Grid key={product.id || index}>
              {/* Wrap the entire card with a Link component */}
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  height: 280,
                  width: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 2,
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleProductClick(product)} // Add onClick handler here
              >
                {/* ... rest of your Paper content remains the same ... */}
                {/* The content inside Paper is unchanged */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 140 }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain" }}
                  />
                </Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {product.rating}
                  </Typography>
                  <Typography variant="caption" color="success.main">★</Typography>
                  <Typography variant="caption" color="text.secondary">
                    | {Math.floor(Math.random() * 1000) + 1}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1} // Controls the space on either side of the divider
                >
                  {/* Item 1: The product name */}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.name}
                  </Typography>

                  {/* Item 2: The vertical divider */}
                  <Divider orientation="vertical" flexItem />

                  {/* Item 3: The product type */}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.category}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                  <Typography variant="subtitle1" color="primary">
                    Rs. {(product.price).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                    Rs. {(product.price * 1.4).toLocaleString()}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}