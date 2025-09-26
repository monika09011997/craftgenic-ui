import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Header } from "../../common/components/Header";
import { Navigation } from "../../common/components/Navigation";
import { HomeProductCatalog } from "./HomeProductCatalog";
import { Footer } from "../../common/components/Footer";
import { OfferBanner } from "../../common/components/OfferBanner";
import { useAppSelector } from "../../hooks";
import { selectSelectedNavItem } from "../../common/productSlice";
import { useMemo } from "react";
import { ComingSoonPage } from "../../common/components/ComingSoonPage";

export const Home = () => {
  const selectedNavItem = useAppSelector(selectSelectedNavItem);

  const showLaunchPage = useMemo(() => {
    if(selectedNavItem === 'HOME DECOR' || selectedNavItem === 'ART PRINTS') {
      return true;
    }
  }, [selectedNavItem]);
  
  return (
    <Stack>
      <OfferBanner />
      <Header />
      <Navigation />

      <Stack 
        direction="row"
        justifyContent="center"
        alignItems="center"
        // 1. Remove spacing on mobile (xs), add it back on desktop (md)
        sx={{ mt: 3, px: { xs: 0, sm: 0 } }} // No padding on the very smallest screens
      >
        <Box
          component="img"
          src="/images/homescreen1.jpeg"
          alt="Home"
          sx={{
            objectFit: "cover",
            // 2. Set an explicit, responsive height to force both images to be the same size
            height: { xs: 180, sm: 250, md: 300 },
            // 3. Adjust width for zero spacing on mobile (50%)
            width: { xs: '50%', md: '450px', lg: '600px' },
          }}
        />
        <Box
          component="img"
          src="/images/homescreen2.jpeg"
          alt="Home"
          sx={{
            objectFit: "cover",
            height: { xs: 180, sm: 250, md: 300 }, // Same height as the other image
            width: { xs: '50%', md: '450px', lg: '600px' },
          }}
        />
      </Stack>
      
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        {showLaunchPage ? (
          <ComingSoonPage />
        ):         <HomeProductCatalog />}
      </Stack>
      
      <Stack>
        <Footer />
      </Stack>
    </Stack>
  );
}