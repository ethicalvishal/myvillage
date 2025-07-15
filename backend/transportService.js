require('dotenv').config();
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
let twilio;
try { twilio = require('twilio'); } catch {}

const IRCTC_API_KEY = process.env.IRCTC_API_KEY;
const REDBUS_API_KEY = process.env.REDBUS_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

class TransportService {
  constructor() {
    this.trainData = [];
    this.busData = [];
    this.alerts = [];
    this.lastUpdated = new Date();
    this.adminOverrides = { trains: [], buses: [] };
    this.initializeScheduledUpdates();
  }

  initializeScheduledUpdates() {
    cron.schedule('*/10 * * * *', () => { this.fetchTrainData(); });
    cron.schedule('*/15 * * * *', () => { this.fetchBusData(); });
    cron.schedule('*/5 * * * *', () => { this.checkForAlerts(); });
    this.fetchTrainData();
    this.fetchBusData();
  }

  // --- Real API Integration ---
  async fetchTrainData() {
    if (IRCTC_API_KEY) {
      try {
        // Example: Replace with your real API endpoint
        const response = await axios.get('https://indian-railway-irctc.p.rapidapi.com/trainsBetweenStations', {
          params: { fromStationCode: 'SRA', toStationCode: 'BMKI', dateOfJourney: this.getToday() },
          headers: {
            'X-RapidAPI-Key': IRCTC_API_KEY,
            'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
          }
        });
        this.trainData = (response.data.data || []).map((t, i) => ({
          id: i+1,
          trainNumber: t.train_number,
          trainName: t.train_name,
          departure: t.from_sta_dep_time,
          arrival: t.to_sta_arr_time,
          duration: t.duration,
          status: 'on-time',
          platform: t.platform || '-',
          delay: 0
        }));
        this.lastUpdated = new Date();
        return;
      } catch (error) {
        console.error('IRCTC API error:', error.message);
      }
    }
    // Fallback to mock data
    this.trainData = this.getMockTrains();
    this.lastUpdated = new Date();
  }

  async fetchBusData() {
    if (REDBUS_API_KEY) {
      try {
        // Example: Replace with your real API endpoint
        const response = await axios.get('https://redbus6.p.rapidapi.com/route/search', {
          params: { fromCity: 'Motihari', toCity: 'Patna', onwardDate: this.getToday() },
          headers: {
            'X-RapidAPI-Key': REDBUS_API_KEY,
            'X-RapidAPI-Host': 'redbus6.p.rapidapi.com'
          }
        });
        this.busData = (response.data.data || []).map((b, i) => ({
          id: i+1,
          busNumber: b.busNumber || b.id || `RB${i+1}`,
          operator: b.travelsName || 'Redbus Operator',
          departure: b.departureTime,
          arrival: b.arrivalTime,
          duration: b.duration,
          fare: b.fare,
          status: 'running',
          type: b.busType,
          seats: b.seatsAvailable
        }));
        return;
      } catch (error) {
        console.error('Redbus API error:', error.message);
      }
    }
    // Fallback to mock data
    this.busData = this.getMockBuses();
  }

