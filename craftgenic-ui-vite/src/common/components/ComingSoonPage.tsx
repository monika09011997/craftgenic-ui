import { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography, useTheme, useMediaQuery } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// --- Countdown Timer Component ---
const CountdownTimer = ({ launchDate }: { launchDate: Date }) => {
  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Stack direction="row" spacing={{ xs: 2, sm: 4 }} justifyContent="center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <Box key={unit} textAlign="center">
          <Typography variant="h3" fontWeight={700}>{String(value).padStart(2, '0')}</Typography>
          <Typography variant="overline" color="text.secondary">{unit}</Typography>
        </Box>
      ))}
    </Stack>
  );
};


// --- Main Launching Soon Page ---
export const ComingSoonPage = () => {
  // === CUSTOMIZE THIS DATE ===
  const launchDate = new Date('2025-12-31T00:00:00');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        px: 2,
        // Optional: Add a subtle background gradient
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center">
          <Typography variant={isMobile ? "h3" : "h2"} component="h1" fontWeight={700}>
            Something Awesome is Coming Soon
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We're working hard to bring you a new collection of handmade art. Stay tuned!
          </Typography>

          <CountdownTimer launchDate={launchDate} />
        </Stack>
      </Container>
    </Box>
  );
};