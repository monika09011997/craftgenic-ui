import { Stack, Paper } from "@mui/material";

interface ScrollableThumbnailsProps {
  imageGallery: string[];
  selectedImage?: string;
  onThumbnailClick?: (imgUrl: string) => void; // Make callback optional
  canClick: boolean; // Controls if the component is interactive
}

export const ScrollableThumbnails = ({
  imageGallery,
  selectedImage,
  onThumbnailClick,
  canClick = true, // Default to true so it's clickable by default
}: ScrollableThumbnailsProps) => {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        overflowX: 'auto',
        py: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        maxWidth: '100%',
      }}
    >
      {imageGallery.map((imgUrl, index) => (
        <Paper
          key={index}
          elevation={selectedImage === imgUrl ? 4 : 1}
          // 1. Only call the handler if canClick is true
          onClick={() => canClick && onThumbnailClick?.(imgUrl)}
          sx={{
            flexShrink: 0,
            width: 100,
            // 2. Change the cursor based on the canClick prop
            cursor: canClick ? 'pointer' : 'default',
            border: selectedImage === imgUrl ? '3px solid' : '2px solid transparent',
            borderColor: 'black',
            overflow: 'hidden',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imgUrl}
            alt={`thumbnail-${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Paper>
      ))}
    </Stack>
  );
};