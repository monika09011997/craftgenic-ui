import Stack from "@mui/material/Stack";
import { ShoppingCart } from "./ShoppingCart";
import { OfferBanner } from "../common/components/OfferBanner";
import { Header } from "../common/components/Header";
import { Navigation } from "../common/components/Navigation";
import { Footer } from "../common/components/Footer";

export const ShoppingPage = () => {
  return (
    <Stack>
      <OfferBanner />
      <Header />
      {/* Navigation */}
      <Navigation />
      {/* Footer can be added here if needed */}
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        <ShoppingCart />
</Stack>
<Stack>
  <Footer />
</Stack>

    </Stack>
  );
}