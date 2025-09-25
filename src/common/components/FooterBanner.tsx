import { Favorite } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const FooterBanner = () => {
  return (
      <Box
        sx={{
          backgroundColor: 'black',
          color: 'primary.contrastText',
          // 1. Make padding responsive: more vertical padding on mobile
          padding: { xs: '16px 24px', sm: '8px 0' },
          fontWeight: 'bold',
          overflow: 'hidden', 
        }}
      >
        <Typography
          variant="subtitle1"
          align='center'
          fontWeight={600}
          sx={{
            // 2. Allow text to wrap on mobile, but not on desktop
            whiteSpace: { xs: 'normal', md: 'nowrap' },
            // 3. Adjust font size for better readability on mobile
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
            100% Handmade in India. Every piece a masterpiece
            <Favorite sx={{ fontSize: 'inherit', color: 'red', verticalAlign: 'middle', mx: 0.5 }} />
        </Typography>
      </Box>
  );
};