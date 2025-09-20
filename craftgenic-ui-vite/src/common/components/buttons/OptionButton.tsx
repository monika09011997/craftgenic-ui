import { Button } from '@mui/material';

export const OptionButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
  <Button
    variant={selected ? 'contained' : 'outlined'}
    onClick={onClick}
    sx={{
      borderRadius: '4px',
      textTransform: 'none',
      minWidth: '80px',
        borderColor: '#000', // Black border
        color: selected ? '#fff' : '#000', // White text when selected, black otherwise
      // Add this logic to change the color
      ...(selected && {
        backgroundColor: '#000', // Black background when selected
        color: '#fff',           // White text when selected
        '&:hover': {
          backgroundColor: '#333', // A slightly lighter black on hover
        },
      }),
    }}
  >
    {label}
  </Button>
);