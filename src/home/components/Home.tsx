import Stack from "@mui/material/Stack";
import { Header } from "../../common/components/Header";
import { Navigation } from "../../common/components/Navigation";
// Import your home screen image (place it in src/assets/)
import homeImage1 from "../../assets/homescreen1.jpeg";
import homeImage2 from "../../assets/homescreen2.jpeg";
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
<Stack direction={"row"} justifyContent="center" spacing={-2} mr={4.5} mt={3}>
  <img
    src={homeImage1}
    alt="Home"
    style={{
      height: "300px",
      width: "600px",
      alignItems: "center",
      objectFit: "cover",
      transition: "transform 0.5s",
    }}
  />
  <img
    src={homeImage2}
    alt="Home"
    style={{
      height: "300px",
      width: "600px",
      alignItems: "center",
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