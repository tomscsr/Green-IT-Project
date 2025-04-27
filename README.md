# Green IT Project 

A web application to track eco-friendly actions and their environmental impact, featuring user authentication, action tracking, and a competitive leaderboard system.

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

6. Access the application:
- Open `frontend/index.html` in your browser
- Or visit `http://localhost:3000`

## Project Structure

```
green-it-project/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── auth.js
│   ├── dashboard.js
│   └── ...
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
└── database/
    └── databaseGreenIT.sql
```

## Available Actions

- Using a bike instead of a car
- Recycling waste
- Taking shorter showers
- Turning off unnecessary lights
- Using public transportation
- Eating vegetarian meals

## Admin Features

Default admin credentials:
- Email: admin@admin.com
- Password: admin

Admin capabilities:
- Add new eco-actions
- Delete users
- Manage existing actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team

- SANCESARIO Tom
- Chartier Max
- Musquin Maxime
- Bennai Iness
- Lamotte Paul Emile