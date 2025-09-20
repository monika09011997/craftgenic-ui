import { Route, Routes, useLocation } from "react-router-dom";
import { OverviewContent } from "./home/components/overview/OverviewContent";
import { Home } from "./home/components/Home";
import { LoginPage } from "./common/login/login";
import { ArtistContent } from "./common/artists/ArtistContent";
import { ShoppingPage } from "./cart/ShoppingPage";
import { AnimatePresence } from "framer-motion";
import { AnimatePage } from "./common/components/animations/AnimatePage";
import { OrderSuccessPage } from "./orders/OrderSuccessPage";
import { OrderHomePage } from "./orders/OrderHomePage";


export const CraftgenicRoutes = () => {
    const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<AnimatePage><Home /></AnimatePage>} />
        <Route path='/home' element={<AnimatePage><Home /></AnimatePage>} />
        {/* Add more routes as needed */}
        <Route path="/product/:id" element={<AnimatePage><OverviewContent /></AnimatePage>} />
        <Route path="/login" element={<AnimatePage><LoginPage/></AnimatePage>} />
        <Route path="/artists" element={<AnimatePage><ArtistContent/></AnimatePage>} />
        <Route path="/shoppingCart" element={<AnimatePage><ShoppingPage/></AnimatePage>} />
        <Route path="/order-success" element={<AnimatePage><OrderSuccessPage/></AnimatePage>} />
        <Route path="/myorders" element={<AnimatePage><OrderHomePage/></AnimatePage>} />
    </Routes>
    </AnimatePresence>
  );
}
