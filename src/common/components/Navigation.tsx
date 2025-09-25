import { Stack } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { navItems } from "../types";
import { setSelectNavItem, selectSelectedNavItem } from "../productSlice"; // Corrected the typo from 'prodictSlice'
import { useAppSelector } from "../../hooks";

export const Navigation = () => {
      const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedNavItem = useAppSelector(selectSelectedNavItem);


    const setSelectedAndNavigate = (item: string) => {
        dispatch(setSelectNavItem(item));
        // Navigate based on the selected item
        if (item === 'HOME') {
            navigate('/home');
        } else if (item === 'ABSTRACT ART') {
                        navigate('/home');
        } else if (item === 'TEXTURED ART') {
                        navigate('/home');
        } else if (item === 'HOME DECOR') {
        } else if (item === 'ART PRINTS') {
        } else if (item === 'KNOW YOUR ARTISTS') {
            navigate('/artists');
        } else if (item === 'BEST SELLER') {
        }
    };

       return (
        <Stack
            direction="row"
            spacing={{ xs: 3, md: 6 }}
            sx={{
                py: "18px",
                borderBottom: "1px solid #ddd",
                overflowX: 'auto',
                whiteSpace: 'nowrap',

                // 1. Vertically align all items to fix the misalignment
                alignItems: "center", 

                // 2. Fix mobile scrolling cutoff by changing justification
                justifyContent: { xs: 'flex-start', md: 'center' },

                // Hide the scrollbar for a cleaner look
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
            }}
        >
            {navItems.map(item => (
                <Stack
                    key={item}
                    onClick={() => setSelectedAndNavigate(item)}
                    sx={{
                        cursor: "pointer",
                        color: selectedNavItem === item ? "#C8A8E9" : "inherit",
                        fontWeight: 500,
                        letterSpacing: 1,
                        fontSize: selectedNavItem === item ? 14 : 13,
                        transition: "color 0.2s, font-size 0.2s",
                        "&:hover": {
                            color: "#C8A8E9",
                            fontSize: 16,
                        }
                    }}
                >
                    {item}
                </Stack>
            ))}
        </Stack>
    );
}