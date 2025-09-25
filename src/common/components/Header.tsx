import { Stack, Badge, Avatar, Menu, MenuItem, ListItemIcon, IconButton, useTheme, useMediaQuery, Box } from "@mui/material";
import { useState } from "react";
import { Favorite, ShoppingCart, Logout, ReceiptLong, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectCartItemCount } from "../../cart/slice";
import { selectCurrentUser, logoutUser } from "../userSlice";
import { selectWishlistItemCount } from "../../wishlist/WishlistSlice";
import { WishlistDialog } from "../../wishlist/WishlistDialog";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    // 1. Detect if the screen is mobile-sized
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const user = useAppSelector(selectCurrentUser);
    const totalCartItems = useAppSelector(selectCartItemCount);
    const wishlistItemCount = useAppSelector(selectWishlistItemCount);

    // --- State for Menus ---
    const [desktopAnchorEl, setDesktopAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
    const [isWishlistOpen, setWishlistOpen] = useState(false);

    const isDesktopMenuOpen = Boolean(desktopAnchorEl);
    const isMobileMenuOpen = Boolean(mobileAnchorEl);

    // --- Handlers ---
    const handleDesktopMenuOpen = (event: React.MouseEvent<HTMLElement>) => setDesktopAnchorEl(event.currentTarget);
    const handleDesktopMenuClose = () => setDesktopAnchorEl(null);
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileAnchorEl(event.currentTarget);
    const handleMobileMenuClose = () => setMobileAnchorEl(null);

    const handleLogout = () => {
        dispatch(logoutUser());
        handleDesktopMenuClose();
        handleMobileMenuClose();
        navigate('/home');
    };
    
    const handleNavigate = (path: string) => {
        navigate(path);
        handleDesktopMenuClose();
        handleMobileMenuClose();
    };

    // --- Mobile Menu Component ---
    const renderMobileMenu = (
        <Menu anchorEl={mobileAnchorEl} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
            {user ? (
                [
                    <MenuItem key="orders" onClick={() => handleNavigate('/myOrders')}>
                        <ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon>
                        My Orders
                    </MenuItem>,
                    <MenuItem key="wishlist" onClick={() => { setWishlistOpen(true); handleMobileMenuClose(); }}>
                        <ListItemIcon>
                            <Badge badgeContent={wishlistItemCount} color="error"><Favorite fontSize="small" /></Badge>
                        </ListItemIcon>
                        Wishlist
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                        Logout
                    </MenuItem>
                ]
            ) : (
                <MenuItem onClick={() => handleNavigate('/login')}>
                    <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                    Login / Sign Up
                </MenuItem>
            )}
        </Menu>
    );

    // --- Desktop Menu Component ---
    const renderDesktopMenu = (
        <Menu anchorEl={desktopAnchorEl} open={isDesktopMenuOpen} onClose={handleDesktopMenuClose}>
            <MenuItem onClick={() => handleNavigate('/myOrders')}>
                <ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon>
                My Orders
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ p: { xs: 1, sm: 2 }, borderBottom: "1px solid #eee" }}
            >
                {/* Left Section */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    {isMobile && (
                        <IconButton onClick={handleMobileMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>

                {/* Center Section (Logo) */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Logo />
                </Box>

                {/* Right Section */}
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ flex: 1 }}>
                    {isMobile ? (
                        // On Mobile: Only show the cart icon
                        <IconButton onClick={() => navigate('/shoppingCart')}>
                            <Badge badgeContent={totalCartItems} color="error">
                                <ShoppingCart id="cart-icon" sx={{ color: 'black' }} />
                            </Badge>
                        </IconButton>
                    ) : (
                        // On Desktop: Show user avatar and icons
                        <>
                            {user ? (
                                <Avatar sx={{ bgcolor: 'black', cursor: 'pointer', width: 32, height: 32 }} onClick={handleDesktopMenuOpen}>
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                            ) : (
                                <IconButton onClick={() => navigate('/login')}><AccountCircle sx={{ color: 'black' }} /></IconButton>
                            )}
                            <IconButton onClick={() => setWishlistOpen(true)}>
                                <Badge badgeContent={wishlistItemCount} color="error">
                                    <Favorite sx={{ color: 'black' }} />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={() => navigate('/shoppingCart')}>
                                <Badge badgeContent={totalCartItems} color="error">
                                    <ShoppingCart id="cart-icon" sx={{ color: 'black' }} />
                                </Badge>
                            </IconButton>
                        </>
                    )}
                </Stack>
            </Stack>
            {renderDesktopMenu}
            {renderMobileMenu}
            <WishlistDialog open={isWishlistOpen} onClose={() => setWishlistOpen(false)} />
        </>
    );
}