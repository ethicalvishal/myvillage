const express = require('express');
const router = express.Router();
const TransportService = require('./transportService');

// Initialize transport service
const transportService = new TransportService();

// Get all transport data
router.get('/data', async (req, res) => {
  try {
    const data = transportService.getTransportData();
    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching transport data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transport data'
    });
  }
});

// Get train data only
router.get('/trains', async (req, res) => {
  try {
    const trains = transportService.getTrainData();
    res.json({
      success: true,
      data: trains
    });
  } catch (error) {
    console.error('Error fetching train data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch train data'
    });
  }
});

// Get bus data only
router.get('/buses', async (req, res) => {
  try {
    const buses = transportService.getBusData();
    res.json({
      success: true,
      data: buses
    });
  } catch (error) {
    console.error('Error fetching bus data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bus data'
    });
  }
});

// Get alerts only
router.get('/alerts', async (req, res) => {
  try {
    const alerts = transportService.getAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts'
    });
  }
});

// Calculate fare for a route
router.post('/fare', async (req, res) => {
  try {
    const { route, date } = req.body;
    
    if (!route) {
      return res.status(400).json({
        success: false,
        error: 'Route is required'
      });
    }

    const fare = transportService.calculateFare(route, date ? new Date(date) : new Date());
    res.json({
      success: true,
      data: fare
    });
  } catch (error) {
    console.error('Error calculating fare:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate fare'
    });
  }
});

// Get route information
router.get('/route/:routeId', async (req, res) => {
  try {
    const { routeId } = req.params;
    const routeInfo = transportService.getRouteInfo(routeId);
    
    if (!routeInfo) {
      return res.status(404).json({
        success: false,
        error: 'Route not found'
      });
    }

    res.json({
      success: true,
      data: routeInfo
    });
  } catch (error) {
    console.error('Error fetching route info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch route information'
    });
  }
});

// Get directions
router.post('/directions', async (req, res) => {
  try {
    const { from, to, mode } = req.body;
    
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'From and To locations are required'
      });
    }

    const directions = await transportService.getDirections(from, to, mode || 'driving');
    
    if (!directions) {
      return res.status(404).json({
        success: false,
        error: 'Directions not found'
      });
    }

    res.json({
      success: true,
      data: directions
    });
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch directions'
    });
  }
});

// Clear specific alert
router.delete('/alerts/:alertId', async (req, res) => {
  try {
    const { alertId } = req.params;
    transportService.clearAlert(alertId);
    
    res.json({
      success: true,
      message: 'Alert cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear alert'
    });
  }
});

// Force refresh data (admin endpoint)
router.post('/refresh', async (req, res) => {
  try {
    // Force refresh all data
    await transportService.fetchTrainData();
    await transportService.fetchBusData();
    await transportService.checkForAlerts();
    
    res.json({
      success: true,
      message: 'Data refreshed successfully',
      lastUpdated: transportService.lastUpdated
    });
  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh data'
    });
  }
});

// Get transport statistics
router.get('/stats', async (req, res) => {
  try {
    const trainData = transportService.getTrainData();
    const busData = transportService.getBusData();
    const alerts = transportService.getAlerts();

    const stats = {
      totalTrains: trainData.length,
      onTimeTrains: trainData.filter(t => t.status === 'on-time').length,
      delayedTrains: trainData.filter(t => t.status === 'delayed').length,
      cancelledTrains: trainData.filter(t => t.status === 'cancelled').length,
      totalBuses: busData.length,
      runningBuses: busData.filter(b => b.status === 'running').length,
      delayedBuses: busData.filter(b => b.status === 'delayed').length,
      activeAlerts: alerts.length,
      lastUpdated: transportService.lastUpdated
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching transport stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transport statistics'
    });
  }
});

// Search trains by number or name
router.get('/trains/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const trainData = transportService.getTrainData();
    const filteredTrains = trainData.filter(train => 
      train.trainNumber.toLowerCase().includes(query.toLowerCase()) ||
      train.trainName.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: filteredTrains
    });
  } catch (error) {
    console.error('Error searching trains:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search trains'
    });
  }
});

// Search buses by number or operator
router.get('/buses/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const busData = transportService.getBusData();
    const filteredBuses = busData.filter(bus => 
      bus.busNumber.toLowerCase().includes(query.toLowerCase()) ||
      bus.operator.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: filteredBuses
    });
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search buses'
    });
  }
});

// Get trains by time range
router.get('/trains/time-range', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    if (!start || !end) {
      return res.status(400).json({
        success: false,
        error: 'Start and end times are required (HH:MM format)'
      });
    }

    const trainData = transportService.getTrainData();
    const filteredTrains = trainData.filter(train => {
      const departureTime = train.departure;
      return departureTime >= start && departureTime <= end;
    });

    res.json({
      success: true,
      data: filteredTrains
    });
  } catch (error) {
    console.error('Error filtering trains by time:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to filter trains by time range'
    });
  }
});

// Get buses by time range
router.get('/buses/time-range', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    if (!start || !end) {
      return res.status(400).json({
        success: false,
        error: 'Start and end times are required (HH:MM format)'
      });
    }

    const busData = transportService.getBusData();
    const filteredBuses = busData.filter(bus => {
      const departureTime = bus.departure;
      return departureTime >= start && departureTime <= end;
    });

    res.json({
      success: true,
      data: filteredBuses
    });
  } catch (error) {
    console.error('Error filtering buses by time:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to filter buses by time range'
    });
  }
});

// --- Admin Override Endpoints ---
// Set override data (POST /api/transport/admin/override/:type)
// Body: { password: '...', data: [...] }
router.post('/admin/override/:type', (req, res) => {
  const { type } = req.params;
  const { password, data } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  if (!['trains', 'buses'].includes(type)) {
    return res.status(400).json({ success: false, error: 'Invalid type' });
  }
  transportService.setAdminOverride(type, data);
  res.json({ success: true, message: 'Override set', type });
});
// Clear override (POST /api/transport/admin/clear/:type)
router.post('/admin/clear/:type', (req, res) => {
  const { type } = req.params;
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  if (!['trains', 'buses'].includes(type)) {
    return res.status(400).json({ success: false, error: 'Invalid type' });
  }
  transportService.setAdminOverride(type, []);
  res.json({ success: true, message: 'Override cleared', type });
});

module.exports = router; 