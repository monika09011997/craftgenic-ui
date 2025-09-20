import Stack from "@mui/material/Stack";

import { Navigation } from "../components/Navigation";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Artists } from "./Artists";

export const ArtistContent = () => {
  return (
    <Stack>
      <Header />
      {/* Navigation */}
      <Navigation />
      {/* Footer can be added here if needed */}
      <Stack alignContent={"center"} justifyContent="center" sx={{ padding: 3 }}>
        <Artists />
</Stack>
<Stack>
  <Footer />
</Stack>

    </Stack>
  );
}