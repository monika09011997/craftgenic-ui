import Stack from "@mui/material/Stack";
import { Header } from "../../common/components/Header";
import { Navigation } from "../../common/components/Navigation";
import { HomeProductCatalog } from "./HomeProductCatalog";
import { Footer } from "../../common/components/Footer";
import { OfferBanner } from "../../common/components/OfferBanner";

export const Home = () => {

  return (
    <Stack>
      <OfferBanner />
      <Header />
      {/* Navigation */}
      <Navigation />

      {/* Promo Bar with Home Screen Image */}
<Stack 
direction={"row"} 
justifyContent="center"
alignItems={'center'}
spacing={-2} mr={4.5} mt={3}>
  <img
    src="/images/homescreen1.jpeg"
    alt="Home"
    style={{
      height: "300px",
      width: "600px",
      objectFit: "cover",
      transition: "transform 0.5s",
    }}
  />
  <img
    src="/images/homescreen2.jpeg"
    alt="Home"
    style={{
      height: "300px",
      width: "600px",
      objectFit: "cover",
      transition: "transform 0.5s",
    }}
  />
</Stack>
      {/* Footer can be added here if needed */}
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        <HomeProductCatalog />
</Stack>
<Stack>
  <Footer />
</Stack>

    </Stack>
  );
}