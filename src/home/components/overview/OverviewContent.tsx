import Stack from "@mui/material/Stack";
import { Header } from "../../../common/components/Header";
import { Navigation } from "../../../common/components/Navigation";
import { ProductOverview } from "./ProductOverview";
import { Footer } from "../../../common/components/Footer";
import { OfferBanner } from "../../../common/components/OfferBanner";

export const OverviewContent = () => {
  return (
    <Stack>
      <OfferBanner />
      <Header />
      {/* Navigation */}
      <Navigation />
      {/* Footer can be added here if needed */}
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        <ProductOverview />
</Stack>
<Stack>
  <Footer />
</Stack>

    </Stack>
  );
}