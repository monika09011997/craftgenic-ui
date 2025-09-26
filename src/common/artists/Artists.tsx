import { Avatar, Box, Grid, IconButton, Stack, Typography, Link } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { useFetchProductList } from "../../home/hooks";
import { useMemo } from "react";
import { ScrollableThumbnails } from "../components/ScrollableThumbnails";

const artist = {
  name: 'Monika Kumari',
  tagline: 'Abstract Expressionist',
bio: `By day, Monika is a software engineer, building the digital world with code and logic. By night, she is an abstract artist, deconstructing it with texture and intuition. Her work explores the intersection of two seemingly opposite worlds, creating tactile, visceral pieces that bridge the gap between the structured and the spontaneous.
She creates dynamic compositions that invite viewers to interpret their own meanings.
Her work has been exhibited in galleries and art fairs, She draws inspiration from nature, human experiences, and the complexities of modern life, translating these themes into bold visual statements.
In addition to her studio practice, She believes in the transformative power of art and its ability to connect people across diverse backgrounds.`,  imageUrl: "/images/artist_monika.jpeg",
  social: {
    instagram: 'https://instagram.com/dorothyfagan',
    linkedIn: 'https://www.linkedin.com/in/monika-kumari-113762168/',
  }
};

export const Artists = () => {
  const { productList } = useFetchProductList();

  const featuredWorks = useMemo(() => {
    if (!productList) return [];
    return productList.map(product => ({
      id: product.id,
      title: product.name,
      imageUrl: product.imageUrl,
    }));
  }, [productList]);

  return (
    // 3. Add responsive padding to the main container
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 4 } }}>
      <Grid container spacing={{ xs: 4, md: 5 }}>
        
        {/* 1. Responsive Grid Layout: Left Column */}
        {/* This column stacks on mobile (xs=12) and is side-by-side on desktop (md=4) */}
        <Grid spacing={{ xs: 12, md: 4 }} textAlign="center">
          <Stack alignItems="center" spacing={2}>
            <Avatar
              alt={artist.name}
              src={artist.imageUrl}
              sx={{ 
                // 2. Make the Avatar size responsive
                width: { xs: 180, md: 250 },
                height: { xs: 180, md: 250 },
                border: '4px solid',
                borderColor: 'black',
                '& img': {
                  objectFit: 'cover',
                  objectPosition: 'top',
                },
              }}
            />
            <Typography variant="h5" fontWeight={600}>{artist.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{artist.tagline}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton component={Link} href={artist.social.instagram} target="_blank" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton component={Link} href={artist.social.linkedIn} target="_blank" aria-label="linkedin">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        {/* 1. Responsive Grid Layout: Right Column */}
        {/* This column stacks on mobile (xs=12) and is side-by-side on desktop (md=8) */}
        <Grid width={'800px'} spacing={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
                About the Artist
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {artist.bio}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                Featured Works
              </Typography>
              <ScrollableThumbnails
                imageGallery={featuredWorks.map(work => work.imageUrl)}
                canClick={false} 
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};