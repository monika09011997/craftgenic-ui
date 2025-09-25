import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid, Stack, Typography } from '@mui/material';

export const ProductFeatures = () => {
  const features = [
    { icon: <StarBorderOutlinedIcon sx={{ fontSize: 32 }} />, text: 'Premium Canvas' },
    { icon: <EnergySavingsLeafOutlinedIcon sx={{ fontSize: 32 }} />, text: 'Non-Toxic Acrylic Paints' },
    { icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: 32 }} />, text: 'Hand-painted Original' },
        { icon: <CheckBoxOutlinedIcon sx={{ fontSize: 32 }} />, text: 'Framed' },
    { icon: <LockOutlinedIcon sx={{ fontSize: 32 }} />, text: '100% Secure Payment' },
        { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />, text: 'Fast Shipping' },

  ];

  return (
    <Stack sx={{ borderTop: '1px solid #eee' }} mx={{ xs: 1, md: 4 }} p={3}>
      <Grid container justifyContent={'space-evenly'} spacing={{ xs: 4, md: 2 }} sx={{ textAlign: 'center' }}>
        {features.map((feature, index) => (
          // The "item" prop has been removed here
          <Grid spacing={{ xs: 6, sm: 4}} key={index}>
            <Stack alignItems="center" spacing={1}>
              {feature.icon}
              <Typography variant="body2" color="text.secondary">
                {feature.text}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};