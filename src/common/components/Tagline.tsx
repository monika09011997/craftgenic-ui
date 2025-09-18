import { Stack, Typography } from "@mui/material"

export const Tagline = () => {
    return (
      <Stack alignItems="center" sx={{ mt: 1 }}>
        <Typography
              sx={{
                  fontFamily: "'Pacifico', cursive", // Apply the Pacifico font
                  fontSize: '1.5rem', // Adjust size as needed
                  color: '#000',
                  lineHeight: 1.1,
              }}
          >
              Where Your Walls
          </Typography><Typography
              sx={{
                  fontFamily: "'Lora', serif", // Apply the Lora font
                  fontSize: '1.5rem', // Adjust size as needed
                  color: '#000',
                  lineHeight: 1.2,
              }}
          >
                  Tell Your Story
              </Typography>
      </Stack>
    )
};