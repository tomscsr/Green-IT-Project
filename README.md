# Green IT Project

A web application to track eco-friendly actions and their environmental impact, featuring user authentication, action tracking, and a competitive leaderboard system.

Repository Link : [Github Link Green IT](https://github.com/tomscsr/green-it-project)

## Features

- User Authentication (Login/Register)
- Track Eco-Friendly Actions
- Global Leaderboard
- Carbon Footprint Tracking
- Admin Dashboard
- Responsive Design

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL
- Authentication: Custom token-based system

## Environmental Impact Analysis

Our application demonstrates significant improvements in environmental impact:

### Before Optimization
- Home page: 1.2MB, 15 requests, Eco score: 75/100
- Dashboard: 1.6MB, 25 requests, Eco score: 60/100
- Average CO₂: ~0.15-0.30g per page load

### After Optimization
- Average page size: ~310KB
- Requests reduced to 3-10 per page
- Eco score improved to 90-95/100
- CO₂ emissions: ~0.062g per page load

## System Design

### Use Case Diagram
The application supports three user types:
- **Guest**: Browse public pages, register
- **Member**: Submit eco-actions, view dashboard
- **Admin**: Manage users, actions, view statistics

### Class Diagram
Core system components:
- User Management
- EcoAction Tracking
- Dashboard Analytics
- Leaderboard System

### UI/UX Design
- Clean, minimalist interface
- Intuitive navigation
- Responsive layout
- Accessibility-focused design

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tomscsr/green-it-project.git
cd green-it-project
```

2. Set up the database:
```bash
mysql -u root -p
source database/databaseGreenIT.sql
```

3. Configure MySQL user:
```sql
CREATE USER 'Green_IT_User'@'localhost' IDENTIFIED BY 'GreenIT1!!';
GRANT ALL PRIVILEGES ON green_actions_db.* TO 'Green_IT_User'@'localhost';
FLUSH PRIVILEGES;
```

4. Install backend dependencies:
```bash
cd backend
npm install
```

5. Start the server:
```bash
npm start
```

## Project Structure

```
green-it-project/
├── frontend/
│   ├── index.html          # Landing page
│   ├── login.html          # Authentication
│   ├── register.html       # User registration
│   ├── dashboard.html      # User dashboard
│   ├── admin.html          # Admin panel
│   ├── eco-actions.html    # Actions list
│   ├── leaderboard.html    # Global rankings
│   ├── styles.css         # Global styles
│   └── js/
│       ├── auth.js        # Authentication logic
│       ├── dashboard.js    # Dashboard functions
│       ├── admin.js       # Admin functions
│       ├── ecoactions.js  # Actions handling
│       ├── leaderboard.js # Ranking logic
│       └── script.js      # Common functions
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Dependencies
│   └── package-lock.json  # Version lock
├── database/
│   └── databaseGreenIT.sql # Schema & initial data
├── Design/
│   ├── use case diagram   # System interactions
│   └── class diagram      # Architecture
└── Carbon-Footprint/
    └── CarbonFootprintAnalysis.txt # Impact analysis
```

## Available Actions

Pre-configured eco-friendly actions with CO₂ savings:
-  Biking instead of driving (150g CO₂)
-  Recycling waste (50g CO₂)
-  Short shower (30g CO₂)
-  Energy saving (20g CO₂)
-  Public transport (100g CO₂)
-  Vegetarian meal (80g CO₂)

## Admin Features

Default admin access:
- Email: admin@admin.com
- Password: admin

Capabilities:
- Manage eco-actions
- User administration
- View global statistics
- Monitor CO₂ savings

## Team

- Sancesario Tom
- Chartier Max
- Musquin Maxime
- Bennai Iness
- Lamotte Paul Emile
