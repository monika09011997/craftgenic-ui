import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import { Logo } from '../components/Logo';
import { useRequestOtp, useVerifyOtp } from '../hooks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../userSlice';
import { useAppDispatch } from '../../hooks';

export const LoginPage = () => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  


    const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
      const dispatch = useAppDispatch();
  


  // Initialize the hooks and get the mutate functions and loading states
  const { mutate: requestOtp, isPending: isRequestingOtp } = useRequestOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    requestOtp({ enteredName, identifier }, {
      onSuccess: () => {
        // This runs only when the API call is successful
        setStep('verify');
      },
      onError: (err: Error) => {
        // This runs only on failure, setting your component's state
        setError(err.message || 'Failed to send code. Please try again.');
      },
    });
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    verifyOtp({ identifier, otp }, {
      onSuccess: (response) => {
        enqueueSnackbar('Login successful!', { variant: 'success' });
        navigate('/home'); // Or wherever you want to go after login
    dispatch(setCurrentUser(response.user));
      },
      onError: (err: Error) => {
        setError(err.message || 'Verification failed. Please check the code.');
      },
    });
  };

  // Combine loading states for the UI
  const isLoading = isRequestingOtp || isVerifyingOtp;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Logo />
          {step === 'request' ? (
            <>
              <Typography variant="h5" fontWeight={600}>Sign in</Typography>
              <Typography color="text.secondary">Enter your email and we'll send you a verification code.</Typography>
              <Box component="form" onSubmit={handleRequestOtp} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={enteredName}
                  onChange={(e) => setEnteredName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ mt: 2, py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={600}>Enter code</Typography>
              <Typography color="text.secondary">Sent to {identifier}</Typography>
              <Box component="form" onSubmit={handleVerifyOtp} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="6-digit code"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  inputProps={{ maxLength: 6 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ mt: 2, py: 1.5, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
              </Box>
              <Button variant="text" size="small" onClick={() => setStep('request')}>
                Sign in with a different email
              </Button>
            </>
          )}

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary">Privacy policy</Typography>
            <Typography variant="body2" color="text.secondary">Terms of service</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};