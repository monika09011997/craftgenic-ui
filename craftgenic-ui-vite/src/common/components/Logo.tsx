import { Box } from "@mui/material";

import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setSelectNavItem } from "../productSlice";

export const Logo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoRef = useRef<HTMLImageElement>(null);

        useEffect(() => {
            if (logoRef.current) {
                logoRef.current.classList.add("flip-logo");
            }
        }, []);

    const handleOnClick = () => {
        // Navigate to home on click
        dispatch(setSelectNavItem('HOME'));
        navigate('/home');
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: 200,
                height: 150,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                margin: "0 auto"
            }}
        >
            <img
                ref={logoRef}
                src={logo}
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                className="logo-img"
                onClick={handleOnClick} // Navigate to home on click

            />
            {/* Flip animation style */}
            <style>
                {`
                .logo-img {
                    transform: rotateY(0deg);
                    transition: transform 3s cubic-bezier(0.4, 0.2, 0.2, 1);
                }
                .flip-logo {
                    transform: rotateY(360deg);
                }
                `}
            </style>
        </Box>
    );
}