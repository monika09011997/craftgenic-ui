

import { CraftgenicRoutes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Duration } from 'luxon'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Duration.fromObject({ second: 60 }).toMillis(),
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <CraftgenicRoutes />
    </QueryClientProvider>
  );
}
