export const navItems = [
  "HOME",
  "ABSTRACT ART",
  "TEXTURED ART",
  "HOME DECOR",
  "ART PRINTS",
  "KNOW YOUR ARTISTS",
  "BEST SELLER",
];

export type NavItem = (typeof navItems)[number];

export type User = {
    name: 'string',
    identifier: 'string',
}

export type VerifyResponse = {
    success: boolean;
    message: string;
    user: User;
    token?: string; // JWT token if verification is successful
};

export type OtpResponse = {
    success: boolean;
    message: string;
};