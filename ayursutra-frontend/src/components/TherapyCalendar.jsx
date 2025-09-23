import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Snackbar,
  Alert,
  Grid,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Room as RoomIcon,
  NoteAlt as NoteIcon,
  Warning as WarningIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';
import { THERAPY_TYPES, SESSION_STATUS } from '../constants/therapy';
import { mockSessions } from '../mock/sessions';

// Mock data - replace with actual API calls
const mockEvents = [
  {
    id: 1,
    title: 'John Doe - Virechana',
    start: '2025-09-23T10:00:00',
    end: '2025-09-23T11:30:00',
    status: 'scheduled',
    patientId: 101,
    therapyType: 'Virechana'
  },
  {
    id: 2,
    title: 'Jane Smith - Basti',
    start: '2025-09-23T14:00:00',
    end: '2025-09-23T15:30:00',
    status: 'completed',
    patientId: 102,
    therapyType: 'Basti'
  }
];

const getEventColor = (status) => {
  const sessionStatus = Object.values(SESSION_STATUS).find(s => s.value === status);
  return sessionStatus?.color || '#1976d2';
};

export default function TherapyCalendar() {
  const calendarRef = React.useRef(null);
  const [filters, setFilters] = useState({
    therapyType: 'all',
    status: 'all'
  });
  
  const [eventDialog, setEventDialog] = useState({
    open: false,
    event: null,
    mode: 'view' // 'view' or 'edit'
  });

  const [rescheduleDialog, setRescheduleDialog] = useState({
    open: false,
    event: null,
    newStart: null,
    newEnd: null
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const queryClient = useQueryClient();

  // Fetch sessions
  const { data: events } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      // In development, return our local state
      // In production, this would be an API call
      return Promise.resolve(localEvents);
    }
  });

  // Since we're using mock data, let's create a state to manage our events
  const [localEvents, setLocalEvents] = useState(mockEvents);

  // Reschedule mutation
  const rescheduleMutation = useMutation({
    mutationFn: async ({ id, start, end }) => {
      // In development, we'll update our local state directly
      // In production, this would be an API call
      setLocalEvents(prev => prev.map(event => {
        if (event.id === id) {
          return {
            ...event,
            start,
            end,
            title: `${event.patientName} - ${event.therapyType}`
          };
        }
        return event;
      }));
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sessions']);
      setSnackbar({
        open: true,
        message: 'Session rescheduled successfully',
        severity: 'success'
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: 'Failed to reschedule session: ' + error.message,
        severity: 'error'
      });
    }
  });

  const handleEventDrop = async (dropInfo) => {
    try {
      console.log('Drag-drop event:', {
        id: dropInfo.event.id,
        oldStart: dropInfo.oldEvent.start,
        oldEnd: dropInfo.oldEvent.end,
        newStart: dropInfo.event.start,
        newEnd: dropInfo.event.end
      });

      await rescheduleMutation.mutateAsync({
        id: parseInt(dropInfo.event.id),
        start: dropInfo.event.start.toISOString(),
        end: dropInfo.event.end.toISOString()
      });
      
      // Force refresh the calendar
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();

      setSnackbar({
        open: true,
        message: 'Session rescheduled successfully',
        severity: 'success'
      });
    } catch (error) {
      dropInfo.revert();
      console.error('Drag-drop failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to reschedule session: ' + (error.message || 'Unknown error'),
        severity: 'error'
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setEventDialog({
      open: true,
      event: clickInfo.event,
      mode: 'view'
    });
  };

  const handleRescheduleDialog = (event) => {
    setEventDialog({ ...eventDialog, open: false });
    setRescheduleDialog({
      open: true,
      event: event
    });
  };

  const handleRescheduleClose = () => {
    setRescheduleDialog({
      open: false,
      event: null,
      newStart: null,
      newEnd: null
    });
  };

  const handleDateChange = (field, value) => {
    const event = rescheduleDialog.event;
    if (!event) return;

    const currentStart = rescheduleDialog.newStart || event.start;
    const currentEnd = rescheduleDialog.newEnd || event.end;
    
    const newDate = new Date(value);
    
    if (field === 'start') {
      // If changing start, maintain the same duration
      const duration = currentEnd - currentStart;
      const newEnd = new Date(newDate.getTime() + duration);
      
      setRescheduleDialog(prev => ({
        ...prev,
        newStart: newDate,
        newEnd: newEnd
      }));
    } else {
      // If changing end, just update end time
      if (newDate <= currentStart) {
        setSnackbar({
          open: true,
          message: 'End time must be after start time',
          severity: 'error'
        });
        return;
      }
      
      setRescheduleDialog(prev => ({
        ...prev,
        newEnd: newDate
      }));
    }
  };

  const handleRescheduleSubmit = async () => {
    const { event, newStart, newEnd } = rescheduleDialog;
    if (!event || !newStart || !newEnd) {
      setSnackbar({
        open: true,
        message: 'Please select both start and end times',
        severity: 'error'
      });
      return;
    }

    try {
      console.log('Rescheduling event:', {
        id: event.id,
        oldStart: event.start,
        oldEnd: event.end,
        newStart: newStart,
        newEnd: newEnd
      });

      await rescheduleMutation.mutateAsync({
        id: parseInt(event.id),
        start: newStart.toISOString(),
        end: newEnd.toISOString()
      });

      // Force refresh the calendar
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
      
      handleRescheduleClose();
    } catch (error) {
      console.error('Reschedule failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to reschedule session: ' + (error.message || 'Unknown error'),
        severity: 'error'
      });
    }
  };

  // Filter events based on current filters
  const filteredEvents = events?.filter(event => {
    if (filters.therapyType !== 'all' && event.therapyType !== filters.therapyType) return false;
    if (filters.status !== 'all' && event.status !== filters.status) return false;
    return true;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Filter Toolbar */}
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Therapy Type</InputLabel>
              <Select
                value={filters.therapyType}
                label="Therapy Type"
                onChange={(e) => setFilters({ ...filters, therapyType: e.target.value })}
              >
                <MenuItem value="all">All Therapies</MenuItem>
                {Object.entries(THERAPY_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                {Object.values(SESSION_STATUS).map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" gap={1}>
              <Chip 
                label={`${filteredEvents?.length || 0} Sessions`} 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        events={events}
        eventContent={(eventInfo) => ({
          html: `<div class="fc-event-main-inner" style="color: white;">
            <div style="font-weight: bold;">${eventInfo.event.title}</div>
          </div>`
        })}
        eventClassNames={(eventInfo) => {
          return [`status-${eventInfo.event.extendedProps.status}`];
        }}
        eventColor={(eventInfo) => getEventColor(eventInfo.event.extendedProps.status)}
      />

      {/* Event Details Dialog */}
      <Dialog 
        open={eventDialog.open} 
        onClose={() => setEventDialog({ ...eventDialog, open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Session Details
            <Chip 
              label={eventDialog.event?.extendedProps?.status.toUpperCase()} 
              color={getEventColor(eventDialog.event?.extendedProps?.status)}
              size="small"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h6">{eventDialog.event?.extendedProps?.patientName}</Typography>
              <Typography color="textSecondary">
                {THERAPY_TYPES[eventDialog.event?.extendedProps?.therapyType]?.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Start Time</Typography>
              <Typography>
                {eventDialog.event?.start?.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">End Time</Typography>
              <Typography>
                {eventDialog.event?.end?.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Room</Typography>
              <Typography>{eventDialog.event?.extendedProps?.room}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Notes</Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                variant="outlined"
                value={eventDialog.event?.extendedProps?.notes || ''}
                disabled={eventDialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Practitioner Notes</Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                variant="outlined"
                value={eventDialog.event?.extendedProps?.practitionerNotes || ''}
                disabled={eventDialog.mode === 'view'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {eventDialog.mode === 'view' ? (
            <>
              <Button onClick={() => setEventDialog({ ...eventDialog, mode: 'edit' })}>
                Edit
              </Button>
              <Button onClick={() => handleRescheduleDialog(eventDialog.event)} color="primary">
                Reschedule
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEventDialog({ ...eventDialog, mode: 'view' })}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog 
        open={rescheduleDialog.open} 
        onClose={handleRescheduleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Reschedule Session
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {rescheduleDialog.event?.extendedProps?.patientName} - {
              THERAPY_TYPES[rescheduleDialog.event?.extendedProps?.therapyType]?.name
            }
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Start Time"
              type="datetime-local"
              value={(rescheduleDialog.newStart || rescheduleDialog.event?.start)?.toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
            <TextField
              label="End Time"
              type="datetime-local"
              value={(rescheduleDialog.newEnd || rescheduleDialog.event?.end)?.toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
            {rescheduleDialog.event && (
              <Typography variant="body2" color="textSecondary">
                Duration: {
                  Math.round(
                    ((rescheduleDialog.newEnd || rescheduleDialog.event.end) - 
                     (rescheduleDialog.newStart || rescheduleDialog.event.start)) / (1000 * 60)
                  )
                } minutes
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRescheduleClose}>Cancel</Button>
          <Button 
            onClick={handleRescheduleSubmit} 
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}