import { Button, CircularProgress } from "@mui/material";

export const LoadingButton = ({ isLoading, children, ...props }: { isLoading: boolean; children: React.ReactNode } & React.ComponentProps<typeof Button>) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled} sx={{ position: 'relative', ...props.sx }}>
      {isLoading ? (
        <CircularProgress size={24} sx={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
      ) : (
        children
      )}
    </Button>
  );
}