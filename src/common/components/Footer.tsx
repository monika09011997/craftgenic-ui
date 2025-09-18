import { Box, Divider, Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { FooterBanner } from "./FooterBanner";
import { ProductFeatures } from "./ProductFeatures";

export const Footer = () => (
  <>
  <ProductFeatures />
  <Box sx={{ background: "#393939", color: "#fff", py: 6, px: { xs: 2, md: 6 } }}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={6}
      justifyContent="center"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem sx={{ borderColor: '#424242' }} />}
    >
      <Stack flex={1} alignItems="center" textAlign="center" spacing={2} maxWidth={400}>
        <PublicIcon sx={{ fontSize: 30 }} />
        <Typography variant="h5" sx={{ fontWeight: 400 }}>
          Global Selection
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Explore an unparalleled selection of paintings, photography, sculpture, and more by thousands of artists from around the world.
        </Typography>
      </Stack>
      <Stack flex={1} alignItems="center" textAlign="center" spacing={2} maxWidth={400}>
        <SentimentSatisfiedAltIcon sx={{ fontSize: 30 }} />
        <Typography variant="h5" sx={{ fontWeight: 400 }}>
          Satisfaction Guaranteed
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Our 14-day satisfaction guarantee allows you to buy with confidence. If you’re not satisfied with your purchase, return it and we’ll help you find a work you love.
        </Typography>
      </Stack>
      <Stack flex={1} alignItems="center" textAlign="center" spacing={2} maxWidth={400}>
        <SupportAgentIcon sx={{ fontSize: 30 }} />
        <Typography variant="h5" sx={{ fontWeight: 400 }}>
          Complimentary Art Advisory Services
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Our personalized art advisory service gives you access to your own expert curator, free of charge.
        </Typography>
      </Stack>
    </Stack>
  </Box><FooterBanner /></>
  );