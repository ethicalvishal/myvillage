# 🚄 Bairiyadih Village Transport Dashboard

A comprehensive, real-time transport information dashboard for Bairiyadih village (Bihar, India) with live train and bus tracking, fare calculation, and route planning.

## 🌟 Features

### 🚆 Live Train Widget
- Real-time train timings from Semra to Motihari
- Train status tracking (On Time/Delayed/Cancelled)
- Platform information and delays
- Integration with IRCTC and Railway APIs
- Auto-refresh every 10 minutes

### 🚌 Live Bus Information
- Bus schedules from Motihari to Patna
- Real-time fare updates
- Bus status and seat availability
- Integration with Redbus, Goibibo APIs
- Auto-update every 15 minutes

### 🗺️ Google Maps Integration
- Interactive route mapping
- Distance and time calculations
- Directions from Bairiyadih to key locations
- Real-time traffic updates

### 🧮 Fare Calculator
- Dynamic fare estimation
- Route-based pricing
- Time and demand-based variations
- Multiple route support

### 🔔 Real-time Alert System
- Automatic delay notifications
- Cancellation alerts
- Weather and strike updates
- SMS/Email alert support (optional)

### 📱 Mobile Responsive
- Optimized for all devices
- Touch-friendly interface
- Offline capability
- Progressive Web App features

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **i18n** - Internationalization (Hindi/English)

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Node-cron** - Scheduled tasks
- **Axios** - API integration

### APIs & Services
- **IRCTC API** - Train information
- **Redbus API** - Bus schedules
- **Google Maps Platform** - Navigation
- **WhereIsMyTrain** - Live tracking

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyVillage/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # API Keys (for production)
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   IRCTC_API_KEY=your_irctc_api_key
   REDBUS_API_KEY=your_redbus_api_key
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../bairiyadih-village
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🚀 Usage

### Accessing the Dashboard

1. **From the main website:**
   - Navigate to Transport section
   - Click "Open Dashboard" button
   - Or directly visit `/transport-dashboard`

2. **Direct URL:**
   ```
   http://localhost:3000/transport-dashboard
   ```

### Dashboard Features

#### 🚆 Train Information
- View next 5 trains from Semra to Motihari
- Real-time status updates
- Click "Track" to open live tracking
- Filter by time slots

#### 🚌 Bus Information
- View all buses from Motihari to Patna
- Real-time fare updates
- Click "Book" to open booking portal
- Check seat availability

#### 🗺️ Route Planning
- Interactive Google Maps
- Distance and time calculations
- Multiple transport modes
- Real-time traffic updates

#### 🧮 Fare Calculator
- Select route (Motihari-Patna, etc.)
- View base and estimated fares
- Time-based variations
- Route information and stops

## 📡 API Endpoints

### Transport Data
```http
GET /api/transport/data
```
Returns all transport data (trains, buses, alerts)

### Train Information
```http
GET /api/transport/trains
GET /api/transport/trains/search?query=15273
GET /api/transport/trains/time-range?start=06:00&end=12:00
```

### Bus Information
```http
GET /api/transport/buses
GET /api/transport/buses/search?query=BR-01
GET /api/transport/buses/time-range?start=05:00&end=10:00
```

### Fare Calculation
```http
POST /api/transport/fare
Content-Type: application/json

{
  "route": "motihari-patna",
  "date": "2024-01-15"
}
```

### Route Information
```http
GET /api/transport/route/motihari-patna
```

### Alerts
```http
GET /api/transport/alerts
DELETE /api/transport/alerts/:alertId
```

### Statistics
```http
GET /api/transport/stats
```

### Force Refresh
```http
POST /api/transport/refresh
```

## 🔧 Configuration

### API Integration

#### Google Maps
1. Get API key from Google Cloud Console
2. Enable Maps JavaScript API
3. Enable Directions API
4. Add to environment variables

#### IRCTC API
1. Register for IRCTC API access
2. Get authentication credentials
3. Configure in transportService.js

#### Redbus API
1. Sign up for RapidAPI
2. Subscribe to Redbus API
3. Get API key and configure

### Scheduled Updates

The system automatically updates data:
- **Train data**: Every 10 minutes
- **Bus data**: Every 15 minutes
- **Alerts**: Every 5 minutes

### Customization

#### Adding New Routes
Edit `transportService.js`:
```javascript
const routes = {
  'new-route': {
    name: 'New Route Name',
    stops: ['Stop 1', 'Stop 2', 'Stop 3'],
    distance: '100 km',
    duration: '2-3 hours'
  }
};
```

#### Modifying Fares
Update base fares in `calculateFare()` method:
```javascript
const baseFares = {
  'motihari-patna': 220,
  'new-route': 150
};
```

## 🎨 Customization

### Styling
- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Customize gradients and animations

### Language Support
- Add new languages in `i18n.js`
- Update translation files
- Modify language switcher

### Components
- Extend existing components
- Add new widgets
- Modify layout and design

## 🚀 Deployment

### Backend Deployment
1. **Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

2. **Vercel**
   ```bash
   vercel --prod
   ```

3. **AWS/DigitalOcean**
   - Set up Node.js environment
   - Configure PM2 for process management
   - Set up environment variables

### Frontend Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to hosting service**
   - Netlify, Vercel, or similar
   - Configure build settings
   - Set environment variables

## 🔒 Security

### API Security
- Implement rate limiting
- Add authentication for admin endpoints
- Validate input data
- Use HTTPS in production

### Data Protection
- Encrypt sensitive data
- Implement proper error handling
- Log security events
- Regular security audits

## 📊 Monitoring

### Performance Monitoring
- Track API response times
- Monitor server resources
- Set up alerts for downtime
- Log user interactions

### Data Quality
- Validate API responses
- Monitor data freshness
- Track error rates
- Implement fallback data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Updates

### Version 1.0.0
- Initial release
- Basic train and bus tracking
- Fare calculator
- Google Maps integration

### Planned Features
- SMS/Email alerts
- Offline mode
- Push notifications
- Advanced analytics
- Admin panel
- Mobile app

---

**Built with ❤️ for Bairiyadih Village** 