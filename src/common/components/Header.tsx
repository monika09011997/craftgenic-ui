import { Stack, Badge, Avatar, Menu, MenuItem, ListItemIcon, IconButton } from "@mui/material"; // 1. Import Menu components
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Favorite, ShoppingCart, Logout, ReceiptLong } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectCartItemCount } from "../../cart/slice";
import { selectCurrentUser, logoutUser } from "../userSlice"; // 2. Import logoutUser
import { selectWishlistItemCount } from "../../wishlist/WishlistSlice";
import { WishlistDialog } from "../../wishlist/WishlistDialog";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectCurrentUser);
    const totalCartItems = useAppSelector(selectCartItemCount);

    // 3. State to manage the menu's anchor element
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

     const [isWishlistOpen, setWishlistOpen] = useState(false);
  const wishlistItemCount = useAppSelector(selectWishlistItemCount);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        handleClose();
        navigate('/home');
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mx={3}
            my={1}
            sx={{ borderBottom: "1px solid #eee" }}
        >
            {/* ... Your Search and Logo sections ... */}
            <Stack direction="row" alignItems="center" flex={1}>
                {/* Search logic */}
            </Stack>
            <Stack direction="column" alignItems="center" spacing={0.5}>
                <Logo />
            </Stack>

            {/* Account & Cart */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                flex={1}
                spacing={2}
                mr={3}
            >
                {user ? (
                    // 4. If user is logged in, show Avatar which opens a Menu
                    <>
                        <Avatar
                            sizes="small"
                            sx={{ bgcolor: 'black', cursor: 'pointer' }}
                            onClick={handleClick}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { navigate('/myOrders'); handleClose(); }}>
                                <ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon>
                                My Orders
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    // 5. If logged out, show the login icon
                    <AccountCircleIcon onClick={() => navigate('/login')} sx={{ cursor: "pointer" }} />
                )}

<IconButton onClick={() => setWishlistOpen(true)}>
          <Badge 
          badgeContent={wishlistItemCount}
             sx={{
      "& .MuiBadge-badge": {
        color: "white", // Text color of the badge
        backgroundColor: "black" // Background of the badge
      }
    }}
          >
            <Favorite sx={{color: 'black'}} />
          </Badge>
        </IconButton>
        
        <IconButton onClick={() => navigate('/shoppingCart')}>
                <Badge 
                badgeContent={totalCartItems} 
   sx={{
      "& .MuiBadge-badge": {
        color: "white", // Text color of the badge
        backgroundColor: "black" // Background of the badge
      }
    }}                >
                    {/* Add the id="cart-icon" here */}
                    <ShoppingCart
                        id="cart-icon"
                        sx={{ color: 'black' }}
                    />
                </Badge>
                </IconButton>
            </Stack>
                  <WishlistDialog open={isWishlistOpen} onClose={() => setWishlistOpen(false)} />
        </Stack>
    );
}