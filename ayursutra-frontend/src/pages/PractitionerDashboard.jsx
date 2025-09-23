import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedbackSummary from '../components/FeedbackSummary';
import TherapyCalendar from '../components/TherapyCalendar';

const queryClient = new QueryClient();

// Initial mock data
const initialSessions = [
  {
    id: 1,
    title: 'John Doe - Virechana',
    start: '2025-09-23T10:00:00',
    end: '2025-09-23T11:30:00',
    patientName: 'John Doe',
    therapyType: 'Virechana',
    roomNumber: '101'
  },
  {
    id: 2,
    title: 'Jane Smith - Basti',
    start: '2025-09-23T14:00:00',
    end: '2025-09-23T15:30:00',
    patientName: 'Jane Smith',
    therapyType: 'Basti',
    roomNumber: '102'
  }
];

function PractitionerDashboardContent() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Practitioner Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Calendar Section - Takes up 8/12 of the width */}
        <Grid xs={12} lg={8}>
          <Card sx={{ p: 2, height: 'calc(100vh - 160px)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Schedule
            </Typography>
            <TherapyCalendar />
          </Card>
        </Grid>

        {/* Feedback Summary Section - Takes up 4/12 of the width */}
        <Grid xs={12} lg={4}>
          <FeedbackSummary />
        </Grid>
      </Grid>
    </Box>
  );
}

// Wrap the dashboard with QueryClientProvider
export default function PractitionerDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <PractitionerDashboardContent />
    </QueryClientProvider>
  );
}
