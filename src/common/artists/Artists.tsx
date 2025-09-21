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
In addition to her studio practice, She believes in the transformative power of art and its ability to connect people across diverse backgrounds.`,
  imageUrl: "src/assets/artist_monika.jpeg", // URL to a portrait of the artist
  social: {
    instagram: 'https://instagram.com/dorothyfagan',
    linkedIn: 'https://www.linkedin.com/in/monika-kumari-113762168/',
  }
};

// --- Main Artist Page Component ---
export const Artists = () => {
  const { productList } = useFetchProductList();

const featuredWorks = useMemo(() => {
  // If there's no product list, return an empty array
  if (!productList) {
    return [];
  }
  
  // This logic now only runs when productList changes
  return productList.map(product => ({
    id: product.id,
    title: product.name,
    imageUrl: product.imageUrl,
  }));
}, [productList]); // 2. Add productList as a dependency

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={5}>
        {/* Left Column: Artist Portrait & Socials */}
        <Grid width={'30%'} textAlign="center">
          <Stack alignItems="center" spacing={2}>
            <Avatar
              alt={artist.name}
              src={artist.imageUrl}
              sx={{ 
                width: 250,
                height: 250,
                border: '4px solid',
                borderColor: 'black',
                '& img': { // Target the img element inside the Avatar
                  objectFit: 'cover', // This will crop the image to fill the circle
                  objectPosition: 'top', // Ensures the center of the image is visible
                },
              }}
            />
            <Typography variant="h5" fontWeight={600}>{artist.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{artist.tagline}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton component={Link} href={artist.social.instagram} target="_blank" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton component={Link} href={artist.social.linkedIn} target="_blank" aria-label="twitter">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        {/* Right Column: Bio & Featured Works */}
        <Grid width={'60%'}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                About the Artist
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {artist.bio}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Featured Works
              </Typography>
              <Grid container spacing={2}>
                <ScrollableThumbnails
                  imageGallery={featuredWorks.map(work => work.imageUrl)}
                  canClick={false} />
                {/* {featuredWorks?.map(work => (
                  <Grid width={'30%'} key={work.title}>
                    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                       <img src={work.imageUrl} alt={work.title} style={{ width: '100%', display: 'block' }} />
                       <Typography variant="caption" sx={{ p: 1, display: 'block', textAlign: 'center' }}>
                         {work.title}
                       </Typography>
                    </Paper>
                  </Grid>
                ))} */}
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};