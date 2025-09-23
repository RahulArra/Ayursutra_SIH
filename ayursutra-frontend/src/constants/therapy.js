// Therapy types configuration
export const THERAPY_TYPES = {
  VAMANA: { 
    name: 'Vamana', 
    defaultDuration: 120, 
    color: '#1976d2',
    description: 'Therapeutic emesis',
    preparation: '3-7 days',
    recommendedTime: 'Early morning'
  },
  VIRECHANA: { 
    name: 'Virechana', 
    defaultDuration: 90, 
    color: '#2e7d32',
    description: 'Therapeutic purgation',
    preparation: '3-7 days',
    recommendedTime: 'Morning'
  },
  BASTI: { 
    name: 'Basti', 
    defaultDuration: 60, 
    color: '#9c27b0',
    description: 'Therapeutic enema',
    preparation: '1-3 days',
    recommendedTime: 'Morning/Evening'
  },
  NASYA: { 
    name: 'Nasya', 
    defaultDuration: 45, 
    color: '#ed6c02',
    description: 'Nasal therapy',
    preparation: '1-2 days',
    recommendedTime: 'Morning/Evening'
  },
  RAKTAMOKSHANA: { 
    name: 'Raktamokshana', 
    defaultDuration: 60, 
    color: '#d32f2f',
    description: 'Therapeutic bloodletting',
    preparation: '1-2 days',
    recommendedTime: 'Morning'
  }
};

// Session status configuration
export const SESSION_STATUS = {
  SCHEDULED: {
    value: 'scheduled',
    label: 'Scheduled',
    color: '#1976d2',
    icon: 'Schedule'
  },
  IN_PROGRESS: {
    value: 'in-progress',
    label: 'In Progress',
    color: '#ed6c02',
    icon: 'PlayCircle'
  },
  COMPLETED: {
    value: 'completed',
    label: 'Completed',
    color: '#2e7d32',
    icon: 'CheckCircle'
  },
  CANCELLED: {
    value: 'cancelled',
    label: 'Cancelled',
    color: '#d32f2f',
    icon: 'Cancel'
  }
};