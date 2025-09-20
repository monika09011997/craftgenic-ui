import { Box, Typography } from '@mui/material';

// 1. Define a "flash" animation using CSS @keyframes
const flashKeyframes = `
  @keyframes flash {
    0%, 100% { opacity: 1; } /* Fully visible at the start and end */
    50% { opacity: 0.2; }    /* Faded out in the middle */
  }
`;

export const OfferBanner = () => {
  return (
    <>
      {/* Inject the keyframes into the document's head */}
      <style>{flashKeyframes}</style>
      
      {/* The main banner container */}
      <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          padding: '8px 0',
          fontWeight: 'bold',
          textAlign: 'center', // Center the text since it's not scrolling
        }}
      >
        {/* The flashing text */}
        <Typography
          variant="subtitle1"
          sx={{
            // 2. Apply the new flash animation
            animation: 'flash 5s linear infinite', 
          }}
        >
          ✨ Grand Opening Sale! Get 20% OFF on all abstract art. Use code: ART20 ✨
        </Typography>
      </Box>
    </>
  );
};