  async getDirections(from, to, mode = 'driving') {
    if (GOOGLE_MAPS_API_KEY) {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
          params: { origin: from, destination: to, mode, key: GOOGLE_MAPS_API_KEY }
        });
        return response.data.routes[0];
      } catch (error) {
        console.error('Google Maps API error:', error.message);
      }
    }
    // Fallback
    return { distance: '25 km', duration: '45 minutes', route: [from, to] };
  }

  // --- Alerts ---
  async checkForAlerts() {
    const newAlerts = [];
    this.trainData.forEach(train => {
      if (train.delay > 30 && train.status !== 'cancelled') {
        newAlerts.push({
          id: `train-${train.id}-${Date.now()}`,
          type: 'delay',
          message: `Train ${train.trainNumber} (${train.trainName}) is delayed by ${train.delay} minutes`,
          severity: 'warning',
          timestamp: new Date(),
          source: 'train',
          sourceId: train.id
        });
        this.sendSMSAlert(`Train ${train.trainNumber} delayed by ${train.delay} min`, '+91xxxxxxxxxx');
        this.sendEmailAlert('Train Delay Alert', `Train ${train.trainNumber} delayed by ${train.delay} min`, 'user@example.com');
      }
    });
    this.busData.forEach(bus => {
      if (bus.status === 'delayed') {
        newAlerts.push({
          id: `bus-${bus.id}-${Date.now()}`,
          type: 'delay',
          message: `Bus ${bus.busNumber} (${bus.operator}) is delayed`,
          severity: 'warning',
          timestamp: new Date(),
          source: 'bus',
          sourceId: bus.id
        });
        this.sendSMSAlert(`Bus ${bus.busNumber} delayed`, '+91xxxxxxxxxx');
        this.sendEmailAlert('Bus Delay Alert', `Bus ${bus.busNumber} delayed`, 'user@example.com');
      }
    });
    this.alerts = [...this.alerts, ...newAlerts].filter(alert => new Date() - alert.timestamp < 2 * 60 * 60 * 1000);
  }

  async sendSMSAlert(message, toPhone) {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !twilio) return;
    try {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: toPhone
      });
    } catch (error) {
      console.error('Twilio SMS error:', error.message);
    }
  }

  async sendEmailAlert(subject, message, toEmail) {
    if (!EMAIL_USER || !EMAIL_PASS) return;
    try {
      const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS }
      });
      await transporter.sendMail({
        from: EMAIL_USER,
        to: toEmail,
        subject,
        text: message
      });
    } catch (error) {
      console.error('Nodemailer error:', error.message);
    }
  }

  // --- Admin Override ---
  setAdminOverride(type, data) {
    if (type === 'trains') this.adminOverrides.trains = data;
    if (type === 'buses') this.adminOverrides.buses = data;
  }
  getAdminOverride(type) {
    return this.adminOverrides[type] || [];
  }

  // --- Helpers ---
  getToday() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
  getMockTrains() {
    return [
      { id: 1, trainNumber: '15273', trainName: 'Bapudham Motihari - Patna MEMU', departure: '06:15', arrival: '07:45', duration: '1h 30m', status: 'on-time', platform: '1', delay: 0 },
      { id: 2, trainNumber: '15274', trainName: 'Patna - Bapudham Motihari MEMU', departure: '08:30', arrival: '10:00', duration: '1h 30m', status: 'delayed', platform: '2', delay: 15 },
      { id: 3, trainNumber: '15275', trainName: 'Bapudham Motihari - Patna MEMU', departure: '12:45', arrival: '14:15', duration: '1h 30m', status: 'on-time', platform: '1', delay: 0 },
      { id: 4, trainNumber: '15276', trainName: 'Patna - Bapudham Motihari MEMU', departure: '16:20', arrival: '17:50', duration: '1h 30m', status: 'cancelled', platform: '2', delay: 0 },
      { id: 5, trainNumber: '15277', trainName: 'Bapudham Motihari - Patna MEMU', departure: '19:30', arrival: '21:00', duration: '1h 30m', status: 'on-time', platform: '1', delay: 0 }
    ];
  }
  getMockBuses() {
    return [
      { id: 1, busNumber: 'BR-01', operator: 'Bihar State Road Transport', departure: '05:30', arrival: '09:00', duration: '3h 30m', fare: 220, status: 'running', type: 'AC Sleeper', seats: 45 },
      { id: 2, busNumber: 'BR-02', operator: 'Private Operator', departure: '07:00', arrival: '10:30', duration: '3h 30m', fare: 250, status: 'running', type: 'Non-AC', seats: 52 },
      { id: 3, busNumber: 'BR-03', operator: 'Bihar State Road Transport', departure: '09:30', arrival: '13:00', duration: '3h 30m', fare: 220, status: 'delayed', type: 'AC Sleeper', seats: 45 },
      { id: 4, busNumber: 'BR-04', operator: 'Private Operator', departure: '12:00', arrival: '15:30', duration: '3h 30m', fare: 250, status: 'running', type: 'Non-AC', seats: 52 },
      { id: 5, busNumber: 'BR-05', operator: 'Bihar State Road Transport', departure: '14:30', arrival: '18:00', duration: '3h 30m', fare: 220, status: 'running', type: 'AC Sleeper', seats: 45 }
    ];
  }

  // --- Data Getters ---
  getTransportData() {
    return {
      trains: this.adminOverrides.trains.length ? this.adminOverrides.trains : this.trainData,
      buses: this.adminOverrides.buses.length ? this.adminOverrides.buses : this.busData,
      alerts: this.alerts,
      lastUpdated: this.lastUpdated
    };
  }
  getTrainData() { return this.adminOverrides.trains.length ? this.adminOverrides.trains : this.trainData; }
  getBusData() { return this.adminOverrides.buses.length ? this.adminOverrides.buses : this.busData; }
  getAlerts() { return this.alerts; }
  clearAlert(alertId) { this.alerts = this.alerts.filter(alert => alert.id !== alertId); }
}

module.exports = TransportService; 