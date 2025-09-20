import React from "react";
import Stack from "@mui/material/Stack";
import { OfferBanner } from "../common/components/OfferBanner";
import { Header } from "../common/components/Header";
import { Navigation } from "../common/components/Navigation";
import { Footer } from "../common/components/Footer";
import { OrderHistoryPage } from "./OrderHistoryPage";

export const OrderHomePage = () => {
  return (
    <Stack>
      <OfferBanner />
      <Header />
      {/* Navigation */}
      <Navigation />
      {/* Footer can be added here if needed */}
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        <OrderHistoryPage />
</Stack>
<Stack>
  <Footer />
</Stack>

    </Stack>
  );
}