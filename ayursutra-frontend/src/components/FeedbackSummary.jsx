import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Timeline,
  InsertChart,
  TrendingUp,
  Message,
  FilterList,
  Download,
  Refresh
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { mockFeedback, getFeedbackStats, feedbackTimeRanges, sentimentColors } from '../mock/feedback';
import { THERAPY_TYPES } from '../constants/therapy';
import axios from 'axios';

const initialFilters = {
  timeRange: feedbackTimeRanges.MONTH,
  therapyType: 'all',
  searchTerm: ''
};

export default function FeedbackSummary() {
  const [timeRange, setTimeRange] = useState(feedbackTimeRanges.MONTH);
  const [selectedTherapy, setSelectedTherapy] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Query for feedback data
  const { data: fetchedFeedback, isLoading, error } = useQuery({
    queryKey: ['feedbackData', timeRange, selectedTherapy],
    queryFn: async () => {
      // In development, return mock data
      // In production, this would be an API call
      return Promise.resolve(mockFeedback);
    }
  });

  useEffect(() => {
    if (fetchedFeedback) {
      // Filter feedback based on time range and therapy type
      let filtered = [...fetchedFeedback];
      
      if (selectedTherapy !== 'all') {
        filtered = filtered.filter(f => f.therapyType === selectedTherapy);
      }

      if (searchTerm) {
        filtered = filtered.filter(f => 
          f.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      setFeedbackData(filtered);
      setStats(getFeedbackStats(filtered));
    }
  }, [fetchedFeedback, timeRange, selectedTherapy, searchTerm]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const prepareSentimentData = () => {
    return Object.entries(stats?.sentimentBreakdown || {}).map(([sentiment, count]) => ({
      name: sentiment,
      value: count
    }));
  };

  const prepareTherapyEffectivenessData = () => {
    return Object.entries(stats?.therapyEffectiveness || {}).map(([therapy, data]) => ({
      name: THERAPY_TYPES[therapy]?.name || therapy,
      effectiveness: data.total / data.count
    }));
  };

  const prepareSymptomData = () => {
    return Object.entries(stats?.commonSymptoms || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([symptom, count]) => ({
        name: symptom,
        count: count
      }));
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading feedback data</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Control Panel */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                {Object.entries(feedbackTimeRanges).map(([key, value]) => (
                  <MenuItem key={value} value={value}>
                    {key.charAt(0) + key.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Therapy Type</InputLabel>
              <Select
                value={selectedTherapy}
                label="Therapy Type"
                onChange={(e) => setSelectedTherapy(e.target.value)}
              >
                <MenuItem value="all">All Therapies</MenuItem>
                {Object.entries(THERAPY_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Search Feedback"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" gap={1}>
              <Tooltip title="Export Data">
                <IconButton>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh Data">
                <IconButton>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4">
                {stats?.averageRating?.toFixed(1) || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                out of 5.0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Feedback
              </Typography>
              <Typography variant="h4">
                {stats?.totalFeedback || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                responses received
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Follow-up Required
              </Typography>
              <Typography variant="h4">
                {stats?.followupRequired || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                patients need follow-up
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Positive Sentiment
              </Typography>
              <Typography variant="h4">
                {stats?.sentimentBreakdown?.positive || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                positive responses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="feedback analysis tabs"
          sx={{ mb: 2 }}
        >
          <Tab icon={<Message />} label="Sentiment Analysis" />
          <Tab icon={<TrendingUp />} label="Therapy Effectiveness" />
          <Tab icon={<InsertChart />} label="Symptom Trends" />
          <Tab icon={<Timeline />} label="Timeline View" />
        </Tabs>

        {/* Sentiment Analysis */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Sentiment Distribution
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={prepareSentimentData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {prepareSentimentData().map((entry, index) => (
                        <Cell key={index} fill={sentimentColors[entry.name]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Feedback
                </Typography>
                <Box sx={{ height: '100%', overflowY: 'auto' }}>
                  {feedbackData.slice(0, 5).map((feedback) => (
                    <Box key={feedback.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle2">
                        {feedback.patientName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feedback.feedback}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {feedback.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Therapy Effectiveness */}
        {tabValue === 1 && (
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Therapy Effectiveness Comparison
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareTherapyEffectivenessData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="effectiveness" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {/* Symptom Trends */}
        {tabValue === 2 && (
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Common Symptoms Reported
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareSymptomData()}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {/* Timeline View */}
        {tabValue === 3 && (
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Feedback Timeline
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={feedbackData.map(f => ({
                  date: new Date(f.date).toLocaleDateString(),
                  rating: f.rating
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <RechartsTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        )}
      </Box>

      {/* Detailed Feedback List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Detailed Feedback
        </Typography>
        <Grid container spacing={2}>
          {feedbackData.map((feedback) => (
            <Grid item xs={12} key={feedback.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">
                        {feedback.patientName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feedback.therapyType} - {new Date(feedback.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body1">
                        {feedback.feedback}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {feedback.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Effectiveness
                          </Typography>
                          <Typography variant="body1">
                            {feedback.effectiveness}/5
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Comfort Level
                          </Typography>
                          <Typography variant="body1">
                            {feedback.comfortLevel}/5
                          </Typography>
                        </Grid>
                      </Grid>
                      {feedback.followupRequired && (
                        <Chip
                          label="Follow-up Required"
                          color="warning"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
