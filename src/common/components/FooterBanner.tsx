import { Favorite } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const FooterBanner = () => {
  return (
      
      <Box
        sx={{
          backgroundColor: 'black', // Or any color you like, e.g., '#000'
          color: 'primary.contrastText',  // e.g., '#fff'
          padding: '8px 0',
          fontWeight: 'bold',
          overflow: 'hidden', // Hides the text when it's outside the banner
          whiteSpace: 'nowrap', // Prevents the text from wrapping to a new line
        }}
      >
        {/* The running text that will be animated */}
        <Typography
          variant="subtitle1"
          align='center'
          fontWeight={600}
        >
            100% Handmade in India. Every piece a masterpiece<Favorite sx={{ fontSize: 20, color: 'red', verticalAlign: 'middle', mx: 0.5 }} />
        </Typography>
      </Box>
  );
